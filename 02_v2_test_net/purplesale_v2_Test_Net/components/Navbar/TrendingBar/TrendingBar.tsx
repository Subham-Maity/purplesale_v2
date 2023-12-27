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

  const itemsToShow = width < 600 ? 0 : width < 1024 ? 3 : 8;

  return (
    <div className="hidden md:block lg:block">
      <div className="flex h-16 items-center justify-between">
        <div className="dark:text-white flex space-x-1 text-black mr-2 py-1">
          <h1 className="text-3xl dark:text-gray-100 font-medium tracking-tight text-gray-900 border-r-2 border-gray-400 mb-2 pr-4">
            Trending
          </h1>
          <button
            className="mb-4 text-gray-500 hover:text-white hover:font-bold "
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
                  className={`font-light my-auto flex items-center bg-[#333333] rounded-3xl px-3 py-2${
                    index <= 3
                      ? " text-yellow-900 dark:text-yellow-500"
                      : " text-gray-900 dark:text-gray-200"
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
    </div>
  );
};

export default dynamic(() => Promise.resolve(TrendingBar), { ssr: false });
