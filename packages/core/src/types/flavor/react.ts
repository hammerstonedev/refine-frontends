import * as CSS from "csstype";
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
    style: CSS.Properties;
  };
  "group.addCriterionButton": {
    className: string;
    style: CSS.Properties;
  };
  "group.addCriterionButton.icon": {
    className: string;
    style: CSS.Properties;
  };

  addGroupButton: {
    className: string;
    style: CSS.Properties;
  };

  criterion: {
    className: string;
    style: CSS.Properties;
  };
  "criterion.removeCriterionButton": {
    className: string;
    style: CSS.Properties;
  };
  "criterion.removeCriterionButton.icon": {
    className: string;
    style: CSS.Properties;
  };

  condition: {
    className: string;
    style: CSS.Properties;
  };

  clause: {
    className: string;
    style: CSS.Properties;
  };

  select: {
    className: string;
    style: CSS.Properties;
  };

  "inputs.date": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.doubleDate": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.number": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.doubleNumber": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.option": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.relativeDate": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.text": {
    className: string;
    style: CSS.Properties;
  };
};

/**
 * If you get an error below `Type 'Name' cannot be used to index type 'RefineReactComponentPropsMap'.`, then the type above is missing keys or a typo.
 */
export type RefineReactComponentProps<Name extends RefineComponentName> =
  RefineReactComponentPropsMap[Name];
