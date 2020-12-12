import clausesConfig from '@/config/clauses-config';
import createClauseOption from './create-clause-option';
import {
  Equals,
  DoesNotEqual,
  StartsWith,
  EndsWith,
  DoesNotStartWith,
  DoesNotEndWith,
  Contains,
  DoesNotContain,
} from '@/components/tailwind/clauses/text';

const config = clausesConfig.text.reduce((clauses, { id, display, component }) => {
  return {
    [component]: { display, id },
    ...clauses,
  };
}, {});


const EqualsOption = createClauseOption(Equals, config);
const DoesNotEqualOption = createClauseOption(DoesNotEqual, config);
const StartsWithOption = createClauseOption(StartsWith, config);
const EndsWithOption = createClauseOption(EndsWith, config);
const DoesNotStartWithOption = createClauseOption(DoesNotStartWith, config);
const DoesNotEndWithOption = createClauseOption(DoesNotEndWith, config);
const ContainsOption = createClauseOption(Contains, config);
const DoesNotContainOption = createClauseOption(DoesNotContain, config);

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
