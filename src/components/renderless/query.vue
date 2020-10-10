<script>
 import Blueprint from '@/stores/blueprint';
 import Vue from 'vue';

 export default {
   model: {
     prop: 'blueprint',
     event: 'change'
   },
   props: {
     value: {
       required: false,
       default: () => [],
       type: Array,
     },
   },
   provide() {
     const { blueprint } = this;
     return {
       blueprint,
     }
   },
   data() {
     return {
       blueprint: Vue.observable(
         new Blueprint(
           this.blueprint,
           (updatedBlueprint) => {
             this.$emit('change', updatedBlueprint)
           },
       )),
     };
   },
   render() {
     const { blueprint } = this;
     if (this.$scopedSlots?.default) {
       return this.$scopedSlots.default({ blueprint });
     }
     return null;
   },
 };
</script>
