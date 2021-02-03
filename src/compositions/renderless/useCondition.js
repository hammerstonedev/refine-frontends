import { inject, provide, onUnmounted } from '@vue/composition-api';

export default (id, type, props, context) => {
  const blueprint = inject('blueprint');
  const builderModeActive = inject('builderModeActive');

  if (!id || !type) {
    throw new Error('useCondition requires an id and a type.');
  }

  if (!context) {
    throw new Error('useCondition requires a Vue context.');
  }

  if (!blueprint) {
    throw new Error('Conditions must be rendered within a query.');
  }

  // in builder mode we don't add/remove/update conditions on lifecycle methods
  // instead this behavior is delegated to the query builder.
  let condition;
  if (!builderModeActive) {
    condition = blueprint.addCondition({
      id,
      type,
      depth: 0,
    });
  } else {
    condition = blueprint.generateCondition({
      id,
      type,
      depth: 0,
    });
  }

  provide('condition', {
    ...condition,
    updateInput: updates => blueprint.updateInput(condition, updates),
  });

  onUnmounted(() => {
    // Again, in builder mode adding/removing conditions
    // is relegated to the query builder.
    if(!builderModeActive) {
      blueprint.removeCondition(condition);
    }
  });

  let clauses = null;
  if (props?.condition?.meta?.clauses) {
    clauses = props.condition.meta.clauses.map((clause) => {
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
