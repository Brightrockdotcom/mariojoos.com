"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

// Audience retention as % of viewers still watching at each point of the video.
// x = 0..100 (% through video), y = 0..100 (% of audience retained).
const before = [100, 72, 54, 43, 36, 31, 27, 24, 22, 20, 18];
const after = [100, 91, 84, 79, 75, 72, 69, 67, 65, 63, 61];

const W = 720;
const H = 360;
const PAD = { top: 24, right: 24, bottom: 40, left: 44 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

function x(i: number, len: number) {
  return PAD.left + (i / (len - 1)) * plotW;
}
function y(v: number) {
  return PAD.top + (1 - v / 100) * plotH;
}

function linePath(data: number[]) {
  return data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i, data.length)} ${y(v)}`).join(" ");
}
function areaPath(data: number[]) {
  const top = data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i, data.length)} ${y(v)}`).join(" ");
  return `${top} L ${x(data.length - 1, data.length)} ${y(0)} L ${x(0, data.length)} ${y(0)} Z`;
}

export default function RetentionChart() {
  const [hover, setHover] = useState<number | null>(null);

  const avg = (d: number[]) => Math.round(d.reduce((a, b) => a + b, 0) / d.length);
  const lift = Math.round(((avg(after) - avg(before)) / avg(before)) * 100);

  return (
    <section id="retention" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
              The Difference
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-3">
              Audience retention,{" "}
              <span className="gradient-text">before &amp; after.</span>
            </h2>
            <p className="text-[#999] text-[15px] max-w-lg mx-auto">
              Hover the curve to see how many viewers are still watching at each
              point of a video &mdash; before and after a retention rework.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card rounded-2xl p-5 md:p-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] rounded-full bg-[#555]" />
                <span className="text-[#999] text-xs font-mono uppercase tracking-wider">Before</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] rounded-full bg-[#e50914]" />
                <span className="text-[#999] text-xs font-mono uppercase tracking-wider">After</span>
              </div>
              <div className="ml-2 px-3 py-1 rounded-full bg-[#e50914]/10 border border-[#e50914]/20">
                <span className="text-[#ff6b35] text-xs font-mono">+{lift}% avg retention</span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto select-none"
              onMouseLeave={() => setHover(null)}
            >
              <defs>
                <linearGradient id="afterFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e50914" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#e50914" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal gridlines */}
              {[0, 25, 50, 75, 100].map((g) => (
                <g key={g}>
                  <line
                    x1={PAD.left}
                    x2={W - PAD.right}
                    y1={y(g)}
                    y2={y(g)}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={1}
                  />
                  <text
                    x={PAD.left - 10}
                    y={y(g) + 4}
                    textAnchor="end"
                    className="fill-[#555]"
                    fontSize={11}
                    fontFamily="monospace"
                  >
                    {g}%
                  </text>
                </g>
              ))}

              {/* x-axis labels */}
              {[0, 50, 100].map((p) => (
                <text
                  key={p}
                  x={PAD.left + (p / 100) * plotW}
                  y={H - 12}
                  textAnchor="middle"
                  className="fill-[#555]"
                  fontSize={11}
                  fontFamily="monospace"
                >
                  {p}%
                </text>
              ))}

              {/* After area + lines */}
              <path d={areaPath(after)} fill="url(#afterFill)" />
              <path d={linePath(before)} fill="none" stroke="#555" strokeWidth={2} strokeDasharray="5 5" />
              <motion.path
                d={linePath(after)}
                fill="none"
                stroke="#e50914"
                strokeWidth={3}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />

              {/* Hover hit areas + markers */}
              {after.map((_, i) => (
                <rect
                  key={i}
                  x={x(i, after.length) - plotW / (after.length - 1) / 2}
                  y={PAD.top}
                  width={plotW / (after.length - 1)}
                  height={plotH}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)}
                />
              ))}

              {hover !== null && (
                <g>
                  <line
                    x1={x(hover, after.length)}
                    x2={x(hover, after.length)}
                    y1={PAD.top}
                    y2={PAD.top + plotH}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth={1}
                  />
                  <circle cx={x(hover, before.length)} cy={y(before[hover])} r={4} fill="#050505" stroke="#888" strokeWidth={2} />
                  <circle cx={x(hover, after.length)} cy={y(after[hover])} r={5} fill="#e50914" stroke="#050505" strokeWidth={2} />
                </g>
              )}
            </svg>

            <div className="mt-5 flex items-center justify-center min-h-[1.5rem]">
              {hover !== null ? (
                <p className="text-[#ccc] text-sm font-mono">
                  At <span className="text-white">{hover * 10}%</span> through the video:{" "}
                  <span className="text-[#888]">{before[hover]}% before</span>
                  {"  "}&rarr;{"  "}
                  <span className="text-[#ff6b35]">{after[hover]}% after</span>
                </p>
              ) : (
                <p className="text-[#555] text-sm font-mono">Hover the chart to compare</p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
