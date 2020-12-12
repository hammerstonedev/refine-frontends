import ClauseOption from './clause-option';

const createClauseOption = (ClauseComponent, clauses) => {
  const clauseName = ClauseComponent.name;
  const { id, display } = clauses[clauseName];

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

export default createClauseOption;
