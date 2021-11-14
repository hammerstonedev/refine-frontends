import Vue from 'vue';
import { mount } from '@vue/test-utils';
import QueryBuilder from '@/components/tailwind/query-builder';
import conditions from '../conditions';

describe('Option condition', () => {
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

  it('selects multiple options', async () => {
    const wrapper = buildWrapper();
    const addAnOr = wrapper.find('button');
    addAnOr.trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.blueprint.length).toBe(1);

    wrapper.find('[aria-label="Is"]').trigger('click');
    await Vue.nextTick();
    wrapper.find('[aria-label="Is One Of"]').trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.blueprint[0].input.clause).toBe('in');
    wrapper.find('[aria-label="Foo Selected"]').trigger('click');
    wrapper.find('[aria-label="Bar"]').trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.blueprint[0].input.clause).toBe('in');
    expect(wrapper.vm.blueprint[0].input.selected[0]).toBe('foo');
    expect(wrapper.vm.blueprint[0].input.selected[1]).toBe('bar');
    expect(wrapper.vm.blueprint[0].input.selected.length).toBe(2);

    wrapper.find('[aria-label="Bar"]').trigger('click');
    expect(wrapper.vm.blueprint[0].input.clause).toBe('in');
    expect(wrapper.vm.blueprint[0].input.selected[0]).toBe('foo');
    expect(wrapper.vm.blueprint[0].input.selected.length).toBe(1);
  });

  it('selects first option when switching to single select clause', async () => {
    const wrapper = buildWrapper();
    const addAnOr = wrapper.find('button');
    addAnOr.trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.blueprint.length).toBe(1);

    wrapper.find('[aria-label="Is"]').trigger('click');
    await Vue.nextTick();
    wrapper.find('[aria-label="Is One Of"]').trigger('click');
    await Vue.nextTick();

    // Foo is selected by default by the Is clause as the first option
    wrapper.find('[aria-label="Foo Selected"]').trigger('click');
    await Vue.nextTick();

    // Also select Bar so two choices are selected
    wrapper.find('[aria-label="Bar"]').trigger('click');
    await Vue.nextTick();

    // Now switch back to Is clause which should select only Foo
    wrapper.find('[aria-label="Is"]').trigger('click');
    await Vue.nextTick();
  });
});