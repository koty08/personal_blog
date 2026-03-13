"use client";

import { motion } from "framer-motion";

export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="bg-amber-400/5 absolute -top-32 -left-32 h-140 w-140 rounded-full blur-[120px] dark:bg-purple-600/10"
        animate={{ x: [0, 50, 10, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-20 -right-20 h-120 w-120 rounded-full bg-violet-500/10 blur-[100px] dark:bg-cyan-400/12"
        animate={{ x: [0, -40, -10, 0], y: [0, 40, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] dark:bg-indigo-400/10"
        animate={{ x: [0, 60, -30, 0], y: [0, -50, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />
      <motion.div
        className="absolute -right-16 -bottom-24 h-130 w-130 rounded-full bg-emerald-500/12 blur-[110px] dark:bg-teal-400/5"
        animate={{ x: [0, -30, 10, 0], y: [0, -40, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-10 h-90 w-90 rounded-full bg-sky-500/12 blur-[90px] dark:bg-fuchsia-500/5"
        animate={{ x: [0, 40, -10, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />
      <motion.div
        className="absolute -top-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-0 blur-[90px] bg-cyan-500/10 dark:bg-rose-500/10 dark:opacity-100"
        animate={{ x: [0, 20, -20, 0], y: [0, 40, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 10 }}
      />
    </div>
  );
}
