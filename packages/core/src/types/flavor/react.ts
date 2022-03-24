import type { RefineComponentName } from ".";

export type RefineReactComponent<Name extends RefineComponentName> =
  React.ComponentType<RefineReactComponentProps<Name>>;

/**
 * Here we define all of the props that each component takes. This is used both
 * in our library code for our default components and in the overrides end
 * users can provide.
 */
export type RefineReactComponentPropsMap = {
  group: {
    className: string;
  };
  "group.addCriterionButton": {
    className: string;
  };
  "group.addCriterionButton.icon": {
    className: string;
    exampleIconProp: "neat!";
  };

  addGroupButton: {
    className: string;
  };

  criterion: {
    className: string;
  };
  "criterion.removeCriterionButton": {
    className: string;
  };
  "criterion.removeCriterionButton.icon": {
    className: string;
  };

  condition: {
    className: string;
  };

  clause: {
    className: string;
  };

  select: {
    className: string;
  };

  "inputs.date": {
    className: string;
    exampleDateInputProp: "also neat!";
  };

  "inputs.doubleDate": {
    className: string;
  };

  "inputs.number": {
    className: string;
  };

  "inputs.doubleNumber": {
    className: string;
  };

  "inputs.option": {
    className: string;
  };

  "inputs.relativeDate": {
    className: string;
  };

  "inputs.text": {
    className: string;
  };
};

/**
 * If you get an error below `Type 'Name' cannot be used to index type 'RefineReactComponentPropsMap'.`, then the type above is missing keys or a typo.
 */
export type RefineReactComponentProps<Name extends RefineComponentName> =
  RefineReactComponentPropsMap[Name];
