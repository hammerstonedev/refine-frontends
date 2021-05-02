<script>
import Vue from "vue";
import SelectorStore from "@/stores/selector";

export default {
  name: "renderless-selector",
  inject: ["builderModeActive"],
  data() {
    return {
      selector: Vue.observable(new SelectorStore()),
      isClosed: true,
      highlightedOption: null,
    };
  },
  provide() {
    return {
      selector: this.selector,
    };
  },
  computed: {
    selectedOptions() {
      return this.selector.selectedOptions;
    },
    firstSelectedOption() {
      return this.selectedOptions[0];
    },
    isOpen() {
      return !this.isClosed;
    },
    actions: function () {
      const {
        clearOptions,
        close,
        highlightNextOption,
        highlightPreviousOption,
        highlightOption,
        open,
        selectOption,
        selectedOptions,
        toggle,
      } = this;

      return {
        clearOptions,
        close,
        highlightNextOption,
        highlightPreviousOption,
        highlightOption,
        open,
        selectOption,
        selectedOptions,
        toggle,
      };
    },
    state: function () {
      const { isClosed, isOpen, selectedOptions, highlightedOption } = this;

      return {
        isClosed,
        isOpen,
        selectedOptions,
        highlightedOption,
        options: this.selector.options,
      };
    },
  },
  methods: {
    nextTick() {
      return Vue.nextTick().then(() => {
        return {
          actions: this.actions,
          ...this.state,
        };
      });
    },
    close() {
      if (!this.isClosed) {
        this.isClosed = true;
      }
      return this.nextTick();
    },
    open() {
      this.isClosed = false;
      this.highlightedOption = this.firstSelectedOption;
      return this.nextTick();
    },
    toggle() {
      if (this.isClosed) {
        this.open();
      } else {
        this.close();
      }
      return this.nextTick();
    },
    toggleOption(optionId) {
      const selectedOption = this.selector.toggleOption(optionId);
      if (selectedOption) {
        this.$emit("select-option", selectedOption);
      } else {
        this.$emit("deselect-option");
      }
    },
    clearOptions(){
      this.selector.clearSelectedOptions();
    },
    deselectOption(optionId) {
      this.selector.deselectOption(optionId);
      this.$emit("deselect-option");
    },
    selectOption(optionId) {
      const selectedOption = this.selector.selectOption(optionId);
      this.$emit("select-option", selectedOption);
    },
    highlightOption(option) {
      this.highlightedOption = option;
      return this.nextTick();
    },
    highlightNextOption() {
      const nextOption = this.highlightedOption?.nextOption;
      if (nextOption) {
        this.highlightedOption = nextOption;
      }
      return this.nextTick();
    },
    highlightPreviousOption() {
      const previousOption = this.highlightedOption?.previousOption;
      if (previousOption) {
        this.highlightedOption = previousOption;
      }
      return this.nextTick();
    },
  },
  render() {
    if (this.$scopedSlots?.default) {
      return this.$scopedSlots.default({
        actions: this.actions,
        ...this.state,
      });
    }
    return null;
  },
};
</script>
