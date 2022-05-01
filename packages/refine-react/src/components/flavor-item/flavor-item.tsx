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
    <Component {...props} className={className} style={style}>
      {children}
    </Component>
  );
};
