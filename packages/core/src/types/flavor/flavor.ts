import type {
  StylingProps,
  DeepPartial,
  ExtractComponentNames,
  RefineReactComponent,
  RefineVueComponent,
} from ".";

export type RefineRuntime = "vue" | "react";

export type RefineFlavorItem<
  Name extends RefineComponentName,
  Runtime extends RefineRuntime
> = StylingProps<Runtime> & {
  component: RefineComponent<Name, Runtime>;
};

export type RefineFlavor<Runtime extends RefineRuntime> = {
  group: RefineFlavorItem<"group", Runtime> & {
    wrapper: RefineFlavorItem<"group.wrapper", Runtime>;

    addCriterionButton: RefineFlavorItem<
      "group.addCriterionButton",
      Runtime
    > & {
      text: RefineFlavorItem<"group.addCriterionButton.text", Runtime>;
      icon: RefineFlavorItem<"group.addCriterionButton.icon", Runtime>;
    };
  };

  addGroupButton: RefineFlavorItem<"addGroupButton", Runtime>;

  criterion: RefineFlavorItem<"criterion", Runtime> & {
    removeCriterionButton: RefineFlavorItem<
      "criterion.removeCriterionButton",
      Runtime
    >;

    errors: RefineFlavorItem<"criterion.errors", Runtime> & {
      error: RefineFlavorItem<"criterion.errors.error", Runtime>;
    };
  };

  condition: RefineFlavorItem<"condition", Runtime>;

  inputs: {
    date: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.date", Runtime>;

      double: RefineFlavorItem<"inputs.date.double", Runtime> & {
        wrapper: RefineFlavorItem<"inputs.date.double.wrapper", Runtime>;
        joiner: RefineFlavorItem<"inputs.date.double.joiner", Runtime>;
      };

      relative: RefineFlavorItem<"inputs.date.relative", Runtime> & {
        wrapper: RefineFlavorItem<"inputs.date.relative.wrapper", Runtime>;
      };

      calendar: RefineFlavorItem<"inputs.date.calendar", Runtime> & {
        icon: RefineFlavorItem<"inputs.date.calendar.icon", Runtime>;
      };

      error: RefineFlavorItem<"inputs.date.error", Runtime> & {
        icon: RefineFlavorItem<"inputs.date.error.icon", Runtime>;
      };
    };

    number: RefineFlavorItem<"inputs.number", Runtime> & {
      double: RefineFlavorItem<"inputs.number.double", Runtime> & {
        wrapper: RefineFlavorItem<"inputs.number.double.wrapper", Runtime>;
        joiner: RefineFlavorItem<"inputs.number.double.joiner", Runtime>;
      };
    };

    text: RefineFlavorItem<"inputs.text", Runtime>;
  };

  /**
   * Used in many places within the query builder, e.g. selecting a condition, selecting a clause.
   */
  select: RefineFlavorItem<"select", Runtime> & {
    wrapper: RefineFlavorItem<"select.wrapper", Runtime>;

    customOptions: RefineFlavorItem<"select.customOptions", Runtime> & {
      wrapper: RefineFlavorItem<"select.customOptions.wrapper", Runtime>;
    };

    listbox: RefineFlavorItem<"select.listbox", Runtime> & {
      wrapper: RefineFlavorItem<"select.listbox.wrapper", Runtime>;

      item: RefineFlavorItem<"select.listbox.item", Runtime> & {
        text: RefineFlavorItem<"select.listbox.item.text", Runtime>;
        icon: RefineFlavorItem<"select.listbox.item.icon", Runtime>;
      };
    };

    button: RefineFlavorItem<"select.button", Runtime> & {
      placeholder: RefineFlavorItem<"select.button.placeholder", Runtime>;
      selected: RefineFlavorItem<"select.button.selected", Runtime>;
      icon: RefineFlavorItem<"select.button.icon", Runtime>;
    };

    multi: RefineFlavorItem<"select.multi", Runtime> & {
      button: RefineFlavorItem<"select.multi.button", Runtime> & {
        placeholder: RefineFlavorItem<
          "select.multi.button.placeholder",
          Runtime
        >;

        selected: RefineFlavorItem<"select.multi.button.selected", Runtime>;

        deselect: RefineFlavorItem<"select.multi.button.deselect", Runtime> & {
          icon: RefineFlavorItem<
            "select.multi.button.deselect.icon",
            Runtime
          > & {
            wrapper: RefineFlavorItem<
              "select.multi.button.deselect.icon.wrapper",
              Runtime
            >;
          };
        };

        icon: RefineFlavorItem<"select.multi.button.icon", Runtime> & {
          wrapper: RefineFlavorItem<
            "select.multi.button.icon.wrapper",
            Runtime
          >;
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
