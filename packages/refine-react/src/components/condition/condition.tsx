import { useMemo } from "react";
import type { Condition as ConditionType } from "refine-core/types";
import {
  inputComponents,
  useCriterion,
  FlavorItem,
  InputProvider,
  useQueryBuilder,
  useSelectedClause,
} from "components";

export type ConditionProps = {
  condition: ConditionType;
};

export const Condition = ({ condition }: ConditionProps) => {
  const { conditions } = useQueryBuilder();
  const criterion = useCriterion();
  const selectedClause = useSelectedClause(condition, criterion.input.clause);

  const hasInput = !!selectedClause?.component;

  const InputComponent = useMemo(() => {
    if (
      selectedClause.component &&
      selectedClause.component in inputComponents
    ) {
      // @ts-expect-error
      return inputComponents[selectedClause.component];
    }

    return null;
  }, [selectedClause?.component]);

  return (
    <FlavorItem<"condition"> name="condition" data-testid="refine-condition">
      <FlavorItem<"select.wrapper"> name="select.wrapper">
        <FlavorItem<"select">
          name="select"
          value={condition.id}
          onChange={(event) => criterion.updateCondition(event.target.value)}
        >
          {conditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.display}
            </option>
          ))}
        </FlavorItem>
      </FlavorItem>
      <FlavorItem<"select.wrapper"> name="select.wrapper">
        <FlavorItem<"select">
          name="select"
          value={selectedClause.id}
          onChange={(event) =>
            criterion.updateInput({
              clause: event.target.value,
            })
          }
        >
          {condition.meta.clauses.map((clause) => (
            <option key={clause.id} value={clause.id}>
              {clause.display}
            </option>
          ))}
        </FlavorItem>
      </FlavorItem>
      {hasInput && (
        <InputProvider
          value={{
            display: selectedClause.display,
            options: condition.meta.options,
            // @ts-expect-error TODO: Fix this
            value: criterion.input.value ?? "",
            onChange: (input) => criterion.updateInput(input),
            multiple: selectedClause.meta.multiple ?? false,
          }}
        >
          {!!InputComponent && (
            <div data-testid="refine-input">
              <InputComponent />
            </div>
          )}
        </InputProvider>
      )}
    </FlavorItem>
  );
};
