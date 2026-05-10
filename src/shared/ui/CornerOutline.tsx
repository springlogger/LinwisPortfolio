import type { ReactNode } from "react";

type CornerOutlineProps = {
  children: ReactNode;
  className?: string;
  cornerClassName?: string;
};

export function CornerOutline({
  children,
  className = "",
  cornerClassName = "",
}: CornerOutlineProps) {
  const baseCornerClass =
    "pointer-events-none absolute h-4 w-4 border-current";

  return (
    <div className={`relative ${className}`}>
      <span
        className={`${baseCornerClass} left-0 top-0 border-l-2 border-t-2 ${cornerClassName}`}
      />
      <span
        className={`${baseCornerClass} right-0 top-0 border-r-2 border-t-2 ${cornerClassName}`}
      />
      <span
        className={`${baseCornerClass} bottom-0 left-0 border-b-2 border-l-2 ${cornerClassName}`}
      />
      <span
        className={`${baseCornerClass} bottom-0 right-0 border-b-2 border-r-2 ${cornerClassName}`}
      />

      {children}
    </div>
  );
}