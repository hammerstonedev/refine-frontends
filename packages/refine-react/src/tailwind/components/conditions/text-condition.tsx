import { BaseConditionProps } from ".";
import { useSelectedClause } from "./use-selected-clause";

export interface TextConditionProps extends BaseConditionProps {}

export const TextCondition = ({
  condition,
  blueprintItem,
}: TextConditionProps) => {
  const selectedClause = useSelectedClause(
    condition,
    blueprintItem.input.clause
  );

  const showThirdColumn = !!selectedClause?.component;

  return (
    <div className="flex space-x-2">
      <div>{condition.display}</div>
      <div>
        <select>
          {condition.meta.clauses.map((clause) => (
            <option key={clause.id}>{clause.display}</option>
          ))}
        </select>
      </div>
      {showThirdColumn && <div>{selectedClause?.component}</div>}
    </div>
  );
};
