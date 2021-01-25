import { inject, provide, onUnmounted } from '@vue/composition-api';

export default (id, type, props, context) => {
  const blueprint = inject('blueprint');

  if (!id || !type) {
    throw new Error('useCondition requires an id and a type.');
  }

  if (!context) {
    throw new Error('useCondition requires a Vue context.');
  }

  if (!blueprint) {
    throw new Error('Conditions must be rendered within a query.');
  }

  const condition = blueprint.addCondition({
    conditionId: id,
    type,
    depth: 0,
  });

  const { input } = condition;

  provide('condition', {
    id,
    input,
    type,
    updateInput: updates => blueprint.updateInput(condition, updates),
  });

  onUnmounted(() => {
    blueprint.removeCondition(condition);
  });

  let clauses = null;
  if (props.meta && props.meta.clauses) {
    clauses = props.meta.clauses.map((clause) => {
      return clause.component;
    });
  }

  return () => {
    if (context.slots.default) {
      return context.slots.default({ clauses, condition });
    }
    return null;
  };
};
