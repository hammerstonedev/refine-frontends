import useCondition from '@/compositions/renderless/useCondition';
import { conditionProps } from '@/mixins/condition';

const TextCondition = {
  name: 'text-condition',
  mixins: [conditionProps],
  setup(props, context) {
    return useCondition(props.id, 'text', props, context);
  },
};

const NumericCondition = {
  name: 'numeric-condition',
  mixins: [conditionProps],
  setup(props, context) {
    return useCondition(props.id, 'numeric', props, context);
  },
};

export { TextCondition, NumericCondition };
