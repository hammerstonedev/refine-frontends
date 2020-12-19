import clausesConfig from '@/config/clauses-config';
import useClauseOption from '@/compositions/tailwind/useClauseOption';
import { clauseSelectedProp } from './mixins';
import {
  IsEqualTo,
  IsNotEqualTo,
  IsGreaterThan,
  IsGreaterThanOrEqualTo,
  IsLessThan,
  IsLessThanOrEqualTo,
} from '@/components/tailwind/clauses/numeric';

// Lookup by component name
const config = clausesConfig.numeric.reduce((clauses, { id, display, component }) => {
  return {
    [component]: { display, id },
    ...clauses,
  };
}, {});

const IsEqualToOption = {
  name: 'is-equal-to-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(
      props,
      context,
      config.IsEqualTo,
      IsEqualTo,
    );
  },
};

const IsNotEqualToOption = {
  name: 'is-not-equal-to-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(
      props,
      context,
      config.IsNotEqualTo,
      IsNotEqualTo,
    );
  },
};

const IsGreaterThanOption = {
  name: 'is-greater-than-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(
      props,
      context,
      config.IsGreaterThan,
      IsGreaterThan,
    );
  },
};

const IsGreaterThanOrEqualToOption = {
  name: 'is-greater-than-or-equal-to-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(
      props,
      context,
      config.IsGreaterThanOrEqualTo,
      IsGreaterThanOrEqualTo,
    );
  },
};

const IsLessThanOrEqualToOption = {
  name: 'is-less-than-or-equal-to-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(
      props,
      context,
      config.IsLessThanOrEqualTo,
      IsLessThanOrEqualTo,
    );
  },
};

const IsLessThanOption = {
  name: 'is-less-than-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(
      props,
      context,
      config.IsLessThan,
      IsLessThan
    );
  },
};

export {
  IsEqualToOption,
  IsNotEqualToOption,
  IsGreaterThanOption,
  IsGreaterThanOrEqualToOption,
  IsLessThanOption,
  IsLessThanOrEqualToOption,
};
