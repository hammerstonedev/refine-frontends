<template>
  <!--
       Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

       Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
  -->
  <li
    id="listbox-option-0" role="option"
    class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
    :key="option.id"
  >
    <span
      class="font-normal block truncate"
      :class="{ 'font-semibold': selected }"
    >
      {{ option.display }}
    </span>

    <!--
         Checkmark, only display for selected option.

         Highlighted: "text-white", Not Highlighted: "text-indigo-600"
    -->
    <span
      class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4"
      :class="{ 'text-white': selected }"
    >
      <!-- Heroicon name: check -->
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </span>
  </li>
</template>

<script>
 export default {
   name: 'selector-option',
   props: {
     option: {
       type: Object,
       required: true,
     },
     selected: {
       type: Boolean,
       required: false,
       default: false,
     },
   },
 };
</script>
