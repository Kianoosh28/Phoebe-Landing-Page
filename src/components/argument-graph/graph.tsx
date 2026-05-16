"use client";

import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Minus, Plus, RotateCcw, X, Radar } from "lucide-react";
import {
  PREDICTIONS,
  type Prediction,
  type GraphNodeType,
  type Polarity,
} from "./data";
import { cn } from "@/lib/utils";

type SourceMeta = {
  label: string;
  type: "press" | "crowd" | "model" | "analyst" | "leak";
};

type GraphNode = d3.SimulationNodeDatum & {
  id: string;
  type: GraphNodeType;
  label: string;
  parentId?: string;
  polarity?: Polarity;
  weight?: number;
  reasoning?: string;
  sources?: SourceMeta[];
  sourceType?: SourceMeta["type"];
  clusterId?: string;
};

type GraphLink = {
  source: string | GraphNode;
  target: string | GraphNode;
  kind: "rc" | "ca" | "as";
};

const NODE_R: Record<GraphNodeType, number> = {
  root: 30,
  cluster: 16,
  argument: 11,
  source: 5,
};

const POLARITY_COLOR: Record<Polarity, string> = {
  bull: "#00F0FF",
  bear: "#FF4757",
};

function buildGraph(p: Prediction): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  nodes.push({
    id: p.id,
    type: "root",
    label: p.title,
  });

  p.clusters.forEach((c) => {
    nodes.push({ id: c.id, type: "cluster", label: c.label, parentId: p.id });
    links.push({ source: p.id, target: c.id, kind: "rc" });

    c.arguments.forEach((a) => {
      nodes.push({
        id: a.id,
        type: "argument",
        label: a.title,
        parentId: c.id,
        clusterId: c.id,
        polarity: a.polarity,
        weight: a.weight,
        reasoning: a.reasoning,
        sources: a.sources,
      });
      links.push({ source: c.id, target: a.id, kind: "ca" });

      a.sources.forEach((s, i) => {
        const sid = `${a.id}__s${i}`;
        nodes.push({
          id: sid,
          type: "source",
          label: s.label,
          parentId: a.id,
          clusterId: c.id,
          sourceType: s.type,
        });
        links.push({ source: a.id, target: sid, kind: "as" });
      });
    });
  });

  return { nodes, links };
}

