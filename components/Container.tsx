import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${
        narrow ? "max-w-content" : "max-w-site"
      } ${className}`}
    >
      {children}
    </div>
  );
}
