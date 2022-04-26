import type { RefineFlavorItem, RefineComponentName } from "refine-core/types";
import { useQueryBuilder } from "components";

export const useFlavorItem = <Name extends RefineComponentName>(
  name: Name
): RefineFlavorItem<Name, "react"> => {
  const { flavor } = useQueryBuilder();

  const nameParts = name.split(".");

  const flavorItem = nameParts.reduce(
    // @ts-expect-error
    (previousPart, name) => previousPart[name],
    flavor
  );

  if (!flavorItem) {
    throw new Error(`No flavor item found for ${name}.`);
  }

  return flavorItem as unknown as RefineFlavorItem<Name, "react">;
};
