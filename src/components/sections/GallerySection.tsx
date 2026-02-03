"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { publicTools } from "@/data/tools";

interface ToolCardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  runtime: string;
  status: "live" | "draft" | "deprecated";
}

const filters = ["全部", "图片", "视频", "文件", "文本", "效率"];

const categoryMap: Record<string, string> = {
  "全部": "All",
  "图片": "Image",
  "视频": "Video",
  "文件": "File",
  "文本": "Text",
  "效率": "Productivity",
};

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [activeFilter, setActiveFilter] = useState("全部");

  const sortedTools = [...publicTools].sort((a, b) => {
    const aLive = a.status === "live" ? 0 : 1;
    const bLive = b.status === "live" ? 0 : 1;
    if (aLive !== bLive) return aLive - bLive;
    return a.title.localeCompare(b.title);
  });

  const filteredTools =
    activeFilter === "全部"
      ? sortedTools
      : sortedTools.filter((tool) => tool.category === categoryMap[activeFilter]);

  return (
    <section ref={sectionRef} id="gallery" className="gallery-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-eyebrow" style={{ marginBottom: "1rem", display: "block" }}>
              工具集合
            </span>
            <h2 className="gallery-title">
              探索
              <br />
              <span className="text-aurora">实用工具</span>
            </h2>
          </div>

          <div className="gallery-filters">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          className="tools-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ToolCard({ tool, index }: { tool: ToolCardItem; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Image: "🎨",
      Video: "🎬",
      File: "📁",
      Text: "📝",
      Productivity: "⚡",
    };
    return icons[category] || "🔧";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Image: "#00f5ff",
      Video: "#ff2a9d",
      File: "#bd34fe",
      Text: "#4facfe",
      Productivity: "#ffd700",
    };
    return colors[category] || "#00f5ff";
  };

  const getRuntimeLabel = (runtime: string) => {
    return runtime === "Offline" ? "离线" : "在线";
  };

  const getStatusLabel = (status: string) => {
    return status === "live" ? "可用" : "开发中";
  };

  return (
    <motion.article
      ref={cardRef}
      className="tool-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Link href={`/tool/${tool.id}`} className="tool-card-link">
        <div className="tool-card-inner">
          <div
            className="tool-card-icon"
            style={{
              background: `linear-gradient(135deg, ${getCategoryColor(tool.category)}15 0%, ${getCategoryColor(tool.category)}05 100%)`,
              borderColor: `${getCategoryColor(tool.category)}20`,
            }}
          >
            {getCategoryIcon(tool.category)}
          </div>

          <h3 className="tool-card-title">{tool.title}</h3>
          <p className="tool-card-desc">{tool.description}</p>

          <div className="tool-card-meta">
            <span
              className={`tool-card-tag ${tool.runtime === "Offline" ? "offline" : ""}`}
              style={{
                ["--tag-color" as string]: getCategoryColor(tool.category),
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: getCategoryColor(tool.category),
                  display: "inline-block",
                }}
              />
              {getRuntimeLabel(tool.runtime)}
            </span>
            <span
              className={`tool-card-status ${tool.status === "live" ? "live" : ""}`}
            >
              {getStatusLabel(tool.status)}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
