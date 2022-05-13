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
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "group.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  "group.addCriterionButton": {
    className?: string;
    style?: CSS.Properties;
    onClick: React.MouseEventHandler;
  };
  "group.addCriterionButton.text": {
    className?: string;
    style?: CSS.Properties;
  };
  "group.addCriterionButton.icon": {
    className?: string;
    style?: CSS.Properties;
  };

  addGroupButton: {
    className?: string;
    style?: CSS.Properties;
    onClick: React.MouseEventHandler;
  };

  criterion: {
    className?: string;
    style?: CSS.Properties;
  };
  "criterion.removeCriterionButton": {
    className?: string;
    style?: CSS.Properties;
    onClick: React.MouseEventHandler;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "criterion.errors": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "criterion.errors.error": {
    className?: string;
    style?: CSS.Properties;
  };

  condition: {
    className?: string;
    style?: CSS.Properties;
  };

  select: {
    className?: string;
    style?: CSS.Properties;
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
  };
  "select.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.customOptions": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.customOptions.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.listbox": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.listbox.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.listbox.item": {
    className?: string;
    style?: CSS.Properties;
    value: string;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.listbox.item.text": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.listbox.item.icon": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.button": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.button.placeholder": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.button.selected": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.button.icon": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button.placeholder": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button.selected": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button.deselect": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button.deselect.icon": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button.deselect.icon.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button.icon": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "select.multi.button.icon.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };

  "inputs.date": {
    className?: string;
    style?: CSS.Properties;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
  "inputs.date.double": {
    className?: string;
    style?: CSS.Properties;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
  "inputs.date.double.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  "inputs.date.double.joiner": {
    className?: string;
    style?: CSS.Properties;
  };
  "inputs.date.relative": {
    className?: string;
    style?: CSS.Properties;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
  "inputs.date.relative.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "inputs.date.calendar": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "inputs.date.calendar.icon": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "inputs.date.error": {
    className?: string;
    style?: CSS.Properties;
  };
  /**
   * TODO: Not used in React implementation.
   */
  "inputs.date.error.icon": {
    className?: string;
    style?: CSS.Properties;
  };

  "inputs.number": {
    className?: string;
    style?: CSS.Properties;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
  "inputs.number.double": {
    className?: string;
    style?: CSS.Properties;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
  "inputs.number.double.wrapper": {
    className?: string;
    style?: CSS.Properties;
  };
  "inputs.number.double.joiner": {
    className?: string;
    style?: CSS.Properties;
  };

  "inputs.text": {
    className?: string;
    style?: CSS.Properties;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
};

/**
 * If you get an error below `Type 'Name' cannot be used to index type 'RefineReactComponentPropsMap'.`, then the type above is missing keys or a typo.
 */
export type RefineReactComponentProps<Name extends RefineComponentName> =
  RefineReactComponentPropsMap[Name];
