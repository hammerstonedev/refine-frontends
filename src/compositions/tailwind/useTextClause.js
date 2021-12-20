import { h } from '@vue/composition-api';
import BaseTextClause from '../../components/tailwind/clauses/text/base-text-clause';

export default (
  props,
  ClauseComponent
) => {
  return () => {
    return h(BaseTextClause, {
      props: {
        value: props.value,
        ClauseComponent,
      },
    });
  };
};
