import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const FinishDisqusWrapper = ({
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
          "mt-6 mb-6 mx-4 lg:mx-10 text-xl font-medium py-8 flex flex-col text-white w-full items-left gap-x-28 dark:bg-stone-600/25 h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-600/25 rounded-2xl"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FinishDisqusWrapper;
