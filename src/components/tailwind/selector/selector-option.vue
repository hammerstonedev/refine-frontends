<template>
  <li
    role="option"
    class="cursor-default select-none relative py-2 pl-3 pr-9"
    :class="{'text-white bg-indigo-600': highlighted, 'text-gray-900': !highlighted }"
    :key="optionId"
  >
    <span
      class="font-normal block truncate"
      :class="{ 'font-semibold': selected }"
    >
      {{ optionDisplay }}
    </span>

    <span
      :class="{ 'text-white': highlighted, 'text-indigo-600': !highlighted }"
      class="absolute inset-y-0 right-0 flex items-center pr-4"
    >
      <!-- Heroicon name: check -->
      <svg
        v-show="selected"
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        :aria-hidden="!selected"
      >
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </span>
  </li>
</template>

<script>
 export default {
   name: 'selector-option',
   props: {
     optionId: {
       type: String,
       required: true,
     },
     optionDisplay: {
       type: String,
       required: true,
     },
     selected: {
       type: Boolean,
       required: false,
       default: false,
     },
     highlighted: {
       type: Boolean,
       required: false,
       default: false,
     },
   },
 };
</script>
