import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const DetailsSize = ({
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
          "mt-6 mb-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:gap-24 xl:grid-cols-1 2xl:grid-cols-2"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DetailsSize;
