import { HTMLAttributes, ReactNode } from "react";

export const Row = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => {
  return <div {...props}>{children}</div>;
};
