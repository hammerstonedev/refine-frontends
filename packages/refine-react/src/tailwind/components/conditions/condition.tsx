import { useMemo } from "react";
import type { Condition as ConditionType } from "refine-core/types";
import { useCriterion } from "../criterion";
import inputComponents from "../inputs";
import { InputProvider } from "../inputs/use-input";
import { useQueryBuilder } from "../query-builder/use-query-builder";
import { useSelectedClause } from "./use-selected-clause";

export type ConditionProps = {
  condition: ConditionType;
};

export const Condition = ({ condition }: ConditionProps) => {
  const { blueprint, conditions } = useQueryBuilder();
  const criterion = useCriterion();
  const selectedClause = useSelectedClause(condition, criterion.input.clause);

  const hasInput = !!selectedClause?.component;

  const InputComponent = useMemo(() => {
    if (
      selectedClause.component &&
      selectedClause.component in inputComponents
    ) {
      return inputComponents[selectedClause.component];
    }

    return null;
  }, [selectedClause?.component]);

  return (
    <div data-testid="refine-condition" className="flex space-x-2">
      <div>
        <select
          value={condition.id}
          onChange={(event) => {
            blueprint.replaceCriterion(criterion.position, {
              id: event.target.value,
            });
          }}
          className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {conditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.display}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={selectedClause.id}
          onChange={(event) => {
            blueprint.updateInput(criterion, {
              clause: event.target.value,
            });
          }}
          className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {condition.meta.clauses.map((clause) => (
            <option key={clause.id} value={clause.id}>
              {clause.display}
            </option>
          ))}
        </select>
      </div>
      {hasInput && (
        <InputProvider
          value={{
            display: selectedClause.display,
            options: condition.meta.options,
            value: criterion.input.value ?? "",
            onChange: (value) => {
              blueprint.updateInput(criterion, {
                value,
              });
            },
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
    </div>
  );
};
