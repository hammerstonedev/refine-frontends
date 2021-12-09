import { useMemo } from "react";
import { BaseConditionProps } from ".";
import { useCriterion } from "../criterion";
import {
  InputComponentName,
  TextInput,
  NumberInput,
  OptionInput,
} from "../inputs";
import { useQueryBuilder } from "../query-builder/use-query-builder";
import { useSelectedClause } from "./use-selected-clause";

export interface ConditionProps extends BaseConditionProps {}

const inputComponents: Partial<{ [inputName in InputComponentName]: any }> = {
  TextInput,
  NumberInput,
  OptionInput,
};

export const Condition = ({ condition }: ConditionProps) => {
  const { conditions } = useQueryBuilder();
  const criterion = useCriterion();
  const selectedClause = useSelectedClause(condition, criterion.input.clause);

  const showThirdColumn = !!selectedClause?.component;

  const InputComponent = useMemo(() => {
    if (
      selectedClause?.component &&
      selectedClause.component in inputComponents
    ) {
      return inputComponents[selectedClause.component];
    }

    return null;
  }, [selectedClause?.component]);

  return (
    <div className="flex space-x-2">
      <div>
        <select
          value={condition.id}
          onChange={(event) =>
            criterion.update((criterion) => ({
              ...criterion,
              condition_id: event.target.value,
            }))
          }
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
        <select className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {condition.meta.clauses.map((clause) => (
            <option key={clause.id}>{clause.display}</option>
          ))}
        </select>
      </div>
      {showThirdColumn && (
        <>
          {!!InputComponent && (
            <InputComponent
              display={selectedClause.display}
              options={condition.meta.options}
            />
          )}
          {!InputComponent && <div>{selectedClause?.component}</div>}
        </>
      )}
    </div>
  );
};
