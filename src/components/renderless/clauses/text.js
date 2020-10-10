import useClause from '@/compositions/useClause';
import config from '@/config/clauses-config';

const { text: textClauses } = config;

const createClause = (name, id, type, requires) => {
  return {
    name,
    props: requires,
    setup(props, context) {
      const render = useClause(id, type, props, context);
      return render;
    },
  };
};

export default textClauses.reduce((clauseComponents = {}, { id, component, requires }) => {
  return {
    [component]: createClause(component, id, 'text', requires),
    ...clauseComponents,
  };
});
