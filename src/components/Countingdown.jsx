import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

const countdownNumber = [
    {
      id: 0,
      value: 1,
      color: "text-[#BDC7DF]",
      playerBgColor: "bg-[#EEECFF]",
      bgColor: "bg-[#BDB9DC]",
      activeBgColor: "bg-[#462AA1]",
    },
    {
      id: 1,
      value: 2,
      color: "text-[#DDBBBC]",
      playerBgColor: "bg-[#F8E0E0]",
      bgColor: "bg-[#DDBBBC]",
      activeBgColor: "bg-[#CC4A2D]",
    },
    {
      id: 2,
      value: 3,
      color: "text-[#D6BCD7]",
      bgColor: "bg-[#F4DEF4]",
      playerBgColor: "bg-[#D6BCD7]",
      activeBgColor: "bg-[#8A237B]",
    },
  ];

const Countingdown = ({isExplodingEnded, setIsExploding}) => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrent((prev) => {
            if (prev < 2) {
              return prev + 1;
            } else {
              setIsExploding(true);
              clearInterval(interval);
              return prev;
            }
          });
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
  return (
    <motion.h1
          key={current}
          className={`text-[400px] text-[#7A1487]`}
          initial={{ y: 100, opacity: 0 }} // Start below the screen and hidden
          animate={
            isExplodingEnded ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }
          } // Animate to its position with full opacity
          transition={{
            type: "spring", // Use a spring animation for a bounce effect
            stiffness: 100, // Control the "bounciness"
            damping: 10, // Control the "speed" of the bounce
          }}
        >
          {countdownNumber[current].value}
        </motion.h1>
  )
}

export default Countingdown