import { NumericCondition, TextCondition } from '@/components/tailwind/conditions';
import useConditionOption from '@/compositions/tailwind/useConditionOption';

const sharedProps = {
  props: {
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: false,
      default: '',
    },
  },
};

const TextConditionOption = {
  name: 'text-condition-option',
  mixins: [sharedProps],
  setup(props, context) {
    return useConditionOption(
      props,
      context,
      TextCondition,
    );
  },
};

const NumericConditionOption = {
  name: 'numeric-condition-option',
  mixins: [sharedProps],
  setup(props, context) {
    return useConditionOption(
      props,
      context,
      NumericCondition,
    );
  },
};

export {
  TextConditionOption,
  NumericConditionOption,
};
