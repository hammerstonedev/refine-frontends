import { useMemo } from "react";
import type { Condition as ConditionType } from "refine-core/types";
import { RefineFlavor } from "../../../components/refine-flavor";
import { useCriterion } from "../criterion";
import inputComponents from "../inputs";
import { InputProvider } from "../inputs/use-input";
import { useQueryBuilder } from "../query-builder/use-query-builder";
import { useSelectedClause } from "./use-selected-clause";

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
    <RefineFlavor<"condition"> name="condition" data-testid="refine-condition">
      <RefineFlavor<"select.wrapper"> name="select.wrapper">
        <RefineFlavor<"select">
          name="select"
          value={condition.id}
          onChange={(event) => criterion.updateCondition(event.target.value)}
        >
          {conditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.display}
            </option>
          ))}
        </RefineFlavor>
      </RefineFlavor>
      <RefineFlavor<"select.wrapper"> name="select.wrapper">
        <RefineFlavor<"select">
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
        </RefineFlavor>
      </RefineFlavor>
      {hasInput && (
        <InputProvider
          value={{
            display: selectedClause.display,
            options: condition.meta.options,
            value: criterion.input.value ?? "",
            onChange: (value) => criterion.updateInput({ value }),
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
    </RefineFlavor>
  );
};
