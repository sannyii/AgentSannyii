"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="request" className="cta-section">
      <div className="container">
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background Glow */}
          <div className="cta-glow" />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.span
              className="text-eyebrow"
              style={{ color: "var(--aurora-gold)", display: "block", marginBottom: "1.5rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Coming Soon
            </motion.span>

            <motion.h2
              className="cta-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Describe the
              <br />
              <span className="text-aurora">next utility</span>
            </motion.h2>

            <motion.p
              className="cta-desc"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Have an idea for a tool? Upload your requirements and let AI
              generate a custom HTML utility tailored to your needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                className="btn btn-primary"
                style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 245, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Request Early Access</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: "10px" }}
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
