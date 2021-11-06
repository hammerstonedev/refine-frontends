import { inject, onUnmounted } from '@vue/composition-api';

export default (id, props, context) => {
  const condition = inject('condition');
  const updateInput = inject('updateInput');
  const refinementId = inject('refinementId');
  const builderModeActive = inject('builderModeActive');
  const setValue = (input) => {
    updateInput(input, refinementId);
  };

  if (!condition) {
    throw new Error('A clause must be used within a condition.');
  }

  // Set the clause id on the blueprint input when this clause is rendered
  if (refinementId) {
    updateInput({ [refinementId]: { clause: id }});
  } else {
    updateInput({ clause: id });
  }

  if (!builderModeActive) {
    // eslint-disable-next-line no-unused-vars
    const { clause, ...values } = condition.input;
    if (Object.keys(props).length > 0 && Object.keys(values).length === 0) {
      updateInput({ ...props });
    }
  }

  onUnmounted(() => {
    if (!builderModeActive) {
      // only mark the clause as empty if when unmounting no other
      // clause has been selected. Mounting/unmounting happens in the
      // order that the components were rendered.
      if (condition.input.clause === id) {
        updateInput({ clause: undefined });
      }
    }
  });

  return () => {
    if (context.slots.default) {
      return context.slots.default({
        setValue,
        ...condition.input,
      });
    }
    return null;
  };
};
