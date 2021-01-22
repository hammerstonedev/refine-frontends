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

/*  const { meta } = props;

  const clauseOptions = computed(() => {
    if (meta && meta.clauses) {
      return meta.clauses.reduce((clauses, clause) => {
        return {
          [`${clause.component}Option`]: textClauseOptions[`${clause.component}Option`],
          ...clauses,
        };
      }, {});
    }
    return {...textClauseOptions};
  });*/

  return () => {
    if (context.slots.default) {
      return context.slots.default();
    }
    return null;
  };
};
