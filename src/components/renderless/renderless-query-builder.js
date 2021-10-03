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
    replaceCondition(previousConditionUid, newCondition) {
      const { meta } = this.conditionsLookup[newCondition.id];
      const firstClause = meta.clauses[0];
      const input = {
        clause: firstClause.id,
      };

      this.blueprintStore.replaceCondition({
        uid: previousConditionUid,
      }, { input, depth: 0, ...newCondition });
    },
    addCriterion(position) {
      this.blueprintStore.addCriterion(position);
    },
    removeCriterion(position) {
      this.blueprintStore.removeCriterion(position);
    },
    addGroup() {
      this.blueprintStore.addGroup();
    },
    conditionPropsFor(condition) {
      const { condition_id: conditionId, uid } = condition;
      const { id, type, display } = this.conditionsLookup[conditionId];
      return { id, type, display, uid };
    },
  },
  render() {
    const {
      addCriterion,
      addGroup,
      blueprintStore: blueprint,
      conditionPropsFor,
      replaceCondition,
      removeCriterion,
    } = this;

    if (this.$scopedSlots?.default) {
      return this.$scopedSlots.default({
        addCriterion,
        addGroup,
        blueprint,
        conditionPropsFor,
        removeCriterion,
        replaceCondition,
        groupedBlueprint: blueprint.groupedBlueprint(),
      });
    }
    return null;
  },
};
