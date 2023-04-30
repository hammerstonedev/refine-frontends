const REFINE_URL = 'http://localhost:3000/';

describe('text input', () => {
  it('renders an input with given text', () => {
    cy.useBlueprint([
      {
        depth: 1,
        type: 'criterion',
        condition_id: 'text',
        input: {
          clause: 'eq',
          value: 'hello, cypress',
        },
      },
    ]);

    cy.get('input[type=text]').should('have.value', 'hello, cypress');
  });
});
