import Image from "next/image";
import { Plus_Jakarta_Sans } from 'next/font/google'
import Countdown from "@/components/Countdown";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function Home() {
  return (
    <div
      className={` ${plusJakartaSans.className}`}
    >
     <Countdown />
    </div>
  );
}
