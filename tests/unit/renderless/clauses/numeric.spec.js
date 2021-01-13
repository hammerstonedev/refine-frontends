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

    const { input } = blueprint[0];
    expect(blueprint.length).toBe(1);
    expect(input.clause).toBe(id);

    wrapper.findComponent(WrappedClause).destroy();
    expect(blueprint[0].input.clause).toBe(undefined);

    wrapper.destroy();

    expect(blueprint.length).toBe(0);
  });

  it('updates blueprint clause when created', () => {
    numericConfig.forEach(({ component, id, requires }) => {
      let template = '<tested-clause />';
      if (requires.length === 1) {
        template = '<tested-clause value1="32" />';
      } else if (requires.length === 2) {
        template = '<tested-clause value1="32" value2="34" />';
      }

      const WrappedClause = {
        name: 'clause-wrapper',
        template,
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
      if (requires.length === 0 ) {
        expect(input.value1).toBe(undefined);
        expect(input.value2).toBe(undefined);
      }
      if (requires.length === 1) {
        expect(input.value1).toBe('32');
      }
      if (requires.length === 2) {
        expect(input.value1).toBe('32');
        expect(input.value2).toBe('34');
      }
    });
  });
});
