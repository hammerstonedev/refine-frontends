import useClause from '@/compositions/renderless/useClause';

export default {
  name: 'renderless-clause',
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
  },
  setup(props, context) {
    return useClause(props.id, props.type, props, context);
  },
};
