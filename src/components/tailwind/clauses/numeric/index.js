import NumberInput from '@/components/tailwind/inputs/number-input';
import renderless from '@/components/renderless/clauses/numeric';

const createNumericClause = (ClauseComponent) => {
  return {
    name: ClauseComponent.name,
    props: {
      value1: {
        type: Number,
        required: false,
      },
      value2: {
        type: Number,
        required: false,
      },
    },
    render(h) {
      return h(
        ClauseComponent, {
          props: this.$props,
          scopedSlots: {
            default: ({ value1, setValue }) => {
              return h(NumberInput, {
                props: {
                  value: value1,
                },
                on: {
                  input: value1 => setValue({ value1 }),
                },
              });
            },
          }
        }
      );
    },
  };
};

const IsEqualTo = createNumericClause(renderless.IsEqualTo);
const IsNotEqualTo = createNumericClause(renderless.IsNotEqualTo);
const IsGreaterThan = createNumericClause(renderless.IsGreaterThan);
const IsGreaterThanOrEqualTo = createNumericClause(renderless.IsGreaterThanOrEqualTo);
const IsLessThan = createNumericClause(renderless.IsLessThan);
const IsLessThanOrEqualTo = createNumericClause(renderless.IsLessThanOrEqualTo);


export {
  IsEqualTo,
  IsNotEqualTo,
  IsGreaterThan,
  IsGreaterThanOrEqualTo,
  IsLessThan,
  IsLessThanOrEqualTo,
};
