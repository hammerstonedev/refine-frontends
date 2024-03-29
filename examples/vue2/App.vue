<template>
  <div>
    <div class='bg-gray-800 text-white py-2 px-4 text-xl border-b border-gray-900'>Vue 2</div>
    <div class='space-y-6'>
      <div class='flex space-x-24 bg-indigo-900 text-white p-4'>
        <div>
          Change Flavor
          <div v-for='flavor of flavors' :key='flavor.name' class='flex items-center space-x-2'>
            <label class='capitalize'>
              <input
                type='radio'
                name='flavor'
                :value='flavor'
                :checked='flavor.name === chosenFlavor.name'
                @change='chosenFlavor = flavor'
              />
              {{ flavor.name }}</label
            >
          </div>
        </div>
        <div>
          Change Blueprint
          <div
            v-for='blueprint of blueprints'
            :key='blueprint.name'
            class='flex items-center space-x-2'
          >
            <label class='capitalize'>
              <input
                type='radio'
                name='blueprint'
                :value='blueprint'
                :checked='blueprint.name === chosenBlueprint.name'
                @change='chosenBlueprint = blueprint'
              />
              {{ blueprint.name }}</label
            >
          </div>
        </div>
      </div>
      <div class='px-12'>
        <query-builder
          v-model:blueprint='chosenBlueprint.blueprint'
          :conditions='conditions'
          :errors='errors'
          :flavor='chosenFlavor.flavor'
        />
        <pre>{{ chosenBlueprint.blueprint }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { QueryBuilder } from '../../packages/refine-vue/dist/vue2/refine-vue.esm';
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
import './main.css';

import { h, ref, defineComponent } from 'vue-demi';

import tailwindFlavor2 from './../../packages/refine-vue/src/flavors/tailwind';

// Group divider (for nova)
tailwindFlavor2.group.divider = {
  component: 'custom-divider',
  class(options) {
    console.log(options);
  },
};

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
    let blancoFlavor = {
      inputs: {
        date: {
          component: defineComponent({
            name: 'custom-date-picker',
            setup() {
              return () => {
                return h('div', {}, 'custom-date-picker');
              };
            },
          }),
        },
        number: {
          component: defineComponent({
            name: 'custom-number-input',
            setup() {
              return () => {
                return h('input', {
                  attrs: { type: 'number', placeholder: 'Custom number input' },
                });
              };
            },
          }),
        },
        text: {
          component: defineComponent({
            name: 'custom-text-input',
            setup() {
              return () => {
                return h('input', {
                  attrs: { type: 'text', placeholder: 'Custom text input' },
                });
              };
            },
          }),
        },
      },
    };
    let defaultFlavor = {
      group: {
        class: 'refine-query-builder-condition-group',
        // TODO: Verify if we want this
        wrapper: {
          class: 'refine-query-builder-wrapper',
        },
        addCriterionButton: {
          class: 'refine-query-builder-and-button',

          // TODO: Verify if we want this
          text: {
            class: 'refine-query-builder-and-button-span',
          },

          icon: {
            class: 'h-5 w-5',
          },
        },
      },
      addGroupButton: {
        class: 'refine-query-builder-or-button',
      },
      condition: {
        class: 'refine-query-builder-condition',
      },
      criterion: {
        class: '',
        removeCriterionButton: {
          class: 'refine-criterion-remove-icon',
        },

        // TODO: Verify if we want this
        errors: {
          class: 'refine-criterion-errors',
          error: {
            class: 'refine-criterion-error',
          },
        },
      },
      select: {
        class: 'refine-selector',

        // TODO: Verify if we want this
        wrapper: {
          class: 'refine-selector-wrapper',
        },

        // TODO: Verify if we want this
        customOptions: {
          class: '',
          wrapper: {
            class: 'refine-selector-custom-options-wrapper',
          },
        },

        // TODO: Verify if we want this
        listbox: {
          class: (options) => {
            return options.isClosed ? 'refine-selector-listbox-hidden' : 'refine-selector-listbox';
          },
          wrapper: {
            class: 'refine-selector-listbox-wrapper',
          },
          item: {
            class: (options) => {
              return `refine-selector-list-item ${
                options.isHighlighted && 'refine-selector-list-item-highlighted'
              }`;
            },

            text: {
              class: (options) =>
                `refine-selector-list-item-text ${
                  options.selected && 'refine-selector-list-item-text-selected'
                }`,
            },
            icon: {
              class: 'refine-selector-list-item-icon',
              wrapper: {
                class: (options) =>
                  `refine-selector-list-item-icon-wrapper ${
                    !options.isHighlighted && 'refine-selector-list-item-icon-wrapper-highlighted'
                  }`,
              },
            },
          },
        },
        button: {
          class: 'refine-selector-button',
          placeholder: {
            class: 'refine-selector-button-placeholder',
          },
          selected: {
            class: 'refine-selector-button-selected',
          },
          icon: {
            class: 'refine-selector-button-icon',
            wrapper: {
              class: 'refine-selector-button-icon-wrapper',
            },
          },
        },

        multi: {
          button: {
            class: 'refine-multi-selector-button',
            placeholder: {
              class: 'refine-multi-selector-button-placeholder',
            },
            selected: {
              class: 'refine-multi-selector-button-selected',
            },
            deselect: {
              icon: {
                class: 'refine-multi-selector-button-deselect-icon',
                wrapper: {
                  class: 'refine-multi-selector-button-deselect-icon-wrapper',
                },
              },
            },
            icon: {
              class: 'refine-multi-selector-button-icon',
              wrapper: {
                class: 'refine-multi-selector-button-icon-wrapper',
              },
            },
          },
        },
      },
      inputs: {
        date: {
          double: {
            wrapper: {
              class: 'refine-double-date-wrapper',
            },
            joiner: {
              class: 'refine-double-date-joiner',
            },
          },
          relative: {
            wrapper: {
              class: 'flex bg-red-100',
            },
          },
          calendar: {
            icon: {
              class: 'refine-date-input-calendar-icon',
            },
          },
          error: {
            icon: {
              class: 'refine-date-input-error-icon',
            },
          },
        },
        number: {
          class: 'refine-number-input',
          double: {
            wrapper: {
              class: 'refine-double-number-wrapper',
            },
            joiner: {
              class: 'refine-double-number-joiner',
            },
          },
        },
        text: {
          class: 'refine-text-input',
        },
      },
    };
    let relativeDateBlueprint = [
      {
        condition_id: 'date',
        depth: 1,
        type: 'criterion',
        input: {
          clause: 'eq',
          date1: '2020-12-12',
        },
        uid: '12345',
      },
    ];

    let flavors = [
      { name: 'base', flavor: {} },
      { name: 'default', flavor: defaultFlavor },
      { name: 'Tailwind2', flavor: tailwindFlavor2 },
    ];

    let blueprints = [
      { name: 'basic', blueprint: basicBlueprint },
      { name: 'blank', blueprint: [] },
      { name: 'kitchen sink', blueprint: kitchenSinkBlueprint },
      { name: 'relative date', blueprint: relativeDateBlueprint },
    ];

    let chosenFlavor = flavors[2]; // ref(flavors.find((f) => f.name === 'Tailwind'));
    let chosenBlueprint = blueprints[3]; //ref(blueprints.find((b) => b.name === 'basic'));

    return {
      conditions,
      flavors,
      blueprints,
      chosenFlavor,
      chosenBlueprint,
      errors: {
        '12345': [
          'You messed up big time'
        ],
      },
    };
  },
  mounted() {
    let nbew = [{
      condition_id: 'date',
      depth: 1,
      type: 'criterion',
      input: {
        clause: 'eq',
        date1: '2022-12-12',
      },
      uid: 'asdfasdf',
    }];

    this.$nextTick(() => {
      // this.chosenBlueprint = Object.assign({}, JSON.parse(JSON.stringify(this.chosenBlueprint)), { blueprint: nbew })
      this.chosenBlueprint = Object.assign({}, { blueprint: nbew })
    })

    // this.$set(this.chosenBlueprint, 'blueprint', nbew)
    // this.chosenBlueprint = chosen;
  },
  components: {
    QueryBuilder,
  },
};
</script>
