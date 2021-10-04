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
        this.conditions,
        (updatedBlueprint) => {
          this.$emit('change', updatedBlueprint);
        },
      ),
    };
  },
  methods: {
    replaceCriterion(previousPosition, newCriterion) {
      this.blueprintStore.replaceCriterion(previousPosition, newCriterion);
    },
    insertCriterion(position) {
      this.blueprintStore.insertCriterion(position);
    },
    removeCriterion(position) {
      this.blueprintStore.removeCriterion(position);
    },
    addGroup() {
      this.blueprintStore.addGroup();
    },
    conditionPropsFor(condition) {
      const { id: conditionId, uid } = condition;
      const { id, type, display } = this.conditionsLookup[conditionId];
      return { id, type, display, uid };
    },
  },
  render() {
    const {
      insertCriterion,
      addGroup,
      blueprintStore: blueprint,
      conditionPropsFor,
      replaceCriterion,
      removeCriterion,
    } = this;

    if (this.$scopedSlots?.default) {
      return this.$scopedSlots.default({
        insertCriterion,
        addGroup,
        blueprint,
        conditionPropsFor,
        removeCriterion,
        replaceCriterion,
        groupedBlueprint: blueprint.groupedBlueprint(),
      });
    }
    return null;
  },
};
