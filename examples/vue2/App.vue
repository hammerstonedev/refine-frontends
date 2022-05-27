<template>
  <div class="space-y-6">
    <div class="flex space-x-24 bg-indigo-900 text-white p-4">
      <div>
        Change Flavor
        <div v-for="flavor of flavors" :key="flavor.name" class="flex items-center space-x-2">
          <input
            type="radio"
            name="flavor"
            :value="flavor"
            :checked="flavor.name === chosenFlavor.name"
            @change="chosenFlavor = flavor"
          />
          <label class="capitalize">{{ flavor.name }}</label>
        </div>
      </div>
      <div>
        Change Blueprint
        <div
          v-for="blueprint of blueprints"
          :key="blueprint.name"
          class="flex items-center space-x-2"
        >
          <input
            type="radio"
            name="blueprint"
            :value="blueprint"
            :checked="blueprint.name === chosenBlueprint.name"
            @change="chosenBlueprint = blueprint"
          />
          <label class="capitalize">{{ blueprint.name }}</label>
        </div>
      </div>
    </div>
    <query-builder
      :key="`${chosenFlavor.name}-${chosenBlueprint.name}`"
      :blueprint="chosenBlueprint.blueprint"
      :conditions="conditions"
      :errors="errors"
      :flavor="chosenFlavor.flavor"
      @change="(v) => (debugBlueprint = v)"
    />
    <pre class="text-xs">{{ JSON.stringify(chosenBlueprint, null, 2) }}</pre>
    <!-- 
    <query>
      <div class="p-4">
        <condition-selector>
          <text-condition-option id="last-name" display="Last Name" />
          <numeric-condition-option
            id="years-of-experience"
            display="Years of Experience"
            :selected="true"
          >
            <is-between-option :selected="true" />
            <is-not-between-option />
          </numeric-condition-option>
        </condition-selector>
        <condition-selector>
          <numeric-condition-option
            id="years-of-experience"
            display="Years of Experience"
            :selected="true"
          />
          <text-condition-option id="last-name" display="Last Name" />
        </condition-selector>
        <div class="pt-4">
          <label>Name</label>
          <text-condition id="first-name" value="Bob" class="pt-2" />
        </div>
        <div class="pt-4">
          <label>Age</label>
          <numeric-condition id="age" :value="32" class="pt-2" />
        </div>
        <div class="pt-4">
          <label>Hotness</label>
          <numeric-condition id="hotness" :from="7" :to="10" class="pt-2" />
        </div>
      </div>
    </query>
    -->
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
import '../../packages/refine-vue/dist/vue2/refine-vue.esm.css';
import { h, ref, defineComponent } from 'vue-demi';

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
              class: 'refine-relative-date-wrapper',
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
    let tailwindFlavor = {
      group: {
        class: 'flex flex-col gap-4 bg-gray-100 px-4 py-8 rounded-lg border-l-4',
        wrapper: {
          class: 'space-y-4',
        },
        addCriterionButton: {
          class: 'flex text-gray-600',
        },
      },
      addGroupButton: {
        class: 'px-2 py-1 bg-blue-500 text-white rounded',
      },
      criterion: {
        wrapper: {
          class: 'flex flex-wrap gap-x-2 gap-y-4',
        },
        removeCriterionButton: {
          class:
            'rounded-full bg-gray-200 w-10 h-10 text-gray-600 flex items-center justify-center',
          icon: {
            class: 'h-5 w-5',
          },
        },
        errors: {
          class:
            'flex-1 basis-full bg-red-50 border-l-2 border-red-600 text-red-300 px-4 py-2 rounded list-disc list-inside',
          error: {
            class: 'text-red-600 font-semibold',
          },
        },
      },
      select: {
        class: 'relative sm:inline-block w-60',
        wrapper: {
          class: 'flex items-start gap-4',
        },
        customOptions: {
          class: '',
          wrapper: {
            class: 'w-auto pt-4 md:flex md:pt-0',
          },
        },
        listbox: {
          class: (options) => {
            return options.isClosed
              ? 'hidden'
              : 'overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none';
          },

          wrapper: {
            class: 'absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg',
          },
          item: {
            class: (options) => {
              return `relative py-2 pl-3 cursor-pointer select-none pr-9 ${
                options.isHighlighted ? 'text-white bg-blue-600' : 'text-gray-900'
              }`;
            },

            text: {
              class: (options) =>
                `block truncate ${options.selected ? 'font-semibold' : 'font-normal'}`,
            },
            icon: {
              class: 'w-5 h-5',
              wrapper: {
                class: (options) =>
                  `absolute inset-y-0 right-0 flex items-center pr-4 ${
                    !options.isHighlighted ? 'text-blue-600' : 'text-white'
                  }`,
              },
            },
          },
        },
        button: {
          class:
            'relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default; focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
          placeholder: {
            class: 'block text-gray-300 truncate select-none',
          },
          selected: {
            class: 'block truncate',
          },
          icon: {
            class: 'w-5 h-5 text-gray-400',
            wrapper: {
              class: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
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
              class: 'flex items-center gap-[1ch]',
            },
            joiner: {
              class: '',
            },
          },
        },
        number: {
          class: 'refine-number-input',
          double: {
            wrapper: {
              class: 'flex items-center gap-[1ch]',
            },
            joiner: {
              class: '',
            },
          },
        },
        text: {
          class: 'refine-text-input',
        },
      },
    };

    let flavors = [
      { name: 'base', falvor: {} },
      { name: 'default', flavor: defaultFlavor },
      { name: 'Tailwind', flavor: tailwindFlavor },
    ];

    let blueprints = [
      { name: 'basic', blueprint: basicBlueprint },
      { name: 'blank', blueprint: [] },
      { name: 'kitchen sink', blueprint: kitchenSinkBlueprint },
    ];

    let chosenFlavor = ref(flavors.find((f) => f.name === 'default'));
    let chosenBlueprint = ref(blueprints.find((b) => b.name === 'basic'));

    return {
      conditions,
      flavors,
      blueprints,
      chosenFlavor,
      chosenBlueprint,
      errors: {
        0: [
          {
            id: 23434,
            message: 'You messed up big time',
          },
          {
            id: 454534,
            message: 'Good luck with your life',
          },
        ],
      },
    };
  },
  components: {
    QueryBuilder,
  },
};
</script>
