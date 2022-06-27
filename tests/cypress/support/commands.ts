import type { Blueprint } from '@hammerstone/refine-react';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Loads a fresh page with the given blueprint.
       *
       * @returns {typeof useBlueprint}
       * @memberof Chainable
       * @example
       *    cy.useBlueprint([{ depth: 1, type: 'criterion', condition_id: 'text', input: { clause: 'eq', value: 'hello, cypress' }, id: 'text' }])
       */
      useBlueprint: typeof useBlueprint;
    }
  }
}

const REFINE_URL = 'http://localhost:3000';

const useBlueprint = (blueprint: Blueprint) => {
  const url = new URL(REFINE_URL);
  url.searchParams.set('blueprint', JSON.stringify(blueprint));

  return cy.visit(url.href);
};

Cypress.Commands.add('useBlueprint', useBlueprint);
