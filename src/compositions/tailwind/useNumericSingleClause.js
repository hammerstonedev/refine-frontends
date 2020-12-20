import { h } from '@vue/composition-api';
import BaseNumericSingle from '@/components/tailwind/clauses/numeric/base-numeric-single';

export default (
  props,
  ClauseComponent
) => {
  return () => {
    return h(BaseNumericSingle, {
      props: {
        value: props.value,
        ClauseComponent,
      },
    });
  };
};
