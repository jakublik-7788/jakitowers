"use client";

import React from "react";
import { motion } from "framer-motion";
import { FooterModals } from "./FooterModals";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-auto py-3 px-4 flex flex-col items-center bg-black/20">
      <FooterModals />
    </footer>
  );
};