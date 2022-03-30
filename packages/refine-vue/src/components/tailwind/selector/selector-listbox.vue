<template>
  <refine-flavor as="div" component="select.listbox.wrapper">
    <refine-flavor
      as="ul"
      component="select.listbox"
      tabindex="-1"
      role="listbox"
      :aria-activedescendant="selectedOption ? createItemId(selectedOption.id) : ''"
      :flavorOptions="{ isClosed }"
      ref="listBox"
      @keydown.arrow-down.stop.prevent="$emit('highlight-next-option')"
      @keydown.arrow-up.stop.prevent="$emit('highlight-previous-option')"
      @keydown.enter.stop.prevent="$emit('select-option')"
      @keydown.escape.stop.prevent="$emit('close')"
      @keydown.tab.stop.prevent="$emit('close')"
    >
      <slot :createItemId="createItemId"></slot>
    </refine-flavor>
  </refine-flavor>
</template>

<script>
import { uid } from '../../../mixins';
import { RefineFlavor } from '../../tailwind/query-builder/refine-flavor';

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
    focus: function () {
      this.$refs.listBox.$el.focus();
    },
    createItemId: function (optionId) {
      return `listbox-option-${this.uid}-${optionId}`;
    },
  },
  components: {
    RefineFlavor,
  },
};
</script>
