import React from "react";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
const creators = () => {
  return (
    <div className="h-screen bg-black">
      <Navbar />
      <div className="flex justify-center items-center mt-20">
        <Leaderboard />
      </div>
    </div>
  );
};

export default creators;
