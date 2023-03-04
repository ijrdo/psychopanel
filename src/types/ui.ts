import { ReactNode } from "react";
export type PrimaryBTN = {
  children: ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};
