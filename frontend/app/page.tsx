import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";
import Link from "next/link";
import { NEXT_PUBLIC_URL } from "./config";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const styles = {
  backgroundImage: {
    backgroundImage: `url('/character-collage.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "91.4vh",
    width: "50%",
    // Added border radius for a softer look
  },
};

const Page = () => {
  return (
    <div className="flex  justify-center gap-10">
      <div
        className="relative overflow-hidden"
        style={styles.backgroundImage}
      ></div>

      <div className="w-[50%] flex flex-col justify-center px-10">
        <div className="flex items-center mb-9 text-gray-600">
          <p className="text-sm">Powered by Farcaster</p>
          <Image
            className="ml-2 rounded-full"
            src="/farcaster-logo.png"
            alt="Farcaster Logo"
            width={20}
            height={20}
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Cast Your Own AI Character with{" "}
          <span className="text-[#845DCC]">Cast AI </span>
        </h1>
        <p className="text-lg mb-4 text-gray-800">
          Interact with your AI Character on Farcaster. Customize their
          personality and engage in various activities.
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li className="text-base">
            Explore different stories and adventures.
          </li>
          <li className="text-base">Send Base Sepolia transactions.</li>
        </ul>
        <div className="flex gap-5 mt-8">
          <Link href={"/create"}>
            <Button className="px-8 py-3 bg-[#845DCC] text-white hover:bg-[#6344A6]">
              Cast AI
            </Button>
          </Link>
          <Link href={"/explore"}>
            <Button className="px-8 py-3 border border-gray-300 text-gray-800 bg-transparent hover:bg-gray-100">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
