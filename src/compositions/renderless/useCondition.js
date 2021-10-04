import { inject, provide, onUnmounted } from '@vue/composition-api';

export default (id, props, context) => {
  const blueprint = inject('blueprint');
  const builderModeActive = inject('builderModeActive');

  if (!id) {
    throw new Error('useCondition requires an id.');
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
    condition = blueprint.addCriterion({
      id,
      depth: 0,
    });
  } else {
    condition = blueprint.findCriterion(props.uid);
  }

  const updateInput = updates => blueprint.updateInput(condition, updates);

  provide('condition', condition);
  provide('updateInput', updateInput);

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
      return context.slots.default({ clauses, condition, updateInput });
    }
    return null;
  };
};
