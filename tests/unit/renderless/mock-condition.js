import Condition from '@/components/renderless/condition';
import Query from '@/components/renderless/query';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

let blueprint = [];

export { blueprint };
export default {
  name: 'mock-condition',
  props: {
    required: true,
    type: String,
  },
  template: '<query v-on:change="onChange"><condition id="name" :type="type"><slot></slot></condition></query>',
  methods: {
    onChange(updatedBlueprint) {
      blueprint = updatedBlueprint;
    },
  },
  components: {
    Query,
    Condition,
  },
};
