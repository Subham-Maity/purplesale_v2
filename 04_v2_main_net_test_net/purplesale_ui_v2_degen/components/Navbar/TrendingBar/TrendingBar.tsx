import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import dynamic from "next/dynamic";

interface Item {
  name: string;
  image: string;
  href: string;
}

interface TrendingBarProps {
  loop?: boolean;
  Trending: Item[];
}

const TrendingBar: React.FC<TrendingBarProps> = ({
  loop = false,
  Trending,
}) => {
  const [width, setWidth] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const scroll = (scrollOffset: number) => {
    const smoothScroll = () => {
      if (!scrollContainer.current) {
        clearInterval(intervalId);
      } else if (
        (direction === 1 &&
          scrollContainer.current.scrollLeft >=
            scrollContainer.current.scrollWidth -
              scrollContainer.current.clientWidth -
              1) ||
        (direction === -1 && scrollContainer.current.scrollLeft <= 1)
      ) {
        setDirection(-direction); // Change direction when reaching an end
        clearInterval(intervalId);
      } else {
        scrollContainer.current.scrollLeft += direction;
        scrollOffset -= 1;
      }
    };

    const intervalId = setInterval(smoothScroll, 50);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (loop) {
      intervalId = setInterval(() => {
        scroll(100);
      }, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [loop, direction]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (loop) {
      intervalId = setInterval(() => {
        scroll(100);
      }, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [loop]);

  const itemsToShow = width < 600 ? 0 : width < 1024 ? 3 : 20;

  return (
    <div className="hidden md:block lg:block bg-gray-700/25 rounded-2xl">
      <div className="text-white flex space-x-1 mr-2 py-1">
        <button
          className="text-gray-500 hover:text-white hover:font-bold "
          onClick={() => scroll(-100)}
        >
          <FiChevronLeft />
        </button>
        <div
          ref={scrollContainer}
          className="flex items-center space-x-2 overflow-x-auto"
          style={{
            width: `calc(${itemsToShow} * 100px)`,
          }}
        >
          {Trending?.map((item, index) => (
            <Link key={index} href={item.href}>
              <div
                className={`font-light my-auto flex items-center bg-gray-700/75 rounded-lg px-4 py-2${
                  index <= 3 ? " text-yellow-200" : " text-gray-200"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  height={100}
                  width={100}
                  className="h-5 w-5 rounded-full space-x-1"
                />
                <span className="mx-4 text-sm font-medium ">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="mb-4 text-gray-500 hover:text-white hover:font-bold "
          onClick={() => scroll(100)}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(TrendingBar), { ssr: false });
