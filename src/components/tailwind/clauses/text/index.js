import TextInput from '@/components/tailwind/inputs/text-input';
import renderless from '@/components/renderless/clauses/text';

// TODO: jsx. This is hard to read
const createTextClause = (ClauseComponent) => {
  return {
    name: ClauseComponent.name,
    props: {
      value: {
        type: String,
        required: false,
        default: '',
      },
    },
    render(h) {
      return h(
        ClauseComponent, {
          props: this.$props,
          scopedSlots: {
            default: ({ value, setValue }) => {
              return h(TextInput, {
                props: {
                  value,
                },
                on: {
                  input: setValue,
                },
              });
            },
          }
        }
      );
    },
  };
};

const Equals = createTextClause(renderless.Equals);
const DoesNotEqual = createTextClause(renderless.DoesNotEqual);
const StartsWith = createTextClause(renderless.StartsWith);
const EndsWith = createTextClause(renderless.EndsWith);
const DoesNotStartWith = createTextClause(renderless.DoesNotStartWith);
const DoesNotEndWith = createTextClause(renderless.DoesNotEndWith);
const Contains = createTextClause(renderless.Contains);
const DoesNotContain = createTextClause(renderless.DoesNotContain);

export {
  Contains,
  DoesNotEqual,
  StartsWith,
  Equals,
  EndsWith,
  DoesNotStartWith,
  DoesNotEndWith,
  DoesNotContain,
};
