import { useEffect, useMemo } from "react";
import type {
  Condition as ConditionType,
  CriterionBlueprintItem,
} from "../../../types";
import { useCriterion } from "../criterion";
import inputComponents from "../inputs";
import { InputProvider, valueToArray } from "../inputs/use-input";
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
      return inputComponents[selectedClause.component];
    }

    return null;
  }, [selectedClause?.component]);

  /**
   * When changing to a clause which doesn't have an input value,
   * remove the input value.
   */
  useEffect(() => {
    if (!hasInput && criterion.input.value != null) {
      criterion.update((criterion) => {
        const { value, ...input } = criterion.input;

        return {
          ...criterion,
          input,
        };
      });
    }
  }, [selectedClause]);

  /**
   * When changing from a single option to a multiple option, convert
   * to/from array as needed.
   */
  useEffect(() => {
    if (selectedClause.meta.multiple && !Array.isArray(criterion.input.value)) {
      return criterion.update((criterion) => ({
        ...criterion,
        input: {
          ...criterion.input,
          value: valueToArray(criterion.input.value),
        },
      }));
    }

    if (!selectedClause.meta.multiple && Array.isArray(criterion.input.value)) {
      return criterion.update((criterion) => ({
        ...criterion,
        input: {
          ...criterion.input,
          value: criterion.input.value ?? "",
        },
      }));
    }
  }, [selectedClause.meta.multiple]);

  const updateCondition = (conditionId: ConditionType["id"]) => {
    const targetCondition = conditions.find(
      (condition) => condition.id === conditionId
    );

    if (!targetCondition) return;

    criterion.update((criterion) => {
      const selectedClauseIsValidForTargetCondition =
        !!targetCondition.meta.clauses.find(
          (clause) => clause.id === criterion.input.clause
        );

      const input: CriterionBlueprintItem["input"] =
        selectedClauseIsValidForTargetCondition
          ? criterion.input
          : { clause: targetCondition.meta.clauses[0].id };

      return { ...criterion, condition_id: targetCondition.id, input };
    });
  };

  return (
    <div data-testid="refine-condition" className="flex space-x-2">
      <div>
        <select
          value={condition.id}
          onChange={(event) => updateCondition(event.target.value)}
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
          onChange={(event) =>
            criterion.update((criterion) => ({
              ...criterion,
              input: { ...criterion.input, clause: event.target.value },
            }))
          }
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
            onChange: (value) =>
              criterion.update((criterion) => ({
                ...criterion,
                input: { ...criterion.input, value },
              })),
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
