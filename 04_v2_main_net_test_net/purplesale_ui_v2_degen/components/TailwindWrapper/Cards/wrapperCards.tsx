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
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-x-52 lg:px-12 lg:py-4 justify-items-center"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardsWrapper;
