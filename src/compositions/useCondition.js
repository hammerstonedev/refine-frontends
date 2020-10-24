import { inject, provide } from '@vue/composition-api';

export default (id, type, context) => {
  const blueprint = inject('blueprint');

  if (!blueprint) {
    throw new Error('Condition must be used within a query.');
  }

  blueprint.addCondition({
    conditionId: id,
    type,
    depth: 0,
  });

  const updateValue = (value) => {
    blueprint.updateInput(id, { value });
  };

  const selectClause = (clause) => {
    blueprint.updateInput(id, { clause });
  };

  provide('condition', {
    selectClause,
    type,
    updateValue,
  });

  return () => {
    if (context.slots.default) {
      return context.slots.default();
    }
    return null;
  };
};
