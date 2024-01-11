"use client";
import { useContext, useEffect, useState } from "react";
import { BsMoonFill } from "react-icons/bs";
import { motion } from "framer-motion";
import FormContext from "@/contexts/create/FormContext";

const Switcher = () => {
  const [mounted, setMounted] = useState(true);
  const { isDarkTheme, setIsDarkTheme } = useContext(FormContext);

  useEffect(() => {
    setMounted(true);
    setIsDarkTheme(true); // Set initial value to dark mode
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="">
      <motion.button
        id="theme-btn"
        aria-label="Toggle Dark Mode"
        className="text-xl"
        whileTap={{
          scale: 0.7,
          rotate: 360,
          transition: { duration: 0.2 },
        }}
        whileHover={{ scale: 1.2 }}
      >
        <BsMoonFill className="text-2xl" />
      </motion.button>
    </div>
  );
};
export default Switcher;
