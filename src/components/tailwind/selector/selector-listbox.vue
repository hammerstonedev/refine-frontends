<template>
  <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
    <ul
      tabindex="-1"
      role="listbox"
      :aria-activedescendant="selectedOption ? createItemId(selectedOption.id) : ''"
      class="max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      :class="{ hidden: isClosed }"
      ref="listBox"
      @keydown.arrow-down.stop.prevent="$emit('highlight-next-option')"
      @keydown.arrow-up.stop.prevent="$emit('highlight-previous-option')"
      @keydown.enter.stop.prevent="$emit('select-option')"
      @keydown.escape.stop.prevent="$emit('close')"
      @keydown.tab.stop.prevent="$emit('close')"
    >
      <slot :createItemId="createItemId"></slot>
    </ul>
  </div>
</template>

<script>
 import { uid } from '@/mixins';

 export default {
   name: 'selector-listbox',
   mixins: [uid],
   props: {
     isClosed: {
       type: Boolean,
       required: false,
       default: true,
     },
     selectedOption: {
       type: Object,
       required: false,
     },
   },
   methods: {
     focus: function() {
       this.$refs.listBox.focus();
     },
     createItemId: function(optionId) {
       return `listbox-option-${this.uid}-${optionId}`
     },
   },
 };
</script>
