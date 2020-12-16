export default {
  inject: ['clauseSelector'],
  props: {
    id: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: false,
      default: null,
    },
    selected: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
  computed: {
    isSelected: function() {
      const { selectedClauseId } = this.clauseSelector;
      return selectedClauseId === this.id;
    },
  },
  created() {
    this.clauseSelector.registerClause({id: this.id, display: this.display || this.id});
    if (this.selected) {
      this.clauseSelector.selectClause(this.id);
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
