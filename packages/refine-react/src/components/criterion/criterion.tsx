import React from 'react';
import {
  Condition,
  CriterionProvider,
  FlavorItem,
  Label,
  useCondition,
  useCriterionGroup,
  useQueryBuilder,
} from 'components';

export type CriterionProps = {
  index: number;
};

export const Criterion = ({ index }: CriterionProps) => {
  const { blueprint, errors: allErrors } = useQueryBuilder();
  const { criteria, ...group } = useCriterionGroup();
  const criterion = criteria[index];
  const errors = allErrors[criterion.uid] ?? [];

  if (!criterion) {
    throw new Error(`Could not find criterion index ${index} in group index ${group.index}.`);
  }

  const condition = useCondition(criterion.condition_id);

  return (
    <CriterionProvider
      value={{
        updateCondition: (conditionId) =>
          blueprint.replaceCriterion(criterion.position, {
            id: conditionId,
          }),
        updateInput: (input) => blueprint.updateInput(criterion, input),
        ...criterion,
      }}
    >
      <FlavorItem<'criterion'> name="criterion" data-testid="refine-criterion">
        <FlavorItem<'criterion.wrapper'> name="criterion.wrapper">
          <FlavorItem<'criterion.removeCriterionButton'>
            name="criterion.removeCriterionButton"
            data-testid="refine-remove-criterion"
            onClick={() => blueprint.removeCriterion(criterion.position)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '1.25rem', height: '1.25rem' }}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <Label screenReaderOnly>Remove Criterion</Label>
          </FlavorItem>
          <Condition condition={condition} />
        </FlavorItem>
        <FlavorItem<'criterion.errors'> name="criterion.errors">
          {errors.map((error) => (
            <FlavorItem<'criterion.errors.error'> key={error.id} name="criterion.errors.error">
              {error.message}
            </FlavorItem>
          ))}
        </FlavorItem>
      </FlavorItem>
    </CriterionProvider>
  );
};
