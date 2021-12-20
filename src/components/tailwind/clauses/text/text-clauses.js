import useTextClause from '../../../../compositions/tailwind/useTextClause.js';
import renderless from '../../../../components/renderless/clauses/text';

const textClauseProps = {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
};

const Equals = {
  name: 'equals',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.Equals,
    );
  },
};

const DoesNotEqual = {
  name: 'does-not-equal',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.DoesNotEqual,
    );
  },
};

const StartsWith = {
  name: 'starts-with',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.StartsWith,
    );
  },
};

const EndsWith = {
  name: 'ends-with',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.EndsWith,
    );
  },
};

const DoesNotStartWith = {
  name: 'does-not-start-with',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.DoesNotStartWith,
    );
  },
};

const DoesNotEndWith = {
  name: 'does-not-end-with',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.DoesNotEndWith,
    );
  },
};

const Contains = {
  name: 'contains',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.Contains,
    );
  },
};

const DoesNotContain = {
  name: 'does-not-contain',
  mixins: [textClauseProps],
  setup(props) {
    return useTextClause(
      props,
      renderless.DoesNotContain,
    );
  },
};

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
