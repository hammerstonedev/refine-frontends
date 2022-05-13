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
          onChange={(conditionId) => criterion.updateCondition(conditionId)}
        >
          <FlavorItem<"select.button"> name="select.button">
            {condition.display}
          </FlavorItem>
          <FlavorItem<"select.listbox"> name="select.listbox">
            {conditions.map((condition) => (
              <FlavorItem<"select.listbox.item">
                key={condition.id}
                name="select.listbox.item"
                value={condition.id}
              >
                {condition.display}
              </FlavorItem>
            ))}
          </FlavorItem>
        </FlavorItem>
      </FlavorItem>
      <FlavorItem<"select.wrapper"> name="select.wrapper">
        <FlavorItem<"select">
          name="select"
          value={selectedClause.id}
          onChange={(clause) =>
            criterion.updateInput({
              clause,
            })
          }
        >
          <FlavorItem<"select.button"> name="select.button">
            {selectedClause.display}
          </FlavorItem>
          <FlavorItem<"select.listbox"> name="select.listbox">
            {condition.meta.clauses.map((clause) => (
              <FlavorItem<"select.listbox.item">
                key={clause.id}
                name="select.listbox.item"
                value={clause.id}
              >
                {clause.display}
              </FlavorItem>
            ))}
          </FlavorItem>
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
