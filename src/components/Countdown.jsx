import React, { useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Gift,
  HandsPraying,
  Play,
} from "@phosphor-icons/react";
import Image from "next/image";

import withLove from "../assets/with_love.svg";
import celebrate from "../assets/border_bg.svg";
import celebrateVert from "../assets/border_bg-vert.svg";
// import audio from "../../public/happi.mp3";

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
  const [countAfter, setCountAfter] = useState(0);
  const [isExploding, setIsExploding] = React.useState(false);
  const [isExplodingEnded, setIsExplodingEnded] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);

  const audioRef = useRef(null);

  const countdownComplete = () => {
    setIsExplodingEnded(true);
  };

  const generateRandomHeights = () => {
    return Array(5)
      .fill()
      .map(() => Math.random() * 20 + 10); // Generate random heights between 10px and 50px
  };


  useEffect(() => {
    const audio = audioRef.current;
  
    if (audio) {
        audio.loop = true; // Enable looping
        audio.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      }
  
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible" && audio) {
          audio.play().catch((error) => {
            console.error("Failed to resume audio:", error);
          });
        }
      };
  
      document.addEventListener("visibilitychange", handleVisibilityChange);
  
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        if (audio) {
          audio.pause();
        }
      };
    }, []);

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
          <audio ref={audioRef} src="./happi.mp3" />
          <div className="fixed left-0 top-0 h-10">
            <Image src={celebrate} alt="celebrate" />
          </div>
          <div className="fixed left-0 bottom-0">
            <Image src={celebrate} className="-scale-100" alt="celebrate"/>
          </div>
          <div className="fixed left-0 bottom-0">
            <Image src={celebrateVert} className="scale-100" alt="celebrate" />
          </div>
          <div className="fixed right-0 bottom-0">
            <Image src={celebrateVert} className="-scale-100" alt="celebrate"/>
          </div>
          <div className="fixed right-20 top-20 flex origin-bottom items-end gap-x-1">
            {Array(5)
              .fill()
              .map((_, i) => (
                <motion.span 
                  key={i}
                  className="w-0.5 bg-[#7A1487] origin-center"
                  initial={{ height: 10 }}
                  animate={{
                    height: generateRandomHeights(),
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    // repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              ))}
          </div>
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

          <div className=" mx-auto h-full w-[1000px] flex justify-center border">
            <div className="flex w-[350px] flex-col justify-between py-20 h-full">
              <div className="flex w-full justify-end items-center pr-[50px]">
                <div className="flex items-center justify-center size-7 relative bg-[#F4E4DE] border border-[#7A1487] rounded-full">
                  <div className="size-5 bg-[#7A1487] rounded-full"></div>
                  <div className="w-px h-screen absolute -top-24 bg-[#7A1487]"></div>
                </div>
                <div className="w-2 h-px bg-[#7A1487] "></div>
                <div className="h-12 min-w-48 pl-2.5 pr-4 flex items-center  gap-x-1 bg-[#7A1487] text-white rounded-full">
                  <span className="flex items-center justify-center h-7 px-2 rounded-full bg-white/20 mr-3">
                    {selectedId === 0 ? "1" : "2"} <span className="text-white/70">/2
                  </span></span>
                  {selectedId === 0 && (
                    <>
                      <HandsPraying size={22} weight="duotone" />
                      <span className="text-xl">Wishes</span>
                    </>
                  )}
                  {selectedId === 1 && (
                    <>
                      <Gift size={22}  weight="duotone"/>
                      <span className="text-xl">Present</span>
                    </>
                  )} 
                </div>
              </div>
              <div className="flex flex-col gap-y-10">
                <div className="w-[210px] h-[250px] bg-white rounded-2xl -rotate-[15deg] origin-left"></div>
                <div className="w-[210px] h-[250px] bg-white rounded-2xl rotate-[15deg]"></div>
              </div>
            </div>
            <div className="relative">
              {selectedId === 0 && (
                <div className="flex w-[650px] flex-col jusitfy-between pt-20 pr-20">
                  <h3 className="text-[30px] text-[#3A133F] font-bold">
                    At Paystack, when we find music we like, we share to a #fun
                    music channel on Slack for others to enjoy
                  </h3>
                  <p className="mt-10 leading-[30px] text-lg text-[#3A133F] pr-16">
                    At the end of each month, our music bot automatically
                    fetches all the Spotify tracks, creates a mixtape with
                    custom cover art, and publishes it online. <br /> <span className="flex py-2"></span>
                    Like the people who co-created them, each playlist is an
                    eclectic mix, so don't be surprised if a grime track is
                    followed by amapiano 😅. Each mixtape captures the shared
                    highs and lows of the ~100 friends who make Paystack. Each
                    is a tapestry of many colours, spun by many hands. <br className="h-3"/>{" "}
                    <span className="flex py-2"></span>
                    Paystack Music is a gift from our team to yours. We hope you
                    find your next favourite song in these Slack mixtapes, and
                    that these tunes provide good company as you work on the
                    next big thing. Enjoy!
                  </p>

                  <div className="mt-10">
                    <Image src={withLove} alt="with_love" />
                  </div>
                </div>
              )}
              {selectedId === 1 && (
                <div className="flex flex-col pt-20">
                  <div className="flex w-[650px] flex-col gap-10 justify-center py-20">
                    <h2 className="text-2xl text-[#3A133F] font-semibold">
                      Choose one option and let me know 😎
                    </h2>
                    <div className="flex gap-10">
                      <div className="w-[250px] h-[320px] bg-white rounded-2xl flex flex-col items-center justify-center -gap-y-10 text-9xl text-[#7A1487] ">
                      <Gift size={42} weight="duotone" />
                        A
                      </div>
                      <div className="w-[250px] h-[320px] bg-white rounded-2xl flex flex-col items-center justify-center text-9xl text-[#7A1487] ">
                      <Gift size={42} weight="duotone" />
                        B
                      </div>
                    </div>
                  </div>
                  <div className="mt-28">
                    <Image src={withLove} alt="with_love" />
                  </div>
                </div>
              )}
              <div className="absolute h-full top-0 -right-20 flex flex-col gap-4 items-center justify-center pl-10">
                <button
                  disabled={selectedId === 0}
                  className={`${
                    selectedId === 0 && "opacity-30"
                  } flex items-center justify-center size-12 bg-white rounded-full text-[#7A1487]`}
                  onClick={() => setSelectedId(0)}
                >
                  <ArrowUp size={20} />
                </button>
                <button
                  disabled={selectedId === 1}
                  className={`${
                    selectedId === 1 && "opacity-30"
                  } flex items-center justify-center size-12 bg-white rounded-full text-[#7A1487]`}
                  onClick={() => setSelectedId(1)}
                >
                  <ArrowDown size={20} />
                </button>
              </div>
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
