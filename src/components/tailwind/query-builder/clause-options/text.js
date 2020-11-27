import ClauseOption from './clause-option';
import clausesConfig from '@/config/clauses-config';
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

const createClauseOption = (ClauseComponent) => {
  const clauseName = ClauseComponent.name;
  const { id, display } = config[clauseName];

  return {
    name: `${clauseName}Option`,
    props: {
      selected: {
        type: Boolean,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
    },
    render(h) {
      return h(ClauseOption, {
        props: {
          id,
          display,
          ...this.$props,
        },
        scopedSlots: {
          default: () => {
            return h(ClauseComponent, {
              props: { value: this.$props.value },
            });
          }
        },
      });
    },
  };
};



const EqualsOption = createClauseOption(Equals);
const DoesNotEqualOption = createClauseOption(DoesNotEqual);
const StartsWithOption = createClauseOption(StartsWith);
const EndsWithOption = createClauseOption(EndsWith);
const DoesNotStartWithOption = createClauseOption(DoesNotStartWith);
const DoesNotEndWithOption = createClauseOption(DoesNotEndWith);
const ContainsOption = createClauseOption(Contains);
const DoesNotContainOption = createClauseOption(DoesNotContain);

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
