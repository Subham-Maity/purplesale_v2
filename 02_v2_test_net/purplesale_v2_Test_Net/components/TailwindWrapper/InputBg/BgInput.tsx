import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const BgInput = ({
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
          "mt-4 mx-4 p-8  lg:mx-10 w-[370px] sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1440px] dark:bg-[#1C1E2B] h-fit drop-shadow-xl transition-shadow shadow-stone-800 shadow-sm bg-stone-50 rounded-2xl "),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgInput;
