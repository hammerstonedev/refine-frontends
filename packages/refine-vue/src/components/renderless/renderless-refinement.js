import { isVue2 } from 'vue-demi';
export default {
  name: 'renderless-refinement',
  inject: ['updateInput'],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  provide() {
    return {
      refinementId: this.id,
    };
  },
  render() {
    // This gets around a vue3 warning about scopedSlots being
    // referenced but not defined. Vue3 uses $slots and vue2 uses
    // $scopedSlots so this code allows us to work with both versions
    let defaultSlot = this.$slots?.default;
    if (isVue2) {
      defaultSlot = this.$scopedSlots?.default;
    }

    if (defaultSlot) {
      return defaultSlot();
    }
  },
};
