import useCondition from '@/compositions/renderless/useCondition';

const TextCondition = {
  name: 'text-condition',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    return useCondition(props.id, 'text', context);
  },
};

export { TextCondition };
