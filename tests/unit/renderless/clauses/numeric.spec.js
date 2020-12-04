import Vue from 'vue';
import { mount } from '@vue/test-utils';
import clauses from '@/components/renderless/clauses/numeric';
import config from '@/config/clauses-config';
import { blueprint, NumericQuery } from '../mock-query';

describe('Numeric clauses update blueprint', () => {

  const { numeric: numericConfig } = config;
  const TestNumericClause = {
    name: 'test-numeric-clause',
    template: '<numeric-query><slot></slot></numeric-query>',
    components: {
      NumericQuery,
    },
  };

  it('udpates blueprint when unmounted', () => {
    const [{ component, id }] = numericConfig;
    const TestedClause = clauses[component];
    const WrappedClause = {
      name: 'clause-wrapper',
      template: '<tested-clause value1="32" />',
      components: {
        TestedClause,
      },
    };

    const wrapper = mount(TestNumericClause, {
      slots: {
        default: [WrappedClause],
      },
    });

    let { input } = blueprint[0];
    expect(input.clause).toBe(id);

    wrapper.destroy();

    input = blueprint[0].input;
    expect(input.clause).toBe(undefined);
  });

  it('updates blueprint when created', () => {
    numericConfig.forEach(({ component, id, requires }) => {
      const WrappedClause = {
        name: 'clause-wrapper',
        template: '<tested-clause value1="32" />',
        components: {
          TestedClause: clauses[component],
        },
      };

      mount(TestNumericClause, {
        slots: {
          default: [WrappedClause],
        },
      });

      expect(blueprint.length).toBe(1);
      const { input } = blueprint[0];
      expect(input.clause).toBe(id);
      if (requires.length > 0) {
        expect(input.value1).toBe('32');
      }
    });
  });
});
