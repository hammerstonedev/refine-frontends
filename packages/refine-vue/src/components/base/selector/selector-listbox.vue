<template>
  <refine-flavor as="div" component="select.listbox.wrapper">
    <refine-flavor
      as="ul"
      component="select.listbox"
      :flavorOptions="{ isClosed }"
      tabindex="-1"
      role="listbox"
      :aria-activedescendant="selectedOption ? createItemId(selectedOption.id) : ''"
      ref="listBox"
      @keydown.delete.stop.prevent="clearBuffer"
      @keydown.arrow-down.stop.prevent="() => preserveBuffer() && $emit('highlight-next-option')"
      @keydown.arrow-up.stop.prevent="() => preserveBuffer() && $emit('highlight-previous-option')"
      @keydown.enter.stop.prevent="$emit('select-option')"
      @keydown.escape.stop.prevent="$emit('close')"
      @keydown.tab.stop.prevent="$emit('close')"
      @keydown="handleKeypress($event)"
    >
      <slot :createItemId="createItemId"></slot>
    </refine-flavor>
  </refine-flavor>
</template>

<script>
import { uid } from '../../../mixins';
import { RefineFlavor } from '../../base/query-builder/refine-flavor';

export default {
  name: 'selector-listbox',
  mixins: [uid],
  data() {
    return {
      buffer: '',
      clearBufferTimeout: null,
    };
  },
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
  watch: {
    isClosed(closed) {
      if (!closed) {
        this.$nextTick(() => this.$refs.listBox.$el.focus());
      }
    },

    buffer(value) {
      this.$emit('buffer-changed', value);
    },
  },
  methods: {
    createItemId: function (optionId) {
      return `listbox-option-${this.uid}-${optionId}`;
    },

    handleKeypress(event) {
      const alphanumeric = new RegExp(/[a-zA-Z\d ]/);

      if (alphanumeric.test(event.key) && event.key.length === 1) {
        this.buffer += event.key;
        this.preserveBuffer();
      }
    },

    clearBuffer() {
      this.buffer = this.buffer.slice(0, -1);
      this.preserveBuffer();
    },

    preserveBuffer() {
      clearTimeout(this.clearBufferTimeout);

      this.clearBufferTimeout = setTimeout(() => {
        this.buffer = '';
      }, 1500);

      return true;
    },
  },
  components: {
    RefineFlavor,
  },
};
</script>
