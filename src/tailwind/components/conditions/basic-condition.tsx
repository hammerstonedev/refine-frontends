import { useMemo } from "react";
import { BaseConditionProps } from ".";
import {
  InputComponentName,
  TextInput,
  NumberInput,
  OptionInput,
} from "../inputs";
import { useSelectedClause } from "./useSelectedClause";

export interface BasicConditionProps extends BaseConditionProps {}

const inputComponents: Partial<{ [inputName in InputComponentName]: any }> = {
  TextInput,
  NumberInput,
  OptionInput,
};

export const BasicCondition = ({
  condition,
  blueprintItem,
}: BasicConditionProps) => {
  const selectedClause = useSelectedClause(
    condition,
    blueprintItem.input.clause
  );

  const showThirdColumn = !!selectedClause?.component;

  const InputComponent = useMemo(() => {
    if (
      selectedClause?.component &&
      selectedClause.component in inputComponents
    ) {
      return inputComponents[selectedClause?.component];
    }

    return null;
  }, [selectedClause?.component]);

  return (
    <div className="flex space-x-2">
      <div>
        <select className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option selected>{condition.display}</option>
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
