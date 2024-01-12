import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const BgBox = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn((className = ""), className)}>{children}</div>;
};

export default BgBox;
