export default {
  name: 'renderless-refinement',
  inject: ['updateInput'],
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  provide() {
    return {
      refinementId: this.id,
    };
  },
  render() {
    const defaultSlot = this.$scopedSlots?.default || this.$slots?.default;

    if (defaultSlot) {
      return defaultSlot();
    }
  }
};
