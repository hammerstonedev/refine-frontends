import useClause from '@/compositions/useClause';
import config from '@/config/clauses-config';

const { text: textClauses } = config;

const createClause = (name, id, type, props) => {
  return {
    name,
    props,
    setup(props, context) {
      return useClause(id, type, props, context);
    },
  };
};

export default textClauses.reduce((clauseComponents, { id, component, requires: props }) => {
  return {
    [component]: createClause(component, id, 'text', props),
    ...clauseComponents,
  };
}, {});
