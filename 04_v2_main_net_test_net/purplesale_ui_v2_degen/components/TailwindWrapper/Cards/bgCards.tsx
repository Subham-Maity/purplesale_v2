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
          "p-4 rounded-xl mt-8 mb-8  w-full bg-stone-600/25  h-fit px-4"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardsWrapper;
