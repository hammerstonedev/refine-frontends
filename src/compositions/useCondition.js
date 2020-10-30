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

  // todo: rename to something like changeClause, otherwise
  // confusing with clause selector
  const selectClause = (clause) => {
    blueprint.updateInput(id, { clause });
  };

  provide('condition', {
    selectClause,
    type,
    updateValue,
    data: blueprint.findCondition(id),
  });

  return () => {
    if (context.slots.default) {
      return context.slots.default();
    }
    return null;
  };
};
