"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="feature-section">
      <div className="container">
        {/* Section Header - Lando Style */}
        <motion.div
          className="feature-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="split-text">
            <div className="split-text-line">
              <span className="split-text-label">Mode</span>
              <span className="split-text-content">
                ONLINE <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
                <span className="text-aurora">OFFLINE</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="feature-grid">
          {/* Online Card */}
          <motion.div
            className="feature-card"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="feature-visual online-visual">
              <div className="visual-glow online-glow" />
              <svg
                viewBox="0 0 120 120"
                className="feature-icon"
                fill="none"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#online-gradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="rotating-circle"
                />
                <circle cx="60" cy="60" r="20" fill="url(#online-gradient)" />
                <path
                  d="M50 60L57 67L72 52"
                  stroke="var(--void)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="online-gradient"
                    x1="0"
                    y1="0"
                    x2="120"
                    y2="120"
                  >
                    <stop stopColor="#00f5ff" />
                    <stop offset="1" stopColor="#4facfe" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="feature-content">
              <span className="feature-card-label">Connected</span>
              <h3 className="feature-card-title">
                ONLINE
                <br />
                <span style={{ color: "var(--text-tertiary)" }}>TOOLS</span>
              </h3>
              <p className="feature-card-desc">
                Access AI-powered features that require cloud connectivity.
                Video processing, cloud storage, and real-time collaboration
                tools.
              </p>
            </div>
          </motion.div>

          {/* Offline Card */}
          <motion.div
            className="feature-card"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="feature-visual offline-visual">
              <div className="visual-glow offline-glow" />
              <svg
                viewBox="0 0 120 120"
                className="feature-icon"
                fill="none"
              >
                <rect
                  x="25"
                  y="35"
                  width="70"
                  height="50"
                  rx="8"
                  stroke="url(#offline-gradient)"
                  strokeWidth="2"
                />
                <path
                  d="M35 55L50 70L85 45"
                  stroke="url(#offline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="95"
                  cy="25"
                  r="12"
                  fill="var(--aurora-purple)"
                />
                <path
                  d="M89 25H101M95 19V31"
                  stroke="var(--void)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="offline-gradient"
                    x1="0"
                    y1="0"
                    x2="120"
                    y2="120"
                  >
                    <stop stopColor="#bd34fe" />
                    <stop offset="1" stopColor="#ff2a9d" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="feature-content">
              <span
                className="feature-card-label"
                style={{ color: "var(--aurora-pink)" }}
              >
                Independent
              </span>
              <h3 className="feature-card-title">
                OFFLINE
                <br />
                <span style={{ color: "var(--text-tertiary)" }}>TOOLS</span>
              </h3>
              <p className="feature-card-desc">
                Download once, keep forever. Pure HTML files that run entirely in
                your browser with zero external dependencies. Your data never
                leaves your device.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
