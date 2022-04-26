import { Label } from "../../../components/label";
import { RefineFlavor } from "../../../components/refine-flavor";
import { Condition } from "../conditions/condition";
import { useCondition } from "../conditions/use-condition";
import { useCriterionGroup } from "../criterion-group/use-criterion-group";
import { useQueryBuilder } from "../query-builder/use-query-builder";
import { CriterionProvider } from "./use-criterion";

export type CriterionProps = {
  index: number;
};

export const Criterion = ({ index }: CriterionProps) => {
  const { blueprint } = useQueryBuilder();
  const { criteria, ...group } = useCriterionGroup();
  const criterion = criteria[index];

  if (!criterion) {
    throw new Error(
      `Could not find criterion index ${index} in group index ${group.index}.`
    );
  }

  const condition = useCondition(criterion.condition_id);

  return (
    <CriterionProvider
      value={{
        updateCondition: (conditionId) =>
          blueprint.replaceCriterion(criterion.position, {
            id: conditionId,
          }),
        updateInput: (input) => blueprint.updateInput(criterion, input),
        ...criterion,
      }}
    >
      <RefineFlavor<"criterion">
        name="criterion"
        data-testid="refine-criterion"
      >
        <RefineFlavor<"criterion.removeCriterionButton">
          name="criterion.removeCriterionButton"
          data-testid="refine-remove-criterion"
          onClick={() => blueprint.removeCriterion(criterion.position)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "1.25rem", height: "1.25rem" }}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <Label screenReaderOnly>Remove Criterion</Label>
        </RefineFlavor>
        <Condition condition={condition} />
      </RefineFlavor>
    </CriterionProvider>
  );
};
