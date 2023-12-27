import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const BgPinklockToken = ({
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
          "mt-6 mb-6 lg:mx-10 mx-6 text-md font-medium lg:px-12 py-8 space-y-5 flex flex-col text-white w-[370px] sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1440px] items-left gap-x-28 dark:bg-gradient-to-tl dark:via-[#2a2c33] dark:from-[#2a2c33] dark:to-[#4b4646] bg-gradient-to-r h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-50 rounded-2xl"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgPinklockToken;