export function ArgumentGraph() {
  const [predId, setPredId] = useState<string>(PREDICTIONS[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const prediction = useMemo(
    () => PREDICTIONS.find((p) => p.id === predId)!,
    [predId]
  );

  const { nodes, links } = useMemo(() => buildGraph(prediction), [prediction]);

  const selectedNode = useMemo(
    () => (selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) ?? null : null),
    [selectedNodeId, nodes]
  );

  // SVG refs
  const svgRef = useRef<SVGSVGElement>(null);
  const innerRef = useRef<SVGGElement>(null);
  const simRef = useRef<d3.Simulation<GraphNode, undefined> | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Build the simulation when graph data changes
  useEffect(() => {
    if (!svgRef.current || !innerRef.current) return;

    const svg = d3.select(svgRef.current);
    const inner = d3.select(innerRef.current);

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const sim = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance((l) => {
            if (l.kind === "rc") return 130;
            if (l.kind === "ca") return 85;
            return 42;
          })
          .strength((l) => (l.kind === "as" ? 0.9 : 0.5))
      )
      .force(
        "charge",
        d3.forceManyBody<GraphNode>().strength((d) => {
          if (d.type === "root") return -700;
          if (d.type === "cluster") return -320;
          if (d.type === "argument") return -160;
          return -50;
        })
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide<GraphNode>().radius((d) => NODE_R[d.type] + 6)
      )
      .alpha(1)
      .alphaDecay(0.025);

    simRef.current = sim;

    // Direct DOM refs — sidestep d3's selection-data join with React-rendered SVG
    const linkEls = Array.from(
      innerRef.current.querySelectorAll<SVGLineElement>("line.link")
    );
    const nodeEls = Array.from(
      innerRef.current.querySelectorAll<SVGGElement>("g.node")
    );

    const tick = () => {
      for (let i = 0; i < links.length && i < linkEls.length; i++) {
        const l = links[i];
        const el = linkEls[i];
        const s = l.source as GraphNode;
        const t = l.target as GraphNode;
        el.setAttribute("x1", String(s?.x ?? 0));
        el.setAttribute("y1", String(s?.y ?? 0));
        el.setAttribute("x2", String(t?.x ?? 0));
        el.setAttribute("y2", String(t?.y ?? 0));
      }
      for (let i = 0; i < nodes.length && i < nodeEls.length; i++) {
        const n = nodes[i];
        nodeEls[i].setAttribute(
          "transform",
          `translate(${n.x ?? 0},${n.y ?? 0})`
        );
      }
    };

    sim.on("tick", tick);

    // Drag — bind each node element to its datum, then attach d3-drag
    const drag = d3
      .drag<SVGGElement, GraphNode>()
      .on("start", (event, d) => {
        if (!event.active) sim.alphaTarget(0.25).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = event.x;
        d.fy = event.y;
      });

    nodeEls.forEach((el, i) => {
      const sel = d3.select<SVGGElement, GraphNode>(el).datum(nodes[i]);
      sel.call(drag);
    });

    // Zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .filter((event) => {
        // Disable wheel-zoom unless modifier; allow pinch & buttons.
        if (event.type === "wheel") return event.ctrlKey || event.metaKey;
        return !event.button;
      })
      .on("zoom", (event) => {
        inner.attr("transform", event.transform.toString());
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    return () => {
      sim.stop();
      svg.on(".zoom", null);
    };
  }, [nodes, links]);

  const handleZoom = (factor: number) => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(220).call(zoomRef.current.scaleBy, factor);
  };

  const handleReset = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(320)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  };

  const handleRerun = () => {
    if (!simRef.current) return;
    // Release pins and bounce the sim
    nodes.forEach((n) => {
      n.fx = null;
      n.fy = null;
    });
    simRef.current.alpha(1).restart();
  };

  return (
    <section id="argument-graph" className="relative bg-[#050505] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
            <Radar size={12} className="text-cyan" />
            The Argument Graph
          </div>
          <h2 className="font-display glitch-reveal text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.025em] leading-[1.02] text-white text-balance">
            Every forecast is an{" "}
            <span className="bg-gradient-to-br from-cyan-soft via-cyan to-amethyst bg-clip-text text-transparent">
              audit trail of arguments.
            </span>
          </h2>
          <p className="mt-5 text-[16.5px] text-mute-2 max-w-2xl">
            Pick a prediction. Drag, zoom, click any node to drill down to the
            atomic argument and its sources. The arc around each argument shows
            its weight in Phoebe&apos;s aggregation.
          </p>
        </div>

        {/* Prediction selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
          {PREDICTIONS.map((p) => {
            const active = p.id === predId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPredId(p.id);
                  setSelectedNodeId(null);
                }}
                className={cn(
                  "text-left rounded-xl border p-3.5 transition-all",
                  active
                    ? "border-cyan/50 bg-cyan/[0.06]"
                    : "border-line bg-white/[0.02] hover:border-line-strong"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9.5px] uppercase tracking-[0.16em] font-mono",
                      p.status === "live"
                        ? "bg-bearish/15 text-bearish"
                        : "bg-cyan/15 text-cyan"
                    )}
                  >
                    {p.status === "live" ? (
                      <>
                        <span className="relative flex h-1 w-1">
                          <span className="absolute inset-0 rounded-full bg-bearish animate-ping" />
                          <span className="relative inline-block h-1 w-1 rounded-full bg-bearish" />
                        </span>
                        Live
                      </>
                    ) : (
                      "Resolved"
                    )}
                  </span>
                  {p.errorMargin && (
                    <span className="text-[10.5px] font-mono text-mute">
                      ±{p.errorMargin}
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-white font-medium leading-snug truncate">
                  {p.title}
                </div>
                <div className="text-[10.5px] text-mute mt-0.5 truncate">
                  {p.metric}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-display text-[15px] font-semibold text-white leading-tight">
                    {p.phoebePrediction}
                  </span>
                  {p.actual && p.actual !== p.phoebePrediction && (
                    <span className="text-[10px] text-mute font-mono">
                      / actual {p.actual}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Graph + Detail panel */}
        <div className="relative rounded-2xl border border-line bg-gradient-to-b from-obsidian-100 to-obsidian-50 overflow-hidden running-border">
          <div className="flex flex-col lg:flex-row">
            <div className="relative flex-1 min-h-[520px] lg:min-h-[620px]">
              {/* Header bar */}
              <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 py-3 border-b border-line bg-obsidian-100/70 backdrop-blur-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-mute-2">
                      Argument Graph · {prediction.id.toUpperCase()}
                    </div>
                    <div className="text-[13px] text-white truncate">
                      {prediction.title} — {prediction.metric}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <ControlBtn onClick={() => handleZoom(1.25)} label="Zoom in">
                    <Plus size={14} />
                  </ControlBtn>
                  <ControlBtn onClick={() => handleZoom(0.8)} label="Zoom out">
                    <Minus size={14} />
                  </ControlBtn>
                  <ControlBtn onClick={handleReset} label="Reset view">
                    <Maximize2 size={14} />
                  </ControlBtn>
                  <ControlBtn onClick={handleRerun} label="Re-run simulation">
                    <RotateCcw size={14} />
                  </ControlBtn>
                </div>
              </div>

              <svg
                ref={svgRef}
                className="w-full h-[520px] lg:h-[620px] cursor-grab active:cursor-grabbing"
                style={{ touchAction: "none" }}
                onClick={(e) => {
                  if (e.target === svgRef.current) setSelectedNodeId(null);
                }}
              >
                <defs>
                  <radialGradient id="root-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#8A2BE2" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                  </radialGradient>
                  <filter id="node-glow">
                    <feGaussianBlur stdDeviation="2.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g ref={innerRef}>
                  {/* Links */}
                  {links.map((l, i) => {
                    const s = typeof l.source === "string" ? l.source : l.source.id;
                    const t = typeof l.target === "string" ? l.target : l.target.id;
                    return (
                      <line
                        key={`${s}-${t}-${i}`}
                        className="link"
                        data-source={s}
                        data-target={t}
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth={l.kind === "rc" ? 1.4 : l.kind === "ca" ? 1.1 : 0.7}
                        strokeDasharray={l.kind === "as" ? "2 3" : undefined}
                      />
                    );
                  })}

                  {/* Nodes */}
                  {nodes.map((n) => (
                    <NodeMark
                      key={n.id}
                      node={n}
                      selected={selectedNodeId === n.id}
                      onSelect={() => setSelectedNodeId(n.id)}
                    />
                  ))}
                </g>
              </svg>

              {/* Legend */}
              <div className="absolute left-0 right-0 bottom-0 border-t border-line bg-obsidian-100/70 backdrop-blur-sm">
                <div className="px-4 py-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-mute-2">
                  <LegendDot color="url(#root-grad)" radius={9} label="Root · prediction" />
                  <LegendDot color="#8A2BE2" radius={6} label="Cluster" />
                  <LegendDot color="#00F0FF" radius={4.5} label="Argument · bullish" arc />
                  <LegendDot color="#FF4757" radius={4.5} label="Argument · bearish" arc />
                  <LegendDot color="rgba(255,255,255,0.4)" radius={3} label="Source" />
                  <span className="hidden md:inline text-mute">
                    · Ctrl/⌘+scroll to zoom · Drag to pin · Click a node for details
                  </span>
                </div>
              </div>
            </div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.aside
                  key={selectedNode.id}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:w-[400px] lg:shrink-0 border-l border-line bg-obsidian-50 relative"
                >
                  <DetailPanel
                    node={selectedNode}
                    prediction={prediction}
                    onClose={() => setSelectedNodeId(null)}
                  />
                </motion.aside>
              ) : (
                <motion.aside
                  key="empty"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:w-[400px] lg:shrink-0 border-l border-line bg-obsidian-50 p-7"
                >
                  <PredictionSummary prediction={prediction} />
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-line bg-white/[0.03] text-white hover:border-cyan/50 hover:text-cyan transition-colors"
    >
      {children}
    </button>
  );
}

