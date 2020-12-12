import clausesConfig from '@/config/clauses-config';
import createClauseOption from './create-clause-option';
import {
  IsEqualTo,
  IsNotEqualTo,
  IsGreaterThan,
  IsGreaterThanOrEqualTo,
  IsLessThan,
  IsLessThanOrEqualTo,
} from '@/components/tailwind/clauses/numeric';

const config = clausesConfig.numeric.reduce((clauses, { id, display, component }) => {
  return {
    [component]: { display, id },
    ...clauses,
  };
}, {});

const IsEqualToOption = createClauseOption(IsEqualTo, config);


const IsNotEqualToOption = createClauseOption(IsNotEqualTo, config);
const IsGreaterThanOption = createClauseOption(IsGreaterThan, config);
const IsGreaterThanOrEqualToOption = createClauseOption(IsGreaterThanOrEqualTo, config);
const IsLessThanOption = createClauseOption(IsLessThan, config);
const IsLessThanOrEqualToOption = createClauseOption(IsLessThanOrEqualTo, config);

export {
  IsEqualToOption,
  IsNotEqualToOption,
  IsGreaterThanOption,
  IsGreaterThanOrEqualToOption,
  IsLessThanOption,
  IsLessThanOrEqualToOption,
};
