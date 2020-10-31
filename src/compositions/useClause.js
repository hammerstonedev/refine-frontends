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
    throw new Error(`Clause "${id}" must be used within a "${type}" condition. It's currently within a "${condition.type}" condition`);
  }

  condition.selectClause(id);

  if (props.value !== undefined && condition.input.value === undefined) {
    condition.updateValue(props.value);
  }

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
