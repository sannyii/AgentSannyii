"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToolRunnerProps {
  htmlContent: string;
  title: string;
}

type ViewMode = "desktop" | "mobile" | "fullscreen";

export function ToolRunner({ htmlContent, title }: ToolRunnerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!htmlContent) {
      setError("No tool content provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Small delay to show loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [htmlContent]);

  // Reload iframe content
  const handleRefresh = () => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  };

  // Download as HTML file
  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Open in new tab
  const handleOpenNewTab = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const getContainerWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "desktop":
        return "100%";
      case "fullscreen":
        return "100%";
      default:
        return "100%";
    }
  };

  return (
    <div className="tool-runner">
      {/* Toolbar */}
      <div className="tool-runner-toolbar">
        <div className="tool-runner-view-modes">
          <motion.button
            className={`view-mode-btn ${viewMode === "desktop" ? "active" : ""}`}
            onClick={() => setViewMode("desktop")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Desktop view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>Desktop</span>
          </motion.button>
          
          <motion.button
            className={`view-mode-btn ${viewMode === "mobile" ? "active" : ""}`}
            onClick={() => setViewMode("mobile")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Mobile view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="3" width="12" height="18" rx="2" />
              <line x1="12" y1="17" x2="12" y2="17.01" />
            </svg>
            <span>Mobile</span>
          </motion.button>

          <motion.button
            className={`view-mode-btn ${viewMode === "fullscreen" ? "active" : ""}`}
            onClick={() => setViewMode("fullscreen")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Fullscreen"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
            <span>Full</span>
          </motion.button>
        </div>

        <div className="tool-runner-actions">
          <motion.button
            className="toolbar-btn"
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Refresh"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </motion.button>

          <motion.button
            className="toolbar-btn"
            onClick={handleOpenNewTab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Open in new tab"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </motion.button>

          <motion.button
            className="toolbar-btn primary"
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Download HTML"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download</span>
          </motion.button>
        </div>
      </div>

      {/* Preview Container */}
      <div className={`tool-runner-preview ${viewMode}`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="tool-runner-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-spinner" />
              <p>Loading tool...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="tool-runner-error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="error-icon">⚠️</div>
              <p>{error}</p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              className="tool-runner-frame-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                width: getContainerWidth(),
                maxWidth: viewMode === "mobile" ? "375px" : "100%",
                margin: "0 auto",
              }}
            >
              {/* Device Frame (for mobile view) */}
              {viewMode === "mobile" && (
                <div className="mobile-device-frame">
                  <div className="mobile-notch" />
                </div>
              )}
              
              <iframe
                ref={iframeRef}
                className="tool-runner-iframe"
                sandbox="allow-scripts allow-same-origin allow-downloads allow-popups"
                title={title}
                srcDoc={htmlContent}
                style={{
                  width: "100%",
                  height: viewMode === "fullscreen" ? "calc(100vh - 200px)" : "600px",
                  border: "none",
                  borderRadius: viewMode === "mobile" ? "0 0 40px 40px" : "12px",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CSS for ToolRunner */}
      <style jsx>{`
        .tool-runner {
          background: var(--void-card);
          border: 1px solid var(--text-muted);
          border-radius: 24px;
          overflow: hidden;
        }

        .tool-runner-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--text-muted);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .tool-runner-view-modes {
          display: flex;
          gap: 0.5rem;
        }

        .view-mode-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          border: 1px solid var(--text-muted);
          background: transparent;
          color: var(--text-tertiary);
          font-family: var(--font-display);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-mode-btn:hover {
          border-color: var(--aurora-cyan);
          color: var(--text-primary);
        }

        .view-mode-btn.active {
          background: rgba(0, 245, 255, 0.1);
          border-color: var(--aurora-cyan);
          color: var(--aurora-cyan);
        }

        .tool-runner-actions {
          display: flex;
          gap: 0.5rem;
        }

        .toolbar-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          border: 1px solid var(--text-muted);
          background: transparent;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toolbar-btn:hover {
          border-color: var(--aurora-cyan);
          color: var(--text-primary);
        }

        .toolbar-btn.primary {
          background: var(--gradient-aurora);
          border: none;
          color: var(--void);
          font-weight: 600;
        }

        .toolbar-btn.primary:hover {
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
        }

        .tool-runner-preview {
          padding: 1.5rem;
          background: var(--void);
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tool-runner-preview.mobile {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        .tool-runner-frame-wrapper {
          position: relative;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-device-frame {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 20px;
          background: #2a2a3e;
          border-radius: 10px 10px 0 0;
        }

        .mobile-notch {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 4px;
          background: #1a1a2e;
          border-radius: 2px;
        }

        .tool-runner-iframe {
          background: var(--void);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .tool-runner-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-tertiary);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--text-muted);
          border-top-color: var(--aurora-cyan);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .tool-runner-error {
          text-align: center;
          color: var(--aurora-pink);
          padding: 2rem;
        }

        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .tool-runner-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .tool-runner-view-modes,
          .tool-runner-actions {
            justify-content: center;
          }

          .view-mode-btn span,
          .toolbar-btn span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