function LegendDot({
  color,
  radius,
  label,
  arc,
}: {
  color: string;
  radius: number;
  label: string;
  arc?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={20} height={20} viewBox="-10 -10 20 20">
        {arc && (
          <circle
            r={radius + 3}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeDasharray="3 2"
          />
        )}
        <circle r={radius} fill={color} />
      </svg>
      <span>{label}</span>
    </span>
  );
}

function NodeMark({
  node,
  selected,
  onSelect,
}: {
  node: GraphNode;
  selected: boolean;
  onSelect: () => void;
}) {
  const r = NODE_R[node.type];

  if (node.type === "root") {
    return (
      <g
        className="node cursor-pointer"
        data-id={node.id}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <circle r={r + 22} fill="url(#root-grad)" />
        <circle
          r={r}
          fill="#0a0a0c"
          stroke={selected ? "#00F0FF" : "rgba(0,240,255,0.7)"}
          strokeWidth={selected ? 2 : 1.4}
          filter="url(#node-glow)"
        />
        <circle r={r - 6} fill="none" stroke="rgba(138,43,226,0.6)" strokeWidth={1} strokeDasharray="2 3" />
        <text
          textAnchor="middle"
          dy="0.36em"
          className="fill-white font-display"
          style={{ fontSize: 11, fontWeight: 600, pointerEvents: "none" }}
        >
          {node.label.length > 14 ? node.label.slice(0, 12) + "…" : node.label}
        </text>
      </g>
    );
  }

  if (node.type === "cluster") {
    return (
      <g
        className="node cursor-pointer"
        data-id={node.id}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <circle
          r={r}
          fill="rgba(138,43,226,0.16)"
          stroke={selected ? "#B88BFF" : "#8A2BE2"}
          strokeWidth={selected ? 2 : 1.3}
        />
        <circle r={r - 4} fill="none" stroke="rgba(138,43,226,0.4)" strokeWidth={0.7} />
        <text
          textAnchor="middle"
          dy={r + 14}
          className="fill-mute-2"
          style={{ fontSize: 10.5, pointerEvents: "none" }}
        >
          {node.label}
        </text>
      </g>
    );
  }

  if (node.type === "argument") {
    const color = POLARITY_COLOR[node.polarity!];
    const weight = node.weight ?? 0;
    // Arc proportional to weight (full circle = 1.0)
    const arcR = r + 5;
    const arcLen = 2 * Math.PI * arcR;
    return (
      <g
        className="node cursor-pointer"
        data-id={node.id}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {/* Background track */}
        <circle
          r={arcR}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1.5}
        />
        {/* Weight arc */}
        <circle
          r={arcR}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray={`${arcLen * weight} ${arcLen}`}
          transform="rotate(-90)"
          strokeLinecap="round"
        />
        <circle
          r={r}
          fill="#0a0a0c"
          stroke={selected ? "white" : color}
          strokeWidth={selected ? 2 : 1.2}
        />
        <circle r={r - 4} fill={color} fillOpacity={selected ? 0.65 : 0.4} />
      </g>
    );
  }

  // source
  const sourceColor =
    node.sourceType === "crowd"
      ? "#B88BFF"
      : node.sourceType === "press"
      ? "#9a9aa6"
      : node.sourceType === "model"
      ? "#5cf6ff"
      : node.sourceType === "leak"
      ? "#FFB454"
      : "#6b6b78";

  return (
    <g
      className="node cursor-pointer"
      data-id={node.id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <circle
        r={r}
        fill={sourceColor}
        stroke={selected ? "#fff" : "rgba(255,255,255,0.5)"}
        strokeWidth={selected ? 1.5 : 0.6}
      />
    </g>
  );
}

