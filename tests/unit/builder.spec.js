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
  
  const buildWrapper = () => {
    return mount(TestQueryBuilder, {
      data() {
        return {
          blueprint: [],
        };
      },
      propsData: {
        conditions,
      },
    });
  }

  it('renders an empty blueprint', () => {
    const wrapper = buildWrapper();
    const buttonWrapper = wrapper.find('button');
    buttonWrapper.trigger('click');
    expect(wrapper.vm.blueprint.length).toBe(1);
    buttonWrapper.trigger('click');
    expect(wrapper.vm.blueprint.length).toBe(3);
  });

  it('renders refinements', async () => {
    const wrapper = buildWrapper();
    const addAnOr = wrapper.find('button');
    addAnOr.trigger('click');
    expect(wrapper.vm.blueprint[0].input.count_refinement).toBeDefined();
  });

  it('changes refinement value', async () => {
    const wrapper = buildWrapper();
    const addAnOr = wrapper.find('button');
    addAnOr.trigger('click');

    await Vue.nextTick();

    wrapper.find('input').setValue('123')

    await Vue.nextTick();

    expect(wrapper.vm.blueprint[0].input.count_refinement.value).toBe(123);
  });

  it('changes the refinement', async () => {
    const wrapper = buildWrapper();

    // add a criterion
    const addAnOr = wrapper.find('button');
    addAnOr.trigger('click');
    await Vue.nextTick();

    // initial loading of the criterion sets the initial refinement
    expect(wrapper.vm.blueprint[0].input.count_refinement).toBeDefined();

    // open the refinement condition choices
    const refinementChoices = wrapper.find('[aria-label="Count Refinement"]');
    refinementChoices.trigger('click');
    await Vue.nextTick();

    wrapper.find('[aria-label="Kaboom Refinement"]').trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.blueprint[0].input.count_refinement).not.toBeDefined();
  });
});