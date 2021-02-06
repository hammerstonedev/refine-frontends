import useCondition from '@/compositions/renderless/useCondition';

export default {
  name: 'renderless-condition',
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    uid: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    return useCondition(props.id, props.type, props, context);
  },
};
