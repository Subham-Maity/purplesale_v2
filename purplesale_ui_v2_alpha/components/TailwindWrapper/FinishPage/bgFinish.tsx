import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const FinishWrapper = ({
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
          "mt-6 mb-6 mx-4 lg:mx-10 text-sm lg:text-xl font-medium px-12 py-8 space-y-5 flex flex-col text-white w-[370px] sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1340px] items-left gap-x-28 bg-gradient-to-tl via-[#2a2c33] from-[#2a2c33] to-[#4b4646]  h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-50 rounded-2xl"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FinishWrapper;
