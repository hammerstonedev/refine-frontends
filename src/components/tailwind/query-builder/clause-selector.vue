<template>
  <div>
    <!-- Pick the tailwind clause component based on selected clause -->
    <component
      :is="selectedClause.component"
      v-bind="selectedClause"
      v-slot="{setValue, value}"
    >
      <select
        @input="selectClause($event.target.value)"
      >
        <option
          v-for="clause in clauses"
          :key="clause.id"
          :value="clause.id"
          :selected="selectedClause && (clause.id === selectedClause.id)"
        >
          {{ display }}
        </option>
      </select>
    </component>
  </div>
</template>

<script>

 export default {
   name: 'clause-selector',
   props: {
     selectedClause: {
       required: true,
       type: Object,
     },
     selectClause: {
       required: true,
       type: function,
     },
     clauses: {
       required: true,
       type: Array,
     },
   },
 }
</script>
