import { mount } from '@vue/test-utils';
import QueryBuilder from '@/components/tailwind/query-builder';
import conditions from './conditions';

describe('Query builder', () => {
  let blueprint;

  const TestQueryBuilder = {
    name: 'test-text-clause',
    template: '<query-builder :conditions="conditions" :blueprint="blueprint" @change="onChange" />',
    props: ['conditions', 'blueprint'],
    methods: {
      onChange(updatedBlueprint) {
        blueprint = updatedBlueprint;
      },
    },
    components: {
      QueryBuilder,
    },
  };

  it('renders an empty blueprint', () => {
    blueprint = [];

    const wrapper = mount(TestQueryBuilder, {
      propsData: {
        blueprint: [],
        conditions,
      },
      global: {
        directives: {
          'click-away': () => {},
        },
      },
    });

    const buttonWrapper = wrapper.find('button');
    buttonWrapper.trigger('click');
    expect(blueprint.length).toBe(1);
    buttonWrapper.trigger('click');
    expect(blueprint.length).toBe(3);
  });
});