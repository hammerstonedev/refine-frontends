import React from 'react';
import type { InternalCriterionWithPosition } from 'refine-core/types/internal';
import { Criterion, CriterionGroupProvider, FlavorItem, useQueryBuilder } from 'components';

export type CriterionGroupProps = {
  index: number;
  criteria: InternalCriterionWithPosition[];
};

export const CriterionGroup = ({ index, criteria }: CriterionGroupProps) => {
  const { blueprint, groupedBlueprint } = useQueryBuilder();
  const group = groupedBlueprint[index];

  const addCriterion = () => blueprint.insertCriterion(group[group.length - 1].position);

  return (
    <CriterionGroupProvider
      value={{
        index,
        criteria,
      }}
    >
      <FlavorItem<'group'> name="group" data-testid="refine-criterion-group">
        {criteria.map((criterion, index) => (
          <Criterion key={index} index={index} />
        ))}
        <FlavorItem<'group.addCriterionButton'>
          name="group.addCriterionButton"
          data-testid="refine-add-criterion"
          onClick={() => addCriterion()}
        >
          <FlavorItem<'group.addCriterionButton.icon'> name="group.addCriterionButton.icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              style={{ width: '1.25rem', height: '1.25rem' }}
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </FlavorItem>
          <FlavorItem<'group.addCriterionButton.text'> name="group.addCriterionButton.text">
            And
          </FlavorItem>
        </FlavorItem>
      </FlavorItem>
    </CriterionGroupProvider>
  );
};
