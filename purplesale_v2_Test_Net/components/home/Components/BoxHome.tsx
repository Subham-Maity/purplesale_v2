import React from "react";

interface props {
  stats: Array<{ number: number; title: string }>;
}

const BoxHome = () => {
  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-3 whitespace-nowrap justify-items-center md:gap-20">
        <div className="flex flex-col items-center justify-center gap-4 h-[95px] w-[95px] sm:h-[120px] sm:w-[160px] lg:h-[270px] lg:w-[313px] dark:bg-gradient-to-l dark:from-[#313136] dark:via-[#4d3c7b] dark:to-[#4f3c7f] border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-xl ">
          <p className="font-bold lg:text-6xl md:text-5xl text-3xl whitespace-nowrap">
            {652}
          </p>
          <p className="font-normal lg:text-4xl md:text-3xl text-md whitespace-nowrap ">
            Heading
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-[95px] w-[95px] sm:h-[120px] sm:w-[160px] lg:h-[270px] lg:w-[313px] dark:bg-gradient-to-r dark:from-[#313136] dark:via-[#4d3c7b] dark:to-[#4f3c7f] border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-xl ">
          <p className="font-bold lg:text-6xl md:text-5xl text-3xl whitespace-nowrap">
            {652}
          </p>
          <p className="font-normal lg:text-4xl md:text-3xl text-md whitespace-nowrap ">
            Heading
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-[95px] w-[95px] sm:h-[120px] sm:w-[160px] lg:h-[270px] lg:w-[313px] dark:bg-gradient-to-b dark:from-[#313136] dark:via-[#4d3c7b] dark:to-[#4f3c7f] border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-xl ">
          <p className="font-bold lg:text-6xl md:text-5xl text-3xl whitespace-nowrap">
            {652}
          </p>
          <p className="font-normal lg:text-4xl md:text-3xl text-md whitespace-nowrap ">
            Heading
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoxHome;
