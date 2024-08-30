import React, { useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Gift,
  HandsPraying,
} from "@phosphor-icons/react";
import Image from "next/image";

import withLove from "../assets/with_love.svg";
import celebrate from "../assets/border_bg.svg";
import celebrateVert from "../assets/border_bg-vert.svg";
import muna from "../assets/muna.webp";
import muna2 from "../assets/muna-2.webp";
import AudioPlayer from "./AudioPlayer";

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

const Countdown = () => {
  const [current, setCurrent] = useState(0);
  const [isExploding, setIsExploding] = React.useState(false);
  const [isExplodingEnded, setIsExplodingEnded] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);
  const [tooltip, setTooltip] = React.useState(true);

  const countdownComplete = () => {
    setIsExplodingEnded(true);
  };

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
    <div className="w-screen h-screen flex items-center justify-center overflow-x-hidden relative bg-[#F4E4DE]">
      <motion.div
        className="fixed right-0 bottom-14 flex items-center rounded-full overflow-hidden pl-2 z-10 gap-x-2 border border-[#7A1487] bg-[#ffffff]"
        initial={{ y: 100, opacity: 0, x: "-50%" }} // Start below the screen, hidden, and horizontally centered
        animate={{ y: 0, opacity: 1, x: "-50%" }} // Animate to its position, still centered
        transition={{
          type: "spring", // Use a spring animation for a bounce effect
          stiffness: 100, // Control the "bounciness"
          damping: 10, // Control the "speed" of the bounce
        }}
      >
        <div className="flex h-8 py-2 origin-bottom items-end gap-x-1">
          {Array(5)
            .fill()
            .map((_, i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-[#7A1487] block" // Ensure it's a block-level element to control height
                initial={{ height: 10 }}
                animate={{
                  height: Math.floor(Math.random() * (20 - 10 + 1)) + 10, // Random height between 10px and 30px
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
        </div>
        <p className="text-sm uppercase text-[#7A1487] font-semibold">
          simi - Happy birthday
        </p>

        <AudioPlayer setTooltip={setTooltip} />
      </motion.div>
      {tooltip && <motion.div 
      initial={{ opacity: 0, y: "0%" }}
      animate={{ opacity: 1, y: ["0%", "-20%"] }}
      transition={{
        opacity: { duration: 1, ease: "easeOut" }, // Fade-in duration and easing
        y: {
          duration: 1, // Duration of the up and down movement
          repeat: Infinity, // Repeat the animation infinitely
          repeatType: "loop", // Loop type: infinite loop
          ease: "easeInOut" // Smooth easing function for continuous movement
        }
      }}
      className="fixed rounded-full right-32 bottom-[100px] px-2 bg-[#7A1487] text-white">
        <div className="absolute -bottom-1 right-3 size-3 rotate-45 bg-[#7A1487] -z-10"></div>
        <p>
          <span className='whitespace-nowrap text-white/90 text-sm relative z-1'>Click me to start playing</span> 👇
          </p>
      </motion.div>}
      {!isExploding && (
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
      )}
      {isExploding && (
        <>
          <motion.div 
          initial={{ opacity: 0 }} // Start fully transparent and slightly below
          animate={{ opacity: 1 }} // Fade in to fully opaque and slide up to original position
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
          
          className="fixed left-0 top-0 h-10">
            <Image src={celebrate} alt="celebrate" />
          </motion.div>
          <motion.div
          initial={{ opacity: 0 }} // Start fully transparent and slightly below
          animate={{ opacity: 1 }} // Fade in to fully opaque and slide up to original position
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
           className="fixed left-0 bottom-0">
            <Image src={celebrate} className="-scale-100" alt="celebrate" />
          </motion.div>
          <motion.div
          initial={{ opacity: 0 }} // Start fully transparent and slightly below
          animate={{ opacity: 1 }} // Fade in to fully opaque and slide up to original position
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
           className="fixed left-0 bottom-0">
            <Image src={celebrateVert} className="scale-100" alt="celebrate" />
          </motion.div>
          <motion.div
          initial={{ opacity: 0 }} // Start fully transparent and slightly below
          animate={{ opacity: 1 }} // Fade in to fully opaque and slide up to original position
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
          className="fixed right-0 bottom-0">
            <Image src={celebrateVert} className="-scale-100" alt="celebrate" />
          </motion.div>

          <div className="fixed left-0 top-0 pl-10 w-[calc((100vw-1000px)/2)] h-screen">
            <div className=" animate-loop-scroll flex-col items-center flex -space-y-10 font-semibold ">
              <p className="text-[100px] text-[#7A1487]/10 ">H</p>
              <p className="text-[100px] text-[#7A1487]/10 ">A</p>
              <p className="text-[100px] text-[#7A1487]/10 ">P</p>
              <p className="text-[100px] text-[#7A1487]/10 ">P</p>
              <p className="text-[100px] text-[#7A1487]/10 ">Y</p>
              <br />
              <p className="text-[100px] text-[#7A1487]/10 ">B</p>
              <p className="text-[100px] text-[#7A1487]/10 ">I</p>
              <p className="text-[100px] text-[#7A1487]/10 ">R</p>
              <p className="text-[100px] text-[#7A1487]/10 ">T</p>
              <p className="text-[100px] text-[#7A1487]/10 ">H</p>
              <p className="text-[100px] text-[#7A1487]/10 ">D</p>
              <p className="text-[100px] text-[#7A1487]/10 ">A</p>
              <p className="text-[100px] text-[#7A1487]/10 ">Y</p>
            </div>
            <div className=" animate-loop-scroll flex-col items-center flex -space-y-10 font-semibold ">
              <p className="text-[100px] text-[#7A1487]/10 ">H</p>
              <p className="text-[100px] text-[#7A1487]/10 ">A</p>
              <p className="text-[100px] text-[#7A1487]/10 ">P</p>
              <p className="text-[100px] text-[#7A1487]/10 ">P</p>
              <p className="text-[100px] text-[#7A1487]/10 ">Y</p>
              <br />
              <p className="text-[100px] text-[#7A1487]/10 ">B</p>
              <p className="text-[100px] text-[#7A1487]/10 ">I</p>
              <p className="text-[100px] text-[#7A1487]/10 ">R</p>
              <p className="text-[100px] text-[#7A1487]/10 ">T</p>
              <p className="text-[100px] text-[#7A1487]/10 ">H</p>
              <p className="text-[100px] text-[#7A1487]/10 ">D</p>
              <p className="text-[100px] text-[#7A1487]/10 ">A</p>
              <p className="text-[100px] text-[#7A1487]/10 ">Y</p>
            </div>
          </div>

          
      <div className="fixed top-20 right-32 flex gap-4 items-center justify-center ">
                <button
                  disabled={selectedId === 0}
                  className={`${
                    selectedId === 0 && "opacity-30"
                  } flex items-center justify-center size-12 bg-white rounded-full text-[#7A1487]`}
                  onClick={() => setSelectedId(0)}
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  disabled={selectedId === 1}
                  className={`${
                    selectedId === 1 && "opacity-30"
                  } flex items-center justify-center size-12 bg-white rounded-full text-[#7A1487]`}
                  onClick={() => setSelectedId(1)}
                >
                  <ArrowRight size={20} />
                </button>
      </div>

          <div className=" mx-auto h-full w-[1000px] flex justify-center">
            <div className="flex w-[350px] flex-col justify-between py-20 h-full">
              <div className="flex w-full justify-end items-center pr-[50px]">
                <div className="flex items-center justify-center size-7 relative bg-[#F4E4DE] border border-[#7A1487] rounded-full">
                  <div className="size-5 bg-[#7A1487] rounded-full"></div>
                  <div className="w-px h-screen absolute -top-24 bg-[#7A1487]"></div>
                </div>
                <div className="w-2 h-px bg-[#7A1487] "></div>
                <div className="h-12 min-w-48 pl-2.5 pr-4 flex items-center  gap-x-1 bg-[#7A1487] text-white rounded-full">
                  <span className="flex items-center justify-center h-7 px-2 rounded-full bg-white/20 mr-3">
                    {selectedId === 0 ? "1" : "2"}{" "}
                    <span className="text-white/70">/2</span>
                  </span>
                  {selectedId === 0 && (
                    <>
                      <HandsPraying size={22} weight="duotone" />
                      <span className="text-xl">Wishes</span>
                    </>
                  )}
                  {selectedId === 1 && (
                    <>
                      <Gift size={22} weight="duotone" />
                      <span className="text-xl">Present</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                  animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[200px] h-[230px] bg-white rounded-2xl -rotate-[15deg] origin-left overflow-hidden"
                >
                  <div className="w-[300px] relative right-16 -top-8 group">
                    <Image
                      src={muna}
                      quality={100}
                      className="rotate-[15deg] group-hover:scale-110 group-hover:rotate-[1deg] transform transition-all duration-300"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                  animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
                  className="w-[200px] h-[230px] bg-white rounded-2xl rotate-[15deg] origin-left overflow-hidden"
                >
                  <div className="w-[300px] relative right-16 -top-8 group">
                    <Image
                      src={muna2}
                      quality={100}
                      className="-rotate-[15deg] group-hover:scale-110 group-hover:rotate-[1deg] transform transition-all duration-300"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="relative">
              {selectedId === 0 && (
                <div className="flex w-[650px] flex-col jusitfy-between pt-20 pr-20">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                    animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                    className="text-[28px] text-[#3A133F] font-bold"
                  >
                    Echoes of your strength and grace
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                    animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
                    className="mt-5 leading-[30px] text-[17px] text-[#3A133F] pr-16"
                  >
                    Kind but firm, courageous but gentle, you sometimes withdraw
                    to seclude yourself, but you always remain beautiful. These
                    are the words that fill my heart of hearts when the thought
                    of you echoes (every other minute, if I’m being honest
                    😂🤣). <br /> <span className="flex py-2"></span>
                    You are today the youngest you'll ever be; live in the
                    present and learn from your past. For the battles you have
                    survived, I am proud of you. For the battles to come, you'll
                    be victorious.
                    <br className="h-3" /> <span className="flex py-2"></span>
                    <span className="font-bold">Hey!</span> You are valued.{" "}
                    <span className="font-bold"> Period!</span> No ifs, no buts,
                    and you'll be favored,{" "}
                    <span className="font-bold"> (Bi-Iznillah) بإذن الله</span>
                    <br className="h-3" /> <span className="flex py-2"></span>
                    To the person you were, I love you. To the person you are
                    becoming, I am proud of you. I'm really excited for what
                    this next chapter will gift you.
                    <br className="h-3" /> <span className="flex py-2"></span>
                    <span className="font-bold">
                      Happy Birthday, Chimchim😍
                    </span>
                  </motion.p>
                </div>
              )}
              {selectedId === 1 && (
                <div className="flex flex-col pt-2">
                  <div className="flex w-[650px] flex-col gap-10 justify-center py-20">
                    <motion.h2 
                    initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                    animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                    className="text-2xl text-[#3A133F] font-semibold">
                      I have a present for you 😎
                      <br />
                      Choose one option and let me know
                    </motion.h2>
                    <div className="flex gap-1">
                      <motion.div
                      initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                      animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                      transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
                       className="relative w-[250px] h-[380px] bg-white rounded-2xl flex flex-col items-center justify-center -gap-y-10 text-9xl text-[#7A1487] overflow-hidden">
                        <Gift size={42} weight="duotone" />A
                        <span className="absolute bottom-0 -right-2 opacity-10 font-bold">
                          2
                        </span>
                      </motion.div>
                      <motion.div 
                      initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                      animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                      transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
                      className="relative w-[250px] h-[380px] bg-white rounded-2xl flex flex-col items-center justify-center text-9xl text-[#679DF7] overflow-hidden">
                        <Gift size={42} weight="duotone" />B
                        <span className="absolute bottom-0 -left-2 opacity-10 text-[#7A1487] font-bold">
                          5
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
                
              <motion.div
                initial={{ opacity: 0, y: 20 }} // Start fully transparent and slightly below
                animate={{ opacity: 1, y: 0 }} // Fade in to fully opaque and slide up to original position
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
                className=" absolute bottom-10"
              >
                <Image src={withLove} alt="with_love" />
              </motion.div>
            
            </div>
          </div>
        </>
      )}

      <>
        {isExploding && (
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={350}
            width={2500}
            height={"120vh"}
            onComplete={countdownComplete}
          />
        )}
      </>
      <>
        {isExplodingEnded && (
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={350}
            height={"120vh"}
            width={2000}
          />
        )}
      </>
    </div>
  );
};

export default Countdown;
