import useClause from '@/compositions/renderless/useClause';

export const createClause = (name, id, type, props) => {
  return {
    name,
    props,
    setup(props, context) {
      return useClause(id, type, props, context);
    },
  };
};

export const generateClauses = (type, clauses) => {
  return clauses.reduce((clauseComponents, { id, component, requires: props }) => {
    return {
      [component]: createClause(component, id, type, props),
      ...clauseComponents,
    };
  }, {});
};
