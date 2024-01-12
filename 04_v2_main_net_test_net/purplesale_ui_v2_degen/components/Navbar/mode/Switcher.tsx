"use client";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { motion } from "framer-motion";
import FormContext from "@/contexts/create/FormContext";
import { IoPartlySunny } from "react-icons/io5";

const Switcher = () => {
  const [mounted, setMounted] = useState(false);
  const { isDarkTheme, setIsDarkTheme } = useContext(FormContext);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setIsDarkTheme(theme === "dark"); // Set initial value based on the theme
  }, [theme]);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      {/* The current theme is: {theme} */}
      <motion.button
        id="theme-btn"
        aria-label="Toggle Dark Mode"
        className="text-xl ml-auto rounded-full bg-gray-500 hover:bg-gray-600 p-2 text-white dark:bg-gray-700
                      dark:hover:text-white dark:hover:bg-gray-600 drop hover:cursor-pointer cursor-pointer"
        whileTap={{
          scale: 0.7,
          rotate: 360,
          transition: { duration: 0.2 },
        }}
        whileHover={{ scale: 1.2 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <IoPartlySunny /> : <BsFillMoonStarsFill />}
      </motion.button>
    </div>
  );
};
export default Switcher;
