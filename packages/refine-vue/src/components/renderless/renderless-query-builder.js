import { BlueprintStore } from 'refine-core';
import { isVue2 } from 'vue-demi';
export default {
  name: 'renderless-query-builder',
  emits: ['change'],
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
    const { blueprintStore: blueprint } = this;

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
      internalBlueprint: null,
      blueprintStore: new BlueprintStore(this.blueprint, this.conditions, (updatedBlueprint) => {
        this.internalBlueprint = updatedBlueprint;
        this.$emit('change', updatedBlueprint);
      }),
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
    conditionFor(criterion) {
      const { id: conditionId, uid } = criterion;
      const { id, type, display, meta } = this.conditionsLookup[conditionId];
      return { id, type, display, uid, meta };
    },
  },
  render() {
    const {
      insertCriterion,
      addGroup,
      blueprintStore: blueprint,
      conditionFor,
      replaceCriterion,
      removeCriterion,
    } = this;
    // This gets around a vue3 warning about scopedSlots being
    // referenced but not defined. Vue3 uses $slots and vue2 uses
    // $scopedSlots so this code allows us to work with both versions
    let defaultSlot = this.$slots?.default;
    if (isVue2) {
      defaultSlot = this.$scopedSlots?.default;
    }

    if (defaultSlot) {
      return defaultSlot({
        insertCriterion,
        addGroup,
        blueprint,
        conditionFor,
        removeCriterion,
        replaceCriterion,
        groupedBlueprint: blueprint.groupedBlueprint(),
      });
    }
    return null;
  },
};
