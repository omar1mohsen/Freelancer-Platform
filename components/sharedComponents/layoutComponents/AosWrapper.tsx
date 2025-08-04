"use client"
import  { useEffect } from 'react'

import "aos/dist/aos.css"; 

const AosWrapper = () => {
  useEffect(() => {
    const AOS = require("aos");

    AOS.init({
      duration: 500,
      offset: 0, 
      once: true, 
      easing: "ease-in-out",
    });
  }, []);

  return null;
}

export default AosWrapper