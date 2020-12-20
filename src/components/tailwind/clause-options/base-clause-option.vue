<template>
  <clause-option
    :id="id"
    :display="display"
    :selected="selected"
  >
    <div>
      <slot>
        <component
          :is="ClauseComponent"
          v-bind="$attrs"
        />
      </slot>
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
       required: false,
     },
   },
   components: {
     ClauseOption,
   },
 };
</script>
