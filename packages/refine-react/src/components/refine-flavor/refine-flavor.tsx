import type {
  RefineComponentName,
  RefineReactComponentProps,
} from "refine-core/types";
import { useFlavor } from "./use-flavor";

export type RefineFlavorProps<Name extends RefineComponentName> = {
  name: RefineComponentName;
  children?: React.ReactNode;
} & Omit<RefineReactComponentProps<Name>, "className" | "style">;

export const RefineFlavor = <Name extends RefineComponentName>({
  name,
  children,
  ...props
}: RefineFlavorProps<Name>) => {
  const { component: Component, className, style } = useFlavor(name);

  return (
    <Component {...props} className={className} style={style}>
      {children}
    </Component>
  );
};
