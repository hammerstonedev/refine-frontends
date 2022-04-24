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
  "group.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "group.addCriterionButton": {
    className: string;
    style: CSS.Properties;
  };
  "group.addCriterionButton.text": {
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
  "criterion.removeCriterionButton.errors": {
    className: string;
    style: CSS.Properties;
  };
  "criterion.removeCriterionButton.errors.error": {
    className: string;
    style: CSS.Properties;
  };

  condition: {
    className: string;
    style: CSS.Properties;
  };

  select: {
    className: string;
    style: CSS.Properties;
  };
  "select.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "select.customOptions": {
    className: string;
    style: CSS.Properties;
  };
  "select.customOptions.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "select.listbox": {
    className: string;
    style: CSS.Properties;
  };
  "select.listbox.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "select.listbox.item": {
    className: string;
    style: CSS.Properties;
  };
  "select.listbox.item.text": {
    className: string;
    style: CSS.Properties;
  };
  "select.listbox.item.icon": {
    className: string;
    style: CSS.Properties;
  };
  "select.button": {
    className: string;
    style: CSS.Properties;
  };
  "select.button.placeholder": {
    className: string;
    style: CSS.Properties;
  };
  "select.button.selected": {
    className: string;
    style: CSS.Properties;
  };
  "select.button.icon": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button.placeholder": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button.selected": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button.deselect": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button.deselect.icon": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button.deselect.icon.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button.icon": {
    className: string;
    style: CSS.Properties;
  };
  "select.multi.button.icon.wrapper": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.date": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.double": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.double.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.double.joiner": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.relative": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.relative.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.calendar": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.calendar.icon": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.error": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.date.error.icon": {
    className: string;
    style: CSS.Properties;
  };

  "inputs.number": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.number.double": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.number.double.wrapper": {
    className: string;
    style: CSS.Properties;
  };
  "inputs.number.double.joiner": {
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
