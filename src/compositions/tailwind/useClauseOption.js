import { h } from 'vue-demi';
import BaseClauseOption from '../../components/tailwind/clause-options/base-clause-option';

export default (
  props,
  context,
  config,
  ClauseComponent
) => {
  return () => {
    const { id, display } = config;
    return h(BaseClauseOption, {
      props: {
        id,
        display,
        selected: props.selected,
        ClauseComponent,
      },
      attrs: context.attrs,
    }, context.slots.default ? context.slots.default() : null);
  };
};
