import { cn } from "@/utils/Tailwind/Tailwind";
import { ReactNode } from "react";

const FormWrapper = ({
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
          "p-4 rounded-xl mt-8 mb-8 bg-stone-600/25 border border-gray-500/25 lg:ml-4 w-full"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
