import clausesConfig from '../../../config/clauses-config';
import useClauseOption from '../../../compositions/tailwind/useClauseOption';
import { clauseSelectedProp } from './mixins';
import {
  Equals,
  DoesNotEqual,
  StartsWith,
  EndsWith,
  DoesNotStartWith,
  DoesNotEndWith,
  Contains,
  DoesNotContain,
} from '../../../components/base/clauses/text';

const config = clausesConfig.text.reduce((clauses, { id, display, component }) => {
  return {
    [component]: { display, id },
    ...clauses,
  };
}, {});

const EqualsOption = {
  name: 'equals-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.Equals, Equals);
  },
};

const DoesNotEqualOption = {
  name: 'does-not-equal-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.DoesNotEqual, DoesNotEqual);
  },
};

const StartsWithOption = {
  name: 'starts-with-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.StartsWith, StartsWith);
  },
};

const EndsWithOption = {
  name: 'ends-with-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.EndsWith, EndsWith);
  },
};

const DoesNotStartWithOption = {
  name: 'does-not-start-with-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.DoesNotStartWith, DoesNotStartWith);
  },
};

const DoesNotEndWithOption = {
  name: 'does-not-end-with-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.DoesNotEndWith, DoesNotEndWith);
  },
};

const ContainsOption = {
  name: 'contains-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.Contains, Contains);
  },
};

const DoesNotContainOption = {
  name: 'does-not-contain-option',
  mixins: [clauseSelectedProp],
  setup(props, context) {
    return useClauseOption(props, context, config.DoesNotContain, DoesNotContain);
  },
};

export {
  EqualsOption,
  DoesNotEqualOption,
  StartsWithOption,
  EndsWithOption,
  DoesNotStartWithOption,
  DoesNotEndWithOption,
  ContainsOption,
  DoesNotContainOption,
};
