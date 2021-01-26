<script>
 import Blueprint from '@/stores/blueprint';
 import Vue from 'vue';

 export default {
   props: {
     initialBlueprint: {
       type: Array,
       required: false,
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
           this.initialBlueprint,
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
