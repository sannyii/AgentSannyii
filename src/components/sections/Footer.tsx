"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Agent<span>Sannyii</span>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="#gallery" className="footer-link">
              工具
            </Link>
            <Link href="#features" className="footer-link">
              特性
            </Link>
            <Link href="/create" className="footer-link">
              创建
            </Link>
          </motion.div>

          <motion.div
            className="footer-copy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>单文件 AI 工具</span>
            <span className="footer-divider" />
            <span>© 2025</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
