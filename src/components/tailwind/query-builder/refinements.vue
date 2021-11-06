<template>
  <div>
    <p>{{ refinements[0].meta }}</p>
  <selector 
    @select-option="switchRefinement" 
    innerClass="mr-4"
  >
  <selector-option
    v-for="{id, meta, display} in refinements"
    :key="id"  
    :id="id"
    :display="display"
    :selected="!!input[id]"
  >
    <renderless-refinement 
      :id="id"
      v-slot="{ updateRefinementInput }"
    >
      <clause
        :meta="meta"
        :input="input[id]"
        @switch-clause="({ id: clause }) => updateRefinementInput({ clause })"
      />
    </renderless-refinement>
  </selector-option>
  </selector>
  </div>
</template>

<script>
import { Selector, SelectorOption } from "..";
import { RenderlessRefinement } from '../../renderless';
import Clause from './clause';

export default {
  name: 'refinements',
  inject: ['updateInput'],
  components: {
    Clause,
    RenderlessRefinement,
    Selector,
    SelectorOption,
  },
  props: {
    refinements: {
      required: true,
      type: Array,
    },
    input: {
      required: false,
      type: Object,
      default: () => { return {}; },
    },
  },  
  methods: {
    updateRefinementInput({ id: clause }) {
      this.updateInput( { clause });
    },
    switchRefinement: function ({ selectedOption: nextRefinement, previousOption }) {
      // delete old put in new?
      console.log(previousOption);
      return nextRefinement;
    },
  },
}
</script>