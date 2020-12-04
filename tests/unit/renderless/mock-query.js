import {
  TextCondition,
  NumericCondition,
} from '@/components/renderless/conditions';
import Query from '@/components/renderless/query';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

let blueprint = [];

const queryMixin = {
  methods: {
    onChange(updatedBlueprint) {
      blueprint = updatedBlueprint;
    },
  },
  components: {
    Query,
    TextCondition,
    NumericCondition,
  },
}

const TextQuery = {
  name: 'text-query',
  mixins: [queryMixin],
  template: '<query v-on:change="onChange"><text-condition id="name"><slot></slot></text-condition></query>',
};

const NumericQuery = {
  name: 'numeric-query',
  mixins: [queryMixin],
  template: '<query v-on:change="onChange"><numeric-condition id="age"><slot></slot></numeric-condition></query>',
};


export { blueprint, TextQuery, NumericQuery };
