import { h } from '@vue/composition-api';
import BaseNumericDouble from '@/components/tailwind/clauses/numeric/base-numeric-double';

export default (
  props,
  ClauseComponent
) => {
  return () => {
    return h(BaseNumericDouble, {
      props: {
        from: props.from,
        to: props.to,
        ClauseComponent,
      },
    });
  };
};
