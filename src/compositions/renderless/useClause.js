import { inject, onUnmounted } from '@vue/composition-api';

export default (id, type, props, context) => {
  const condition = inject('condition');

  const setValue = (value) => {
    condition.updateInput({ value });
  };

  if (!condition) {
    throw new Error('A clause must be used within a condition.');
  }

  if (condition.type !== type) {
    throw new Error(`Clause "${id}" must be used within a "${type}" condition. It's currently within a "${condition.type}" condition`);
  }

  // Set the clause id on the blueprint input when this clause is rendered
  condition.updateInput({ clause: id });

  // eslint-disable-next-line no-unused-vars
  const { clause, ...values } = condition.input;
  if (Object.keys(props).length > 0 && Object.keys(values).length === 0) {
    condition.updateInput({ ...props });
  }

  onUnmounted(() => {
    condition.updateInput({ clause: undefined });
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
