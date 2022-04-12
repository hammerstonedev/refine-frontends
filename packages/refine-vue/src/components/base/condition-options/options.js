import { NumericCondition, TextCondition } from '../../../components/base/conditions';
import useConditionOption from '../../../compositions/tailwind/useConditionOption';
import { optionProps } from '../../../mixins';

const TextConditionOption = {
  name: 'text-condition-option',
  mixins: [optionProps],
  setup(props, context) {
    return useConditionOption(props, context, TextCondition);
  },
};

const NumericConditionOption = {
  name: 'numeric-condition-option',
  mixins: [optionProps],
  setup(props, context) {
    return useConditionOption(props, context, NumericCondition);
  },
};

export { TextConditionOption, NumericConditionOption };
