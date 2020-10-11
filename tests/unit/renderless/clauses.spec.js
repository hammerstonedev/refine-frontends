import { mount } from '@vue/test-utils';
import clauses from '@/components/renderless/clauses/text';
import SimpleCondition, { blueprint } from './mock-condition';

describe('Text does not start with', () => {

  const { DoesNotStartWith } = clauses;

  const DswClause = {
    name: 'dsw-clause',
    template: '<SimpleCondition type="text"><does-not-start-with value="Aaron"/></SimpleCondition>',
    components: {
      SimpleCondition,
      DoesNotStartWith,
    },
  };


  it('updates blueprint when created', () => {
    const wrapper = mount(DswClause);
    expect(blueprint.length).toBe(1);
    const { input } = blueprint[0];
    expect(input.clause).toBe('dsw');
    expect(input.value).toBe('Aaron');
  });
});
