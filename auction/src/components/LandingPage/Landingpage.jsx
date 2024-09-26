import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import video from '../assets/invideo-ai-1080-Discover-Your-Dream-Home-with-BidNest.mp4';
import Image from "../assets/Bid-removebg-preview.png";

const Landingpage = () => {
  useEffect(() => {
    const videoElement = document.getElementById("backgroundVideo");

    const playVideoWithSound = () => {
      if (videoElement) {
        videoElement.muted = false;
        videoElement.play();
      }
    };

    document.addEventListener("click", playVideoWithSound);

    return () => {
      document.removeEventListener("click", playVideoWithSound);
    };
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <video
          id="backgroundVideo"
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          src={video}
        ></video>
      </div>
      {/* Text in the Middle */}
      <div className="flex flex-col gap-2 absolute inset-0 items-center justify-center">
        <div className="text-white text-center">
          <img className="w-[800px] h-[400px]" src={Image} alt="Bid Nest Logo" />
        </div>
        <Link to="/customer">
          <button className="rounded-md shadow-sm bg-[#105955] hover:bg-[#105955] text-white px-4 py-2">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landingpage;
