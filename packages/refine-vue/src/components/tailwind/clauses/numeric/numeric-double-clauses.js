import { numericDoubleProps } from './mixins';
import useNumericDoubleClause from '../../../../compositions/tailwind/useNumericDoubleClause';
import renderless from '../../../../components/renderless/clauses/numeric';

const IsBetween = {
  name: 'is-between',
  mixins: [numericDoubleProps],
  setup(props) {
    return useNumericDoubleClause(props, renderless.IsBetween);
  },
};

const IsNotBetween = {
  name: 'is-not-between',
  mixins: [numericDoubleProps],
  setup(props) {
    return useNumericDoubleClause(props, renderless.IsNotBetween);
  },
};

export { IsBetween, IsNotBetween };
