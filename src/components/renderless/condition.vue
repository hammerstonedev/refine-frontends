<script>
 export default {
   name: 'condition',
   inject: ['blueprint'],
   props: {
     selectedClause: {
       type: String,
       required: false,
     },
     id: {
       required: true,
       type: String,
     },
     type: {
       required: true,
       type: String,
     },
   },
   provide() {
     const { selectClause, type, updateValue } = this;
     return {
       condition: {
         selectClause,
         type,
         updateValue,
       }
     };
   },
   methods: {
     updateValue(value) {
       const { blueprint, id } = this;
       blueprint.updateInput(id, { value });
     },
     selectClause(clause) {
       const { blueprint, id } = this;
       blueprint.updateInput(id, { clause });
     }
   },
   created() {
     const {
       blueprint,
       id,
       type,
     } = this;

     if (!blueprint) {
       throw new Error('Condition must be used within a query.')
     }

     blueprint.addCondition({
       conditionId: id,
       type,
       depth: 0,
     });
   },
   render() {
     const {
       selectClause,
       updateValue,
     } = this;

     if (this.$scopedSlots.default) {
       return this.$scopedSlots.default({
         selectClause,
         updateValue,
       });
     }

     return null;
   }
 }
</script>
