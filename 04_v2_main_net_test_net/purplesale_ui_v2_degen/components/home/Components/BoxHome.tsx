import React from "react";
import { BsBarChartFill } from "react-icons/bs";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";

interface props {
  stats: Array<{ number: number; title: string }>;
}

const BoxHome = () => {
  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 whitespace-nowrap justify-items-center md:gap-20">
        <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[153px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
          <span className="flex justify-between gap-4">
            <BsBarChartFill className="text-5xl text-green-400" />
            <span className="flex flex-col">
              <p className="font-extrabold lg:text-4xl md:text-5xl text-3xl whitespace-nowrap">
                $462.9M
              </p>
              <p className="font-normal text-white  lg:text-2xl md:text-3xl text-md whitespace-nowrap ">
                Total Liquidity Raised
              </p>
            </span>
          </span>
        </div>
        <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[153px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
          <span className="flex justify-between gap-4">
            <AiOutlineSafetyCertificate className="text-5xl text-green-400" />
            <span className="flex flex-col">
              <p className="font-extrabold lg:text-4xl md:text-5xl text-3xl whitespace-nowrap">
                20965
              </p>
              <p className="font-normal text-white  lg:text-2xl md:text-3xl text-md whitespace-nowrap ">
                Total Projects
              </p>
            </span>
          </span>
        </div>
        <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[153px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
          <span className="flex justify-between gap-4">
            <HiOutlineUserGroup className="text-5xl text-green-400" />
            <span className="flex flex-col">
              <p className="font-extrabold lg:text-4xl md:text-5xl text-3xl whitespace-nowrap">
                2.4M
              </p>
              <p className="font-normal text-white  lg:text-2xl md:text-3xl text-md whitespace-nowrap ">
                Total Participants
              </p>
            </span>
          </span>
        </div>
        <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[153px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
          <span className="flex justify-between gap-4">
            <BsBarChartFill className="text-5xl text-green-400" />
            <span className="flex flex-col">
              <p className="font-extrabold lg:text-4xl md:text-5xl text-3xl whitespace-nowrap">
                $462.9M
              </p>
              <p className="font-normal text-white  lg:text-2xl md:text-3xl text-md whitespace-nowrap ">
                Total Liquidity Raised
              </p>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoxHome;