function DetailPanel({
  node,
  prediction,
  onClose,
}: {
  node: GraphNode;
  prediction: Prediction;
  onClose: () => void;
}) {
  const cluster = prediction.clusters.find((c) => c.id === node.clusterId || c.id === node.id);

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-7">
      <div className="flex items-start justify-between mb-5">
        <div className="text-[10.5px] uppercase tracking-[0.18em] text-mute font-mono">
          {node.type === "root" && "Root · Prediction"}
          {node.type === "cluster" && "Cluster"}
          {node.type === "argument" && "Atomic Argument"}
          {node.type === "source" && "Data Source"}
        </div>
        <button
          onClick={onClose}
          className="text-mute hover:text-white transition-colors"
          aria-label="Close details"
        >
          <X size={16} />
        </button>
      </div>

      <h3 className="font-display text-[20px] sm:text-[22px] font-semibold text-white tracking-[-0.015em] leading-[1.2] mb-4 text-balance">
        {node.label}
      </h3>

      {node.type === "root" && <RootDetail prediction={prediction} />}
      {node.type === "cluster" && cluster && <ClusterDetail cluster={cluster} />}
      {node.type === "argument" && (
        <ArgumentDetail node={node} />
      )}
      {node.type === "source" && (
        <SourceDetail node={node} prediction={prediction} />
      )}
    </div>
  );
}

