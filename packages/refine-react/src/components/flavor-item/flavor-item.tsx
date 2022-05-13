import React from "react";
import type {
  RefineComponentName,
  RefineReactComponentProps,
} from "refine-core/types";
import { useFlavorItem } from "./use-flavor-item";

export type FlavorItemProps<Name extends RefineComponentName> = {
  name: RefineComponentName;
  children?: React.ReactNode;
} & Omit<RefineReactComponentProps<Name>, "className" | "style">;

export const FlavorItem = <Name extends RefineComponentName>({
  name,
  children,
  ...props
}: FlavorItemProps<Name>) => {
  const { component: Component, className, style } = useFlavorItem(name);

  return (
    <Component
      {...props}
      className={typeof className === "function" ? className({}) : className}
      style={typeof style === "function" ? style({}) : style}
    >
      {children}
    </Component>
  );
};
