<template>
  <renderless-option
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
  </renderless-option>
</template>

<script>
 import RenderlessOption from '@/components/renderless/renderless-option';
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
     RenderlessOption,
   },
 };
</script>
