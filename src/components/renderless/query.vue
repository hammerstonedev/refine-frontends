<script>
 import Blueprint from '@/stores/blueprint';

 export default {
   props: {
     blueprint: {
       type: Array,
       required: false,
     },
     builderModeActive: {
       type: Boolean,
       required: false,
     },
   },
   provide() {
     const { blueprintStore, builderModeActive } = this;
     return {
       blueprint: blueprintStore,
       builderModeActive,
     }
   },
   data() {
     return {
       blueprintStore: new Blueprint(
           this.blueprint,
           (updatedBlueprint) => {
             this.$emit('change', updatedBlueprint)
           },
       ),
     };
   },
   render() {
     const { blueprintStore: blueprint } = this;
     if (this.$scopedSlots?.default) {
       return this.$scopedSlots.default({ blueprint });
     }
     return null;
   },
 };
</script>
