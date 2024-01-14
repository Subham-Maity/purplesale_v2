import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const CardsWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn((className = ""), className)}>{children}</div>;
};

export default CardsWrapper;
