<template>
  <clause-option
    :id="id"
    :display="display"
    :selected="selected"
  >
    <div>
      <slot>
      </slot>
    </div>
  </clause-option>
</template>

<script>
 import ClauseOption from '@/components/renderless/query-builder/clause-option';

 export default {
   props: {
     id: {
       type: String,
       required: true,
     },
     display: {
       type: String,
       required: false,
     },
     selected: {
       type: Boolean,
       required: false,
     },
   },
   components: {
     ClauseOption,
   },
 };
</script>
