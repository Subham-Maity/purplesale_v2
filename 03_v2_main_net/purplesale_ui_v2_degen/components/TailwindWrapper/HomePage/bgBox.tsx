import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const BgBox = ({
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
          "mt-6 mb-6  mx-4 lg:mx-10 w-auto sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-auto 2xl:w-auto bg-gradient-to-tl via-[#2a2c33] from-[#2a2c33] to-[#4b4646] drop-shadow-xl transition-shadow shadow-stone-700 shadow-md  rounded-2xl px-4"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgBox;
