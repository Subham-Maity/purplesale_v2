import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const BgAdvanceLaunchPadList = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        (className =
          "mt-6 mb-6  mx-4 lg:mx-10 w-auto sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1440px] dark:bg-[#2c2b2c]  h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-50 rounded-2xl px-4 overflow-x-auto whitespace-nowrap"), // Added overflow-x-auto and whitespace-nowrap here
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgAdvanceLaunchPadList;
