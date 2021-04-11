import useClause from '@/compositions/renderless/useClause';

export const createClause = (name, id, props) => {
  return {
    name,
    props,
    setup(props, context) {
      return useClause(id, props, context);
    },
  };
};

export const generateClauses = (clauses) => {
  return clauses.reduce((clauseComponents, { id, component, requires: props }) => {
    return {
      [component]: createClause(component, id, props),
      ...clauseComponents,
    };
  }, {});
};
