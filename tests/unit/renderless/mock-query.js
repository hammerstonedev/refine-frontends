import { TextCondition } from '@/components/renderless/conditions';
import Query from '@/components/renderless/query';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

let blueprint = [];

const TextQuery = {
  name: 'text-query',
  props: {
    required: true,
    type: String,
  },
  template: '<query v-on:change="onChange"><text-condition id="name" :type="type"><slot></slot></text-condition></query>',
  methods: {
    onChange(updatedBlueprint) {
      blueprint = updatedBlueprint;
    },
  },
  components: {
    Query,
    TextCondition,
  },
};

export { blueprint, TextQuery };
