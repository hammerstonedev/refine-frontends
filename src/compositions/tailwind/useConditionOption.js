import { h } from '@vue/composition-api';
import BaseConditionOption from '../../components/tailwind/condition-options/base-condition-option';

export default (
  props,
  context,
  ConditionComponent
) => {
  return () => {
    return h(BaseConditionOption, {
      props: {
        id: props.id,
        display: props.display,
        selected: props.selected,
        ConditionComponent,
      },
      attrs: context.attrs,
    }, context.slots.default ? context.slots.default() : null);
  };
};
