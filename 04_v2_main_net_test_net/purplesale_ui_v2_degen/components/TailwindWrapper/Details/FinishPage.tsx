import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const DetailsFinishWrapper = ({
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
          "mt-6 mb-6 mx-4 lg:mx-10 text-md font-medium break-words lg:px-12 px-4 py-8 space-y-5 flex flex-col text-white w-full items-left gap-x-28   h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-600/25 rounded-2xl"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DetailsFinishWrapper;
