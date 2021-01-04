import { h } from '@vue/composition-api';
import BaseNumericSingleClause from '@/components/tailwind/clauses/numeric/base-numeric-single-clause';

export default (
  props,
  ClauseComponent
) => {
  return () => {
    return h(BaseNumericSingleClause, {
      props: {
        value: props.value,
        ClauseComponent,
      },
    });
  };
};