function PolarityBadge({ polarity }: { polarity: Polarity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] uppercase tracking-[0.16em] font-mono",
        polarity === "bull"
          ? "border-cyan/40 bg-cyan/10 text-cyan"
          : "border-bearish/40 bg-bearish/10 text-bearish"
      )}
    >
      <span
        className={cn(
          "h-1 w-1 rounded-full",
          polarity === "bull" ? "bg-cyan" : "bg-bearish"
        )}
      />
      {polarity === "bull" ? "Bullish" : "Bearish"}
    </span>
  );
}

function RootDetail({ prediction }: { prediction: Prediction }) {
  return (
    <div>
      <p className="text-[13.5px] text-mute-2 mb-5">{prediction.blurb}</p>
      <div className="space-y-3">
        <Stat label="Metric" value={prediction.metric} />
        <Stat label="Phoebe Prediction" value={prediction.phoebePrediction} highlight />
        {prediction.actual && <Stat label="Actual" value={prediction.actual} />}
        {prediction.errorMargin && (
          <Stat label="Error Margin" value={prediction.errorMargin} />
        )}
        <Stat
          label={prediction.status === "live" ? "Resolves" : "Resolved"}
          value={prediction.resolvedAt ?? prediction.resolvesAt ?? "—"}
        />
        <Stat label="Status" value={prediction.status === "live" ? "Live" : "Resolved"} />
      </div>
    </div>
  );
}

