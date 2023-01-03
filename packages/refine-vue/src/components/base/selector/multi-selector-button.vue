<template>
  <refine-flavor
    as="button"
    component="select.multi.button"
    :id="id"
    aria-haspopup="listbox"
    :aria-label="label()"
    :aria-expanded="isOpen"
    ref="button"
    @click.prevent="$emit('toggle')"
    @keydown.enter.stop.prevent="$emit('open')"
    @keydown.arrow-down.stop.prevent="$emit('open')"
    tabindex="0"
  >
    <refine-flavor
      as="span"
      component="select.multi.button.placeholder"
      v-if="selectedOptions.length === 0"
    >
      Choose an option
    </refine-flavor>
    <refine-flavor
      as="span"
      component="select.multi.button.selected"
      v-else
      v-for="{ id, display } in selectedOptions"
      :key="id"
    >
      {{ display }}
      <refine-flavor
        as="span"
        component="select.multi.button.deselect.icon.wrapper"
        @click.prevent="$emit('deselect-option', id)"
      >
        <refine-flavor
          as="svg"
          component="select.multi.button.deselect.icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </refine-flavor>
      </refine-flavor>
    </refine-flavor>
    <refine-flavor as="span" component="select.multi.button.icon.wrapper">
      <!-- Heroicon name: selector -->
      <refine-flavor
        as="svg"
        component="select.multi.button.icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </refine-flavor>
    </refine-flavor>
  </refine-flavor>
</template>

<script>
import { RefineFlavor } from '../query-builder/refine-flavor';
export default {
  name: 'multi-selector-button',
  props: {
    id: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    selectedOptions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    label: function () {
      const combinedOptions = this.selectedOptions.map(({ display }) => display).join(', ');
      const labelText = `${combinedOptions} Selected`;

      return this.selectedOptions.length === 0 ? 'Choose an option' : labelText;
    },
    focus: function () {
      this.$refs.button.focus();
    },
  },
  components: {
    RefineFlavor,
  },
};
</script>
