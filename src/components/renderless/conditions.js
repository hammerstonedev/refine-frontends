import useCondition from '@/compositions/renderless/useCondition';

const conditionMixin = {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};

const TextCondition = {
  name: 'text-condition',
  mixins: [conditionMixin],
  setup(props, context) {
    return useCondition(props.id, 'text', context);
  },
};

const NumericCondition = {
  name: 'numeric-condition',
  mixins: [conditionMixin],
  setup(props, context) {
    return useCondition(props.id, 'numeric', context);
  },
};

export { TextCondition, NumericCondition };
