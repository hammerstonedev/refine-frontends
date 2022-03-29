import useClause from '../../compositions/renderless/useClause';

export default {
  name: 'renderless-clause',
  inheritAttrs: false,
  props: {
    clause: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    return useClause(props.clause, props, context);
  },
};
