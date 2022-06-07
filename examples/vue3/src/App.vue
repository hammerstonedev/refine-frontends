<template>
  <div class="bg-gray-800 text-white py-2 px-4 text-xl border-b border-gray-900">Vue 3</div>
  <div class="space-y-6">
    <div class="flex space-x-24 bg-indigo-900 text-white p-4">
      <div>
        Change Flavor
        <div v-for="flavor of flavors" :key="flavor.name" class="flex items-center space-x-2">
          <label class="capitalize">
            <input
              type="radio"
              name="flavor"
              :value="flavor"
              :checked="flavor.name === chosenFlavor.name"
              @change="chosenFlavor = flavor"
            />
            {{ flavor.name }}</label
          >
        </div>
      </div>
      <div>
        Change Blueprint
        <div
          v-for="blueprint of blueprints"
          :key="blueprint.name"
          class="flex items-center space-x-2"
        >
          <label class="capitalize">
            <input
              type="radio"
              name="blueprint"
              :value="blueprint"
              :checked="blueprint.name === chosenBlueprint.name"
              @change="chosenBlueprint = blueprint"
            />
            {{ blueprint.name }}</label
          >
        </div>
      </div>
      <div>
        <button @click.prevent="reorderTailwind">Reorder Tailwind Criterion</button>
        <br />
        <button @click.prevent="customComponent">Custom Component</button>
      </div>
    </div>
    <div class="px-12">
      <query-builder
        :key="`${chosenFlavor.name}-${chosenBlueprint.name}`"
        :errors="errors"
        :conditions="conditions"
        v-model:blueprint="chosenBlueprint.blueprint"
        :flavor="chosenFlavor.flavor"
      />
    </div>
    <pre class="text-xs">{{ chosenBlueprint.blueprint }}</pre>
  </div>
</template>

<script>
import { QueryBuilder } from '../../../packages/refine-vue/src/package';
import {
  basicBlueprint,
  booleanCondition,
  dateCondition,
  dateWithTimeCondition,
  kitchenSinkBlueprint,
  numericCondition,
  optionCondition,
  textCondition,
} from 'refine-core/fixtures';

import './index.css';
import '../../../packages/refine-vue/dist/vue3/refine-vue.esm.css';

import tailwindFlavor2 from '../../../packages/refine-vue/src/flavors/tailwind';

let conditions = [
  optionCondition,
  textCondition,
  booleanCondition,
  dateCondition,
  dateWithTimeCondition,
  numericCondition,
];

export default {
  name: 'App',
  data() {
    let flavors = [
      {
        name: 'Blank',
        flavor: {},
      },
      {
        name: 'Tailwind',
        flavor: tailwindFlavor2,
      },
    ];

    let relativeDateBlueprint = [
      {
        condition_id: 'date',
        depth: 1,
        type: 'criterion',
        input: {
          clause: 'btwn',
          date1: '2020-12-12',
        },
        uid: '12345',
      },
    ];

    let blueprints = [
      { name: 'basic', blueprint: basicBlueprint },
      { name: 'blank', blueprint: [] },
      { name: 'kitchen sink', blueprint: kitchenSinkBlueprint },
      { name: 'relative date', blueprint: relativeDateBlueprint },
      {
        name: 'fail',
        blueprint: [
          {
            depth: 1,
            type: 'criterion',
            condition_id: 'numeric',
            input: {
              clause: 'btwn',
              value1: 1,
              value2: 5,
            },
          },
        ],
      },
    ];

    let chosenFlavor = flavors[1]; // ref(flavors.find((f) => f.name === 'Tailwind'));
    let chosenBlueprint = blueprints[4]; //ref(blueprints.find((b) => b.name === 'basic'));

    return {
      conditions,
      flavors,
      blueprints,
      chosenFlavor,
      chosenBlueprint,
      errors: {
        '12345.value': {
          message: 'You messed up big time',
        },
      },
    };
  },
  components: {
    QueryBuilder,
  },
  methods: {
    reorderTailwind() {
      let flavor = this.flavors.find((f) => f.name === 'Tailwind').flavor;

      flavor.criterion.wrapper.order = ['remove', 'errors', 'selector'];

      flavor.criterion.removeCriterionButton.class =
        'rounded-full bg-gray-200 w-10 h-10 text-gray-600 flex items-center justify-center mr-2';
    },
    customComponent() {
      let flavor = this.flavors.find((f) => f.name === 'Tailwind').flavor;

      flavor.criterion.wrapper.component = 'custom-criterion-row';
    },
  },
};
</script>
