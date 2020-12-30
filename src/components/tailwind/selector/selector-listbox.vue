<template>
  <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
    <ul
      tabindex="-1"
      role="listbox"
      :aria-activedescendant="selectedOption ? itemIdGenerator(selectedOption.id) : ''"
      class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      :class="{ hidden: isClosed }"
      ref="listBox"
      @keydown.arrow-down.stop.prevent="$emit('highlightNextOption')"
      @keydown.arrow-up.stop.prevent="$emit('highlightPreviousOption')"
      @keydown.enter.stop.prevent="$emit('selectOption')"
      @keydown.escape.stop.prevent="$emit('close')"
      @keydown.tab.stop.prevent="$emit('close')"
    >
      <slot :itemIdGenerator="itemIdGenerator"></slot>
    </ul>
  </div>
</template>

<script>
 export default {
   name: 'selector-listbox',
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
     itemIdGenerator: function(optionId) {
       return `listbox-option-${optionId}`
     },
   },
 };
</script>
