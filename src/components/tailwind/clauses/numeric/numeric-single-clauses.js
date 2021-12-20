import { numericSingleProps } from './mixins';
import useNumericSingleClause from '../../../../compositions/tailwind/useNumericSingleClause';
import renderless from '../../../../components/renderless/clauses/numeric';

const IsEqualTo = {
  name: 'is-equal-to',
  mixins: [numericSingleProps],
  setup(props) {
    return useNumericSingleClause(
      props,
      renderless.IsEqualTo,
    );
  },
};

const IsNotEqualTo = {
  name: 'is-not-equal-to',
  mixins: [numericSingleProps],
  setup(props) {
    return useNumericSingleClause(
      props,
      renderless.IsNotEqualTo,
    );
  },
};

const IsGreaterThan = {
  name: 'is-greater-than',
  mixins: [numericSingleProps],
  setup(props) {
    return useNumericSingleClause(
      props,
      renderless.IsGreaterThan,
    );
  },
};

const IsGreaterThanOrEqualTo = {
  name: 'is-greater-than-or-equal-to',
  mixins: [numericSingleProps],
  setup(props) {
    return useNumericSingleClause(
      props,
      renderless.IsGreaterThanOrEqualTo,
    );
  },
};

const IsLessThan = {
  name: 'is-less-than',
  mixins: [numericSingleProps],
  setup(props) {
    return useNumericSingleClause(
      props,
      renderless.IsLessThan,
    );
  },
};

const IsLessThanOrEqualTo = {
  name: 'is-less-than-or-equal-to',
  mixins: [numericSingleProps],
  setup(props) {
    return useNumericSingleClause(
      props,
      renderless.IsLessThanOrEqualTo,
    );
  },
};

export {
  IsEqualTo,
  IsNotEqualTo,
  IsGreaterThan,
  IsGreaterThanOrEqualTo,
  IsLessThan,
  IsLessThanOrEqualTo,
};
