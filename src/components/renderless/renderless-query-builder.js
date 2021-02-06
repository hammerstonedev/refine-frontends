import Blueprint from '@/stores/blueprint';

export default {
  name: 'renderless-query-builder',
  props: {
    blueprint: {
      type: Array,
      required: false,
    },
    conditions: {
      type: Array,
      required: true,
    },
  },
  provide() {
    const {
      blueprintStore: blueprint,
      builderModeActive,
    } = this;

    return {
      blueprint,
      builderModeActive,
    };
  },
  data() {
    return {
      blueprintStore: new Blueprint(
        this.blueprint,
        (updatedBlueprint) => {
          this.$emit('change', updatedBlueprint);
        },
      ),
    };
  },
  methods: {
    replaceCondition(...args) {
      console.log(args);
    },
    addCondition() {
      this.blueprintStore.addCondition({ ...this.conditions[0] });
    },
    removeCondition(...args) {
      console.log(args);
    },
  },
  render() {
    const {
      blueprintStore: blueprint,
      builderModeActive,
      replaceCondition,
      addCondition,
      removeCondition,
    } = this;

    if (this.$scopedSlots?.default) {
      return this.$scopedSlots.default({
        addCondition,
        blueprint,
        builderModeActive,
        removeCondition,
        replaceCondition,
        selectedConditions: blueprint.conditions,
      });
    }
    return null;
  },
};
