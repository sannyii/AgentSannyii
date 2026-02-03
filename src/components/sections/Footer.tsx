"use client";

import { motion } from "framer-motion";

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
            <a href="#gallery" className="footer-link">
              Tools
            </a>
            <a href="#features" className="footer-link">
              Features
            </a>
            <a href="#request" className="footer-link">
              Request
            </a>
          </motion.div>

          <motion.div
            className="footer-copy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Single-file AI utilities</span>
            <span className="footer-divider" />
            <span>© 2025</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
