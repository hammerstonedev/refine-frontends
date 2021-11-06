import Vue from 'vue';
import { mount } from '@vue/test-utils';
import QueryBuilder from '@/components/tailwind/query-builder';
import conditions from './conditions';

describe('Query builder', () => {
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

  it('renders refinements', async () => {
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

    const addAnOr = wrapper.find('button');
    addAnOr.trigger('click');
    expect(wrapper.vm.blueprint[0].input.count_refinement).toBeDefined();
    const conditionOptions = wrapper.find('button');
    conditionOptions.trigger('click');
    await Vue.nextTick();
    wrapper.find('input').setValue('123')
    await Vue.nextTick();
    expect(wrapper.vm.blueprint[0].input.count_refinement.value).toBe(123);
  });
});