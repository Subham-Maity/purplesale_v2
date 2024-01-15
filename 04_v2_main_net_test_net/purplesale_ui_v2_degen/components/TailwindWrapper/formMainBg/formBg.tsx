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
          "p-4 rounded-xl mx-2 flex items-center mt-8 mb-8 bg-stone-600/25 border border-gray-500/25 lg:ml-4 lg:mr-4 w-auto"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
