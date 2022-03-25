import { GroupedBlueprint } from "refine-core/types";
import { Criterion } from "../criterion";
import { useQueryBuilder } from "../query-builder/use-query-builder";
import { CriterionGroupProvider } from "./use-criterion-group";

export type CriterionGroupProps = {
  index: number;
  criteria: GroupedBlueprint[number];
};

export const CriterionGroup = ({ index, criteria }: CriterionGroupProps) => {
  const { blueprint, groupedBlueprint } = useQueryBuilder();
  const group = groupedBlueprint[index];

  const addCriterion = () =>
    blueprint.insertCriterion(group[group.length - 1].position);

  return (
    <CriterionGroupProvider
      value={{
        index,
        criteria,
      }}
    >
      <div
        data-testid="refine-criterion-group"
        className="bg-gray-50 p-4 mb-4 space-y-6 rounded"
      >
        {criteria.map((criterion, index) => (
          <Criterion key={index} index={index} />
        ))}
        <button
          data-testid="refine-add-criterion"
          type="button"
          onClick={() => addCriterion()}
          className="background-transparent text-blue-600 text-xs flex items-center py-1 px-3 mt-3"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>And</span>
        </button>
      </div>
    </CriterionGroupProvider>
  );
};
