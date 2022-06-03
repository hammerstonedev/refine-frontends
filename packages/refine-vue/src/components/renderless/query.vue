<script>
import { BlueprintStore } from 'refine-core';
import { isVue2 } from 'vue-demi';

export default {
  props: {
    blueprint: {
      type: Array,
      required: false,
    },
    conditions: {
      type: Array,
      required: false,
    },
  },
  provide() {
    const { blueprintStore } = this;
    return {
      blueprint: blueprintStore,
      builderModeActive: false,
    };
  },
  data() {
    return {
      blueprintStore: new BlueprintStore(this.blueprint, this.conditions, (updatedBlueprint) => {
        this.$emit('change', updatedBlueprint);
      }),
    };
  },
  render() {
    const { blueprintStore: blueprint } = this;
    // This gets around a vue3 warning about scopedSlots being
    // referenced but not defined. Vue3 uses $slots and vue2 uses
    // $scopedSlots so this code allows us to work with both versions
    let defaultSlot = this.$slots?.default;
    if (isVue2) {
      defaultSlot = this.$scopedSlots?.default;
    }

    if (defaultSlot) {
      return defaultSlot({ blueprint });
    }
    return null;
  },
};
</script>
