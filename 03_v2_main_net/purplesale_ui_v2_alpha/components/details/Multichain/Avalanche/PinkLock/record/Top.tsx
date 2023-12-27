import React, { useEffect, useState } from "react";
import BgPinklockToken from "@/components/TailwindWrapper/PinklockToken/BgPinkLock";

const CountdownTimer = ({ timestamp }: { timestamp: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const timeDifference = timestamp - now;

    if (timeDifference > 0) {
      setTimeLeft(timeDifference);
    } else {
      setTimeLeft(0);
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timestamp]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${days.toString().padStart(2, "0")} : ${hours
      .toString()
      .padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timeComponents = formatTime(timeLeft).split(" : ");

  return (
    <div className="flex space-x-2">
      {timeComponents.map((component, index) => (
        <p
          key={index}
          className="dark:bg-[#aca4ff] bg-[#aca4ff] p-1 rounded text-center"
        >
          <span className="text-lg font-bold">{component}</span>
        </p>
      ))}
    </div>
  );
};

const TopBox = ({ EndTime }: { EndTime: number }) => {
  return (
    <BgPinklockToken>
      <div className="border-b-2 dark:border-stone-900 border-stone-100">
        <div className="mb-4 ">
          <h1 className="text-xl dark:text-gray-200 mb-4 flex justify-center text-neutral-900 font-bold ">
            Unlock in
          </h1>
          <div className="flex justify-center">
            <CountdownTimer timestamp={EndTime} />
          </div>
        </div>
      </div>
    </BgPinklockToken>
  );
};

export default TopBox;
