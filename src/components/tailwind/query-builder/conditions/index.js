import { h } from '@vue/composition-api';
import ClauseSelector from '@/components/tailwind/query-builder/clause-selector';
import * as textClauses from '@/components/tailwind/clauses/text';
import * as RenderlessConditions from '@/components/renderless/conditions';
//import * as textClauses from '@/components/tailwind/query-builder/clauses';

// todo: jsx. this is hard to read.
const useCondition = (condition, clauses, props, context) => {
  const { id, ...input } = props;

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
                  ...input,
                }
              });
          }),
         )
      ],
    );
  };
};

const TextCondition = {
  name: 'text-condition',
  props: {
    id: {
      type: String,
      required: true,
    },
    initialValue: {
      type: String,
      required: false,
    },
  },
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

export { TextCondition };
