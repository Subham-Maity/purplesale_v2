import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const BgLeaderboard = ({
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
          "mt-6 mb-6 mx-5 lg:mx-10 text-xl font-medium lg:px-12 py-8 space-y-5 flex flex-col text-white w-[370px] sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1350px] items-left  h-fit "),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgLeaderboard;
