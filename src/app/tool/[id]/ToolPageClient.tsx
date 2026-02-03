"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ToolRunner } from "@/components/ToolRunner";
import {
  recordToolView,
  recordToolDownload,
  getCategoryColor,
  getCategoryIcon,
} from "@/lib/tools";
import { Tool } from "@/data/tools";
import { FloatingOrbs, ParticleField } from "@/components/backgrounds";

interface ToolPageClientProps {
  tool: Tool;
  htmlContent: string;
}

export function ToolPageClient({ tool, htmlContent }: ToolPageClientProps) {
  const router = useRouter();

  useEffect(() => {
    recordToolView(tool.id);
  }, [tool.id]);

  const handleBack = () => {
    router.push("/");
  };

  const handleDownload = () => {
    if (!htmlContent) return;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.id}-${tool.version || "1.0.0"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    recordToolDownload(tool.id);
  };

  if (!htmlContent) {
    return <ToolErrorState error="Tool content not found" onBack={handleBack} />;
  }

  const categoryColor = getCategoryColor(tool.category);
  const categoryIcon = getCategoryIcon(tool.category);

  return (
    <>
      {/* Background Effects */}
      <div className="dream-bg" />
      <ParticleField />
      <FloatingOrbs />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="tool-page">
        <div className="container">
          {/* Breadcrumb */}
          <motion.nav
            className="breadcrumb"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button onClick={handleBack} className="breadcrumb-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Gallery</span>
            </button>
          </motion.nav>

          {/* Tool Header */}
          <motion.header
            className="tool-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="tool-header-content">
              {/* Icon & Title */}
              <div className="tool-title-section">
                <motion.div
                  className="tool-icon"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColor}30 0%, ${categoryColor}10 100%)`,
                    borderColor: `${categoryColor}40`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  {tool.type === "public" && "file" in tool && tool.file ? (
                    <span style={{ fontSize: "2rem" }}>{categoryIcon}</span>
                  ) : (
                    <span style={{ fontSize: "2rem" }}>🔧</span>
                  )}
                </motion.div>

                <div className="tool-title-text">
                  <motion.div
                    className="tool-category-badge"
                    style={{ color: categoryColor }}
                  >
                    {categoryIcon} {tool.category}
                  </motion.div>
                  
                  <h1 className="tool-title">{tool.title}</h1>
                  
                  <p className="tool-description">{tool.description}</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="tool-meta">
                <div className="tool-meta-item">
                  <span className="meta-label">Runtime</span>
                  <span className={`meta-value runtime-${tool.runtime}`}>
                    {tool.runtime === "offline" ? "🟢 Offline" : "🌐 Online"}
                  </span>
                </div>

                <div className="tool-meta-item">
                  <span className="meta-label">Version</span>
                  <span className="meta-value">v{tool.version}</span>
                </div>

                {tool.type === "public" && "author" in tool && (
                  <div className="tool-meta-item">
                    <span className="meta-label">Author</span>
                    <span className="meta-value">{tool.author}</span>
                  </div>
                )}

                <div className="tool-meta-item">
                  <span className="meta-label">Status</span>
                  <span className={`meta-value status-${tool.status}`}>
                    {tool.status === "live" ? "✨ Live" : "🚧 Draft"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="tool-tags">
              {tool.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="tool-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </motion.header>

          {/* Tool Runner */}
          <motion.section
            className="tool-runner-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="section-title">
              <span className="title-icon">▶</span>
              Run Tool
            </h2>
            
            <ToolRunner htmlContent={htmlContent} title={tool.title} />
          </motion.section>

          {/* Info Section */}
          <motion.section
            className="tool-info-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="info-grid">
              {/* How to use */}
              <div className="info-card">
                <h3 className="info-card-title">📖 How to Use</h3>
                <ul className="info-list">
                  <li>The tool runs directly in your browser</li>
                  <li>All processing happens locally (offline tools)</li>
                  <li>Your data never leaves your device</li>
                  <li>Download the HTML to use anytime, anywhere</li>
                </ul>
              </div>

              {/* Features */}
              <div className="info-card">
                <h3 className="info-card-title">✨ Features</h3>
                <ul className="info-list">
                  <li>Single-file HTML utility</li>
                  <li>No installation required</li>
                  <li>Works offline after first load</li>
                  <li>Responsive design for all devices</li>
                  <li>Aurora Dream UI theme</li>
                </ul>
              </div>

              {/* Download Info */}
              <div className="info-card highlight">
                <h3 className="info-card-title">💾 Download</h3>
                <p className="info-text">
                  Download this tool as a standalone HTML file. 
                  Open it in any browser, even without internet!
                </p>
                <button 
                  onClick={handleDownload}
                  className="btn btn-primary" 
                  style={{ marginTop: "1rem" }}
                >
                  Download HTML
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              Agent<span>Sannyii</span>
            </div>
            <div className="footer-copy">
              <span>Single-file AI utilities</span>
              <span className="footer-divider" />
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Page Styles */}
      <style jsx>{`
        .tool-page {
          padding-top: 100px;
          min-height: 100vh;
        }

        .breadcrumb {
          margin-bottom: 2rem;
        }

        .breadcrumb-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--text-muted);
          border-radius: 100px;
          color: var(--text-tertiary);
          font-family: var(--font-display);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .breadcrumb-back:hover {
          border-color: var(--aurora-cyan);
          color: var(--aurora-cyan);
          background: rgba(0, 245, 255, 0.05);
        }

        .tool-header {
          margin-bottom: 3rem;
        }

        .tool-header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .tool-title-section {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .tool-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tool-title-text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tool-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .tool-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tool-description {
          font-size: 1.125rem;
          color: var(--text-tertiary);
          max-width: 600px;
          line-height: 1.7;
        }

        .tool-meta {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--void-card);
          border: 1px solid var(--text-muted);
          border-radius: 16px;
          min-width: 200px;
        }

        .tool-meta-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .meta-label {
          font-size: 0.8125rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .meta-value {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .runtime-offline {
          color: var(--aurora-cyan);
        }

        .runtime-online {
          color: var(--aurora-gold);
        }

        .status-live {
          color: var(--aurora-cyan);
        }

        .status-draft {
          color: var(--aurora-pink);
        }

        .tool-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tool-tag {
          padding: 0.375rem 0.875rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--text-muted);
          border-radius: 100px;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          transition: all 0.3s ease;
        }

        .tool-tag:hover {
          border-color: var(--aurora-cyan);
          color: var(--aurora-cyan);
        }

        .tool-runner-section {
          margin-bottom: 3rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .title-icon {
          color: var(--aurora-cyan);
        }

        .tool-info-section {
          margin-bottom: 4rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .info-card {
          background: var(--void-card);
          border: 1px solid var(--text-muted);
          border-radius: 20px;
          padding: 1.5rem;
          transition: all 0.4s ease;
        }

        .info-card:hover {
          border-color: rgba(0, 245, 255, 0.2);
          transform: translateY(-4px);
        }

        .info-card.highlight {
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(189, 52, 254, 0.1) 100%);
          border-color: rgba(0, 245, 255, 0.3);
        }

        .info-card-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .info-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .info-list li {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.9375rem;
          color: var(--text-tertiary);
          line-height: 1.6;
        }

        .info-list li::before {
          content: "›";
          position: absolute;
          left: 0;
          color: var(--aurora-cyan);
          font-weight: 700;
        }

        .info-text {
          font-size: 0.9375rem;
          color: var(--text-tertiary);
          line-height: 1.7;
        }

        @media (max-width: 1024px) {
          .tool-header-content {
            flex-direction: column;
          }

          .tool-meta {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
          }

          .tool-meta-item {
            flex: 1;
            min-width: 150px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .tool-title-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .tool-icon {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </>
  );
}

// Error State Component
function ToolErrorState({ error, onBack }: { error: string; onBack: () => void }) {
  return (
    <div className="tool-page error">
      <div className="container">
        <div className="error-content">
          <div className="error-icon-large">⚠️</div>
          <h1>Tool Not Found</h1>
          <p>{error}</p>
          <button onClick={onBack} className="btn btn-primary">
            Back to Gallery
          </button>
        </div>
      </div>

      <style jsx>{`
        .tool-page.error {
          padding-top: 200px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .error-icon-large {
          font-size: 4rem;
          opacity: 0.8;
        }

        .error-content h1 {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--aurora-pink);
        }

        .error-content p {
          color: var(--text-tertiary);
          max-width: 400px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border-radius: 100px;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s ease;
          border: none;
          text-decoration: none;
        }

        .btn-primary {
          background: var(--gradient-aurora);
          color: var(--void);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
