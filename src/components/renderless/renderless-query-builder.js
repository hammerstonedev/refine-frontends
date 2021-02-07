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
    addCondition() {
      const firstCondition = this.conditions[0];
      const { id, type, meta } = firstCondition;
      const firstClause = meta.clauses[0];
      const input = {
        clause: firstClause.id,
      };
      this.blueprintStore.addCondition({ id, type, input, depth: 0 });
    },
    removeCondition(...args) {
      console.log(args);
    },
    conditionPropsFor({ id: conditionId, uid }) {
      const { id, type, display } = this.conditionsLookup[conditionId];
      return { id, type, display, uid };
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
