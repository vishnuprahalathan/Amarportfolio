"use client";

import { useEffect, useState } from "react";

export default function DynamicTitle() {
  const [isTabActive, setIsTabActive] = useState(true);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 800);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isTabActive) {
      document.title = `${blink ? "●" : " "} REC | AMAR`;
    } else {
      document.title = "Director is Busy...";
    }
  }, [isTabActive, blink]);

  return null;
}
