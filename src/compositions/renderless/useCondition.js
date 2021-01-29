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

  // If builder mode is active conditions have to
  // be provided to the condition components.
  if (builderModeActive && !props.condition) {
    throw new Error('This query is in builder mode so the condition prop must be used to render this condition component');
  }

  // in builder mode we don't add/remove/update conditions on lifecycle methods
  // instead this behavior is delegated to the query builder.
  let condition;
  if (builderModeActive) {
    condition = props.condition;
  } else {
    condition = blueprint.addCondition({
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
