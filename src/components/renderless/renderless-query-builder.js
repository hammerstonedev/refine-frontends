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
    } = this;

    return {
      blueprint,
      builderModeActive: true,
    };
  },
  data() {
    const conditionsLookup = this.conditions.reduce((lookup, condition) => {
      lookup[condition.id] = condition;
      return lookup;
    }, {});

    return {
      conditionsLookup,
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
    conditionPropsFor({ id: conditionId }) {
      const { id, type, display } = this.conditionsLookup[conditionId];
      return { id, type, display };
    },
  },
  render() {
    const {
      addCondition,
      blueprintStore: blueprint,
      builderModeActive,
      conditionPropsFor,
      replaceCondition,
      removeCondition,
    } = this;

    if (this.$scopedSlots?.default) {
      return this.$scopedSlots.default({
        addCondition,
        blueprint,
        builderModeActive,
        conditionPropsFor,
        removeCondition,
        replaceCondition,
        selectedConditions: blueprint.conditions,
      });
    }
    return null;
  },
};