function ClusterDetail({ cluster }: { cluster: Prediction["clusters"][number] }) {
  return (
    <div>
      <p className="text-[13.5px] text-mute-2 mb-5">
        {cluster.arguments.length} atomic arguments aggregate under this cluster.
      </p>
      <div className="space-y-2.5">
        {cluster.arguments.map((a) => (
          <div
            key={a.id}
            className="rounded-lg border border-line bg-white/[0.02] p-3"
          >
            <div className="flex items-center justify-between mb-1.5">
              <PolarityBadge polarity={a.polarity} />
              <span className="text-[11px] font-mono text-mute tabular-nums">
                w·{a.weight.toFixed(2)}
              </span>
            </div>
            <div className="text-[13px] text-white">{a.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArgumentDetail({ node }: { node: GraphNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        {node.polarity && <PolarityBadge polarity={node.polarity} />}
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] uppercase tracking-[0.14em] text-mute">
            Model Weight
          </span>
          <span className="font-mono text-[13px] text-white tabular-nums">
            {((node.weight ?? 0) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(node.weight ?? 0) * 100}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn(
              "absolute inset-y-0 left-0 rounded-full",
              node.polarity === "bull"
                ? "bg-gradient-to-r from-cyan-deep to-cyan"
                : "bg-gradient-to-r from-bearish/70 to-bearish"
            )}
          />
        </div>
      </div>

      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.14em] text-mute mb-2">
          Reasoning
        </div>
        <p className="text-[14px] leading-[1.55] text-white/90">
          {node.reasoning}
        </p>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.14em] text-mute mb-2">
          Sources
        </div>
        <div className="space-y-1.5">
          {node.sources?.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-line bg-white/[0.02] px-3 py-2"
            >
              <span className="text-[13px] text-white truncate">{s.label}</span>
              <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-mute">
                {s.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SourceDetail({
  node,
  prediction,
}: {
  node: GraphNode;
  prediction: Prediction;
}) {
  const parentArg = prediction.clusters
    .flatMap((c) => c.arguments)
    .find((a) => a.id === node.parentId);
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-mute mb-2">
        Source Type
      </div>
      <div className="font-mono text-[13px] text-white mb-5 uppercase tracking-[0.16em]">
        {node.sourceType}
      </div>
      {parentArg && (
        <>
          <div className="text-[11px] uppercase tracking-[0.14em] text-mute mb-2">
            Feeds Argument
          </div>
          <div className="rounded-lg border border-line bg-white/[0.02] p-3">
            <div className="text-[13px] text-white mb-1">{parentArg.title}</div>
            <div className="text-[12px] text-mute-2 leading-snug">
              {parentArg.reasoning}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PredictionSummary({ prediction }: { prediction: Prediction }) {
  const totalArgs = prediction.clusters.reduce(
    (sum, c) => sum + c.arguments.length,
    0
  );
  const totalSources = prediction.clusters.reduce(
    (sum, c) =>
      sum + c.arguments.reduce((s2, a) => s2 + a.sources.length, 0),
    0
  );
  return (
    <div className="h-full">
      <div className="text-[10.5px] uppercase tracking-[0.18em] text-mute font-mono mb-4">
        Prediction Summary
      </div>
      <h3 className="font-display text-[22px] font-semibold text-white tracking-[-0.015em] leading-[1.2] mb-1.5">
        {prediction.title}
      </h3>
      <p className="text-[13.5px] text-mute-2 mb-6">{prediction.blurb}</p>

      <div className="space-y-3 mb-7">
        <Stat label="Metric" value={prediction.metric} />
        <Stat label="Phoebe Prediction" value={prediction.phoebePrediction} highlight />
        {prediction.actual && <Stat label="Actual" value={prediction.actual} />}
        {prediction.errorMargin && (
          <Stat label="Error Margin" value={prediction.errorMargin} />
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <MiniStat v={prediction.clusters.length} l="Clusters" />
        <MiniStat v={totalArgs} l="Arguments" />
        <MiniStat v={totalSources} l="Sources" />
      </div>

      <div className="rounded-lg border border-line bg-white/[0.02] p-4">
        <div className="text-[11px] uppercase tracking-[0.14em] text-mute mb-1.5">
          Tip
        </div>
        <div className="text-[12.5px] text-mute-2 leading-snug">
          Click any node in the graph to inspect its reasoning, weight, and
          source provenance.
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2">
      <span className="text-[11px] uppercase tracking-[0.14em] text-mute">
        {label}
      </span>
      <span
        className={cn(
          "font-mono text-[14px] tabular-nums text-right",
          highlight ? "text-cyan" : "text-white"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function MiniStat({ v, l }: { v: number; l: string }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.02] p-3 text-center">
      <div className="font-display text-2xl font-semibold text-white tabular-nums">
        {v}
      </div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-mute mt-0.5">
        {l}
      </div>
    </div>
  );
}
