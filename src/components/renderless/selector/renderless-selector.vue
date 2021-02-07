<script>
 import Vue from 'vue';
 import SelectorStore from '@/stores/selector';

 export default {
   name: 'renderless-selector',
   inject: ['builderModeActive'],
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
     selectedOption() {
       const firstOption = this.selector.options[0] || null;
       return this.selector.selectedOption ? this.selector.selectedOption : firstOption;
     },
     isOpen() {
       return !this.isClosed;
     },
     actions: function() {
       const {
         open,
         close,
         toggle,
         selectOption,
         highlightNextOption,
         highlightPreviousOption,
         highlightOption,
       } = this;

       return {
         open,
         close,
         toggle,
         selectOption,
         highlightNextOption,
         highlightPreviousOption,
         highlightOption,
       };
     },
     state: function() {
       const {
         isClosed,
         isOpen,
         selectedOption,
         highlightedOption,
       } = this;

       return {
         isClosed,
         isOpen,
         selectedOption,
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
       if(!this.isClosed) {
         this.isClosed = true;
       }
       return this.nextTick();
     },
     open() {
       this.isClosed = false;
       this.highlightedOption = this.selectedOption;
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
     selectOption(optionId) {
       this.selector.selectOption(optionId);
       this.$emit(
         'select-option',
         this.selector.previousOption,
         this.selector.selectedOption,
       )
       return this.close();
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
 }
</script>
