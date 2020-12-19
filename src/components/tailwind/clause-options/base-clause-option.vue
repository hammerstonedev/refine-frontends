<template>
  <clause-option
    :id="id"
    :display="display"
    :selected="selected"
  >
    <div>
      <component
        :is="ClauseComponent"
        v-bind="$attrs"
      />
    </div>
  </clause-option>
</template>

<script>
 import ClauseOption from '@/components/renderless/clause-option';
 import { clauseOptionProps } from '@/mixins';

 export default {
   mixins: [clauseOptionProps],
   props: {
     ClauseComponent: {
       type: Object,
       required: true,
     },
   },
   components: {
     ClauseOption,
   },
 };
</script>
