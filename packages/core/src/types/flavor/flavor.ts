import type {
  StylingProps,
  DeepPartial,
  ExtractComponentNames,
  RefineReactComponent,
  RefineVueComponent,
} from ".";

export type RefineRuntime = "vue" | "react";

export type FlavorItem<
  Name extends RefineComponentName,
  Runtime extends RefineRuntime
> = StylingProps<Runtime> & {
  component: RefineComponent<Name, Runtime>;
};

export type RefineFlavor<Runtime extends RefineRuntime> = {
  group: FlavorItem<"group", Runtime> & {
    wrapper: FlavorItem<"group.wrapper", Runtime>;

    addCriterionButton: FlavorItem<"group.addCriterionButton", Runtime> & {
      text: FlavorItem<"group.addCriterionButton.text", Runtime>;
      icon: FlavorItem<"group.addCriterionButton.icon", Runtime>;
    };
  };

  addGroupButton: FlavorItem<"addGroupButton", Runtime>;

  criterion: FlavorItem<"criterion", Runtime> & {
    removeCriterionButton: FlavorItem<
      "criterion.removeCriterionButton",
      Runtime
    > & {
      errors: FlavorItem<"criterion.removeCriterionButton.errors", Runtime> & {
        error: FlavorItem<
          "criterion.removeCriterionButton.errors.error",
          Runtime
        >;
      };
    };
  };

  condition: FlavorItem<"condition", Runtime>;

  inputs: {
    date: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.date", Runtime>;

      double: FlavorItem<"inputs.date.double", Runtime> & {
        wrapper: FlavorItem<"inputs.date.double.wrapper", Runtime>;
        joiner: FlavorItem<"inputs.date.double.joiner", Runtime>;
      };

      relative: FlavorItem<"inputs.date.relative", Runtime> & {
        wrapper: FlavorItem<"inputs.date.relative.wrapper", Runtime>;
      };

      calendar: FlavorItem<"inputs.date.calendar", Runtime> & {
        icon: FlavorItem<"inputs.date.calendar.icon", Runtime>;
      };

      error: FlavorItem<"inputs.date.error", Runtime> & {
        icon: FlavorItem<"inputs.date.error.icon", Runtime>;
      };
    };

    number: FlavorItem<"inputs.number", Runtime> & {
      double: FlavorItem<"inputs.number.double", Runtime> & {
        wrapper: FlavorItem<"inputs.number.double.wrapper", Runtime>;
        joiner: FlavorItem<"inputs.number.double.joiner", Runtime>;
      };
    };

    text: FlavorItem<"inputs.text", Runtime>;
  };

  /**
   * Used in many places within the query builder, e.g. selecting a condition, selecting a clause.
   */
  select: FlavorItem<"select", Runtime> & {
    wrapper: FlavorItem<"select.wrapper", Runtime>;

    customOptions: FlavorItem<"select.customOptions", Runtime> & {
      wrapper: FlavorItem<"select.customOptions.wrapper", Runtime>;
    };

    listbox: FlavorItem<"select.listbox", Runtime> & {
      wrapper: FlavorItem<"select.listbox.wrapper", Runtime>;

      item: FlavorItem<"select.listbox.item", Runtime> & {
        text: FlavorItem<"select.listbox.item.text", Runtime>;
        icon: FlavorItem<"select.listbox.item.icon", Runtime>;
      };
    };

    button: FlavorItem<"select.button", Runtime> & {
      placeholder: FlavorItem<"select.button.placeholder", Runtime>;
      selected: FlavorItem<"select.button.selected", Runtime>;
      icon: FlavorItem<"select.button.icon", Runtime>;
    };

    multi: FlavorItem<"select.multi", Runtime> & {
      button: FlavorItem<"select.multi.button", Runtime> & {
        placeholder: FlavorItem<"select.multi.button.placeholder", Runtime>;

        selected: FlavorItem<"select.multi.button.selected", Runtime>;

        deselect: FlavorItem<"select.multi.button.deselect", Runtime> & {
          icon: FlavorItem<"select.multi.button.deselect.icon", Runtime> & {
            wrapper: FlavorItem<
              "select.multi.button.deselect.icon.wrapper",
              Runtime
            >;
          };
        };

        icon: FlavorItem<"select.multi.button.icon", Runtime> & {
          wrapper: FlavorItem<"select.multi.button.icon.wrapper", Runtime>;
        };
      };
    };
  };
};

export type VueRefineFlavor = RefineFlavor<"vue">;
export type PartialVueRefineFlavor = DeepPartial<VueRefineFlavor>;

export type ReactRefineFlavor = RefineFlavor<"react">;
export type PartialReactRefineFlavor = DeepPartial<ReactRefineFlavor>;

export type RefineComponentName = ExtractComponentNames<
  RefineFlavor<RefineRuntime>
>;

export type RefineComponent<
  Name extends RefineComponentName,
  Runtime extends RefineRuntime
> = Runtime extends "vue"
  ? RefineVueComponent<Name>
  : Runtime extends "react"
  ? RefineReactComponent<Name>
  : never;
