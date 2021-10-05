import { mount } from '@vue/test-utils';
import QueryBuilder from '@/components/tailwind/query-builder';
import conditions from './conditions';

describe('Query builder', () => {
  let blueprint;

  const TestQueryBuilder = {
    name: 'test-text-clause',
    template: '<query-builder :conditions="conditions" v-model="blueprint" />',
    props: ['conditions'],
    components: {
      QueryBuilder,
    },
  };

  it('renders an empty blueprint', () => {
    const wrapper = mount(TestQueryBuilder, {
      data() {
        return {
          blueprint: [],
        };
      },
      propsData: {
        conditions,
      },
    });

    const buttonWrapper = wrapper.find('button');
    buttonWrapper.trigger('click');
    expect(wrapper.vm.blueprint.length).toBe(1);
    buttonWrapper.trigger('click');
    expect(wrapper.vm.blueprint.length).toBe(3);
  });
});