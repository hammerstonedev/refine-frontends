import { h } from '@vue/composition-api';
import ClauseSelector from '@/components/tailwind/query-builder/clause-selector';
import * as RenderlessConditions from '@/components/renderless/conditions';
import * as textClauses from '@/components/tailwind/query-builder/clause-options/text';
import * as numericClauses from '@/components/tailwind/query-builder/clause-options/numeric';

const conditionMixin = {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};

// TODO: jsx. this is hard to read.
const useCondition = (condition, clauses, props, context) => {
  const { id } = props;
  const { attrs: input } = context;

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
                  ...(selected ? input : null),
                },
              });
          }),
         )
      ],
    );
  };
};

const TextCondition = {
  name: 'text-condition',
  mixins: [conditionMixin],
  components: {
    ...textClauses,
    TextCondition: RenderlessConditions.TextCondition,
  },
  setup(props, context) {
    return useCondition(
      RenderlessConditions.TextCondition,
      textClauses,
      props,
      context,
    );
  }
};

const NumericCondition = {
  name: 'numeric-condition',
  mixins: [conditionMixin],
  components: {
    ...numericClauses,
    NumericCondition: RenderlessConditions.NumericCondition,
  },
  props: {
    value1: {
      type: Number,
      required: false,
    },
    value2: {
      type: Number,
      required: false,
    },
  },
  setup(props, context) {
    return useCondition(
      RenderlessConditions.NumericCondition,
      numericClauses,
      props,
      context,
    );
  }
};

export { NumericCondition, TextCondition };
