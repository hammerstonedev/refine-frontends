import { inject } from '@vue/composition-api';

export default (id, type, props, context) => {
  const condition = inject('condition');
  const setValue = (newValue) => {
    condition.updateValue(newValue);
  };

  if (!condition) {
    throw new Error('Text clause must be used within a condition.');
  }

  if (condition.type !== type) {
    throw new Error(`Clause of type "${type}" must be used within a "${condition.type}" condition.`);
  }

  condition.selectClause(id);
  condition.updateValue(props.value);

  return () => {
    if (context.slots.default) {
      return context.slots.default({
        setValue,
        value: props.value,
      });
    }
    return null;
  };
};
