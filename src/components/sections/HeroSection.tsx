"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title stagger animation
      gsap.fromTo(
        ".hero-title-word",
        { y: 100, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      // Other elements
      gsap.fromTo(
        ".hero-eyebrow",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: "power3.out" }
      );

      // Orbit stats animation
      gsap.fromTo(
        ".orbit-stat",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 1.3,
          ease: "back.out(1.7)",
        }
      );

      // Rings animation
      gsap.fromTo(
        ".hero-ring",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          delay: 0.5,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero">
      <motion.div className="container" style={{ y, opacity }}>
        <div className="hero-content">
          {/* Left - Typography */}
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="text-eyebrow">AI 驱动工具</span>
            </div>

            <h1 ref={titleRef} className="hero-title text-display text-mega">
              <span className="hero-title-word" style={{ display: "block" }}>
                每个微小
              </span>
              <span className="hero-title-word" style={{ display: "block" }}>
                的问题,
              </span>
              <span
                className="hero-title-word hero-title-highlight"
                style={{ display: "block" }}
              >
                一个文件解决。
              </span>
            </h1>

            <p className="hero-desc">
              将日常摩擦转化为独立的 HTML 工具。生成、下载，无需安装应用即可离线或在线运行。
            </p>

            <div className="hero-cta">
              <motion.a
                href="/create"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>创建工具</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: "8px" }}
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="#gallery"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                浏览工具
              </motion.a>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hero-visual">
            <div className="hero-orb-center" />

            {/* Rotating Rings */}
            <div className="hero-ring hero-ring-1" />
            <div className="hero-ring hero-ring-2" />
            <div className="hero-ring hero-ring-3" />

            {/* Floating Stats */}
            <div className="hero-orbit-stats">
              <motion.div
                className="orbit-stat"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="orbit-stat-value">100%</span>
                <span className="orbit-stat-label">离线可用</span>
              </motion.div>

              <motion.div
                className="orbit-stat"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.3,
                }}
              >
                <span className="orbit-stat-value">1 文件</span>
                <span className="orbit-stat-label">零依赖</span>
              </motion.div>

              <motion.div
                className="orbit-stat"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.6,
                }}
              >
                <span className="orbit-stat-value">∞</span>
                <span className="orbit-stat-label">永久使用</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="scroll-wheel" />
        </motion.div>
        <span className="scroll-text">向下滚动</span>
      </motion.div>
    </section>
  );
}
