<template>
  <refine-flavor
    as="li"
    component="select.listbox.item"
    :flavorOptions="{ isHighlighted }"
    role="option"
    :key="optionId"
    ref="listItem"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
    @click="$emit('selected')"
    :aria-label="optionDisplay"
    :aria-selected="selected"
  >
    <refine-flavor as="span" component="select.listbox.item.text" :flavorOptions="{ selected }">
      {{ optionDisplay }}
    </refine-flavor>

    <refine-flavor
      as="span"
      component="select.listbox.item.icon.wrapper"
      :flavorOptions="{ isHighlighted }"
    >
      <!-- Heroicon name: check -->
      <refine-flavor
        as="svg"
        component="select.listbox.item.icon"
        v-show="selected"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        :aria-hidden="!selected"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </refine-flavor>
    </refine-flavor>
  </refine-flavor>
</template>

<script>
import { RefineFlavor } from '../../tailwind/query-builder/refine-flavor';

export default {
  name: 'selector-list-item',
  props: {
    optionId: {
      type: [String, Number],
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
    isHighlighted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['selected', 'mouseenter', 'mouseleave'],
  methods: {
    scrollIntoView: function () {
      this.$refs.listItem.$el.scrollIntoView(false);
    },
  },
  components: {
    RefineFlavor,
  },
};
</script>
