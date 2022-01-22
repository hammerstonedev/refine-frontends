import { optionProps } from '../../mixins';
import { isVue2 } from 'vue-demi';

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
    // This gets around a vue3 warning about scopedSlots being
    // referenced but not defined. Vue3 uses $slots and vue2 uses
    // $scopedSlots so this code allows us to work with both versions
    let defaultSlot = this.$slots?.default;
    if (isVue2) {
      defaultSlot = this.$scopedSlots?.default
    }

    if (defaultSlot && isSelected) {
      return defaultSlot();
    }
    return null;
  },
};
