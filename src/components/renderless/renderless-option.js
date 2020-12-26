import { optionProps } from '@/mixins';

export default {
  name: 'renderless-option',
  inject: ['selector'],
  mixins: [optionProps],
  computed: {
    isSelected: function() {
      const { selector, id } = this;
      const { selectedOption } = selector;
      return selectedOption && selectedOption.id === id;
    },
  },
  created() {
    const { id, display, selected, selector } = this;
    selector.registerOption({
      id,
      display: display || id
    });
    if (selected) {
      selector.selectOption(id);
    }
  },
  render() {
    const { isSelected } = this;
    if (this.$scopedSlots?.default && isSelected) {
      return this.$scopedSlots.default();
    }
    return null;
  },
};
