import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const CardsWrapper = ({
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
          "mt-6 mb-6 mx-4 lg:mx-10 w-[380px] sm:w-[670px] md:w-[945px] lg:w-[960px] xl:w-[1050px] 2xl:w-[1440px] dark:bg-gradient-to-tl dark:via-[#2a2c33] dark:from-[#2a2c33] dark:to-[#4b4646] bg-gradient-to-r h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-50 rounded-2xl px-4"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardsWrapper;