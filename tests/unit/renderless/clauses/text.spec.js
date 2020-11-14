import Vue from 'vue';
import { mount } from '@vue/test-utils';
import clauses from '@/components/renderless/clauses/text';
import config from '@/config/clauses-config';
import { blueprint, TextQuery } from '../mock-query';

describe('Text clauses update blueprint', () => {

  const { text: textConfig } = config;
  const TestTextClause = {
    name: 'test-text-clause',
    template: '<text-query type="text"><slot></slot></text-query>',
    components: {
      TextQuery,
    },
  };

  it('udpates blueprint when unmounted', () => {
    const [{ component, id }] = textConfig;
    const TestedClause = clauses[component];
    const WrappedClause = {
      name: 'clause-wrapper',
      template: '<tested-clause value="Aaron" />',
      components: {
        TestedClause,
      },
    };

    const wrapper = mount(TestTextClause, {
      propsData: {
        shouldRender: true,
      },
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
    textConfig.forEach(({ component, id, requires }) => {
      const WrappedClause = {
        name: 'clause-wrapper',
        template: '<tested-clause value="Aaron" />',
        components: {
          TestedClause: clauses[component],
        },
      };

      mount(TestTextClause, {
        slots: {
          default: [WrappedClause],
        },
      });

      expect(blueprint.length).toBe(1);
      const { input } = blueprint[0];
      expect(input.clause).toBe(id);
      if (requires.length > 0) {
        expect(input.value).toBe('Aaron');
      }
    });
  });
});
