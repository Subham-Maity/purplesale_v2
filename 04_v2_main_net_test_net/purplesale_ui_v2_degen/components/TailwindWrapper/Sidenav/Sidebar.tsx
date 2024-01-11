import { ReactNode } from "react";
import { cn } from "@/utils/Tailwind/Tailwind";

const SidebarWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("pt-0", className)}>{children}</div>;
};

export default SidebarWrapper;
