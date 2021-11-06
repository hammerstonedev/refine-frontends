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
  methods: {
    updateRefinementInput(updates) {
      this.updateInput({
        [this.id]: {
          ...updates,
        },
      });
    },
  },
  render() {
    if (this.$scopedSlots?.default) {
      const { updateRefinementInput } = this;
      return this.$scopedSlots.default({
        updateRefinementInput,
      });
    }
  }
};
