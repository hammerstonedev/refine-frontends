import { optionProps } from '../../mixins';

export default {
  name: 'renderless-option',
  inject: ['selector'],
  mixins: [optionProps],
  computed: {
    isSelected: function() {
      const { selector, id } = this;
      return selector.isSelected(id);
    },
  },
  created() {
    const { id, display, selected, selector } = this;
    selector.registerOption({
      id,
      display: display || id,
      ...this.$attrs,
    });

    if (selected) {
      selector.selectOption(id);
    }
  },
  render() {
    const { isSelected } = this;
    const defaultSlot = this.$scopedSlots?.default || this.$slots?.default;

    if (defaultSlot && isSelected) {
      return defaultSlot();
    }
    return null;
  },
};
