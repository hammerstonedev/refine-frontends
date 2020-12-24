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
 import ClauseOption from '@/components/renderless/selector/option';
 import { optionProps } from '@/mixins';

 export default {
   mixins: [optionProps],
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
