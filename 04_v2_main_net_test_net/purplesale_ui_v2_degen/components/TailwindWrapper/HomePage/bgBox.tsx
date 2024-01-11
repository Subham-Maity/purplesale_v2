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
        (className = "mt-6 mb-6  mx-4 w-full rounded-2xl px-4"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgBox;
