import { h } from '@vue/composition-api';
import * as RenderlessConditions from '@/components/renderless/conditions';
import * as numericClauseOptions from '@/components/tailwind/query-builder/clause-options/numeric';
import { conditionProps as conditionMixin } from './mixins';
import ClauseSelector from '@/components/tailwind/query-builder/clause-selector';
import TextCondition from './text-condition';

// TODO: jsx. this is hard to read.
const useCondition = (condition, clauses, props, context) => {
  const { id } = props;
  return () => {
    return h(
      condition, {
        props: { id },
      }, [
        h(ClauseSelector, {},
          context.slots.default || Object.keys(clauses).map((key, index) => {
            const clause = clauses[key];
            const selected = index === 0;
            return h(
              clause, {
                props: {
                  key,
                  selected,
                },
                attrs: {
                  ...(selected ? context.attrs : null),
                },
              });
          }),
         )
      ],
    );
  };
};

const NumericCondition = {
  name: 'numeric-condition',
  mixins: [conditionMixin],
  components: {
    ...numericClauseOptions,
    NumericCondition: RenderlessConditions.NumericCondition,
  },
  setup(props, context) {
    return useCondition(
      RenderlessConditions.NumericCondition,
      numericClauseOptions,
      props,
      context,
    );
  }
};

export { NumericCondition, TextCondition };
