import type {
  StylingProps,
  DeepPartial,
  ExtractComponentNames,
  RefineReactComponent,
  RefineVueComponent,
} from ".";

export type RefineRuntime = "vue" | "react";

export type RefineFlavor<Runtime extends RefineRuntime> = {
  group: StylingProps<Runtime> & {
    component: RefineComponent<"group", Runtime>;

    wrapper: StylingProps<Runtime> & {
      component: RefineComponent<"group.wrapper", Runtime>;
    };

    addCriterionButton: StylingProps<Runtime> & {
      component: RefineComponent<"group.addCriterionButton", Runtime>;

      text: StylingProps<Runtime> & {
        component: RefineComponent<"group.addCriterionButton.text", Runtime>;
      };

      icon: StylingProps<Runtime> & {
        component: RefineComponent<"group.addCriterionButton.icon", Runtime>;
      };
    };
  };

  addGroupButton: StylingProps<Runtime> & {
    component: RefineComponent<"addGroupButton", Runtime>;
  };

  criterion: StylingProps<Runtime> & {
    component: RefineComponent<"criterion", Runtime>;

    removeCriterionButton: StylingProps<Runtime> & {
      component: RefineComponent<"criterion.removeCriterionButton", Runtime>;

      errors: StylingProps<Runtime> & {
        component: RefineComponent<
          "criterion.removeCriterionButton.errors",
          Runtime
        >;

        error: StylingProps<Runtime> & {
          component: RefineComponent<
            "criterion.removeCriterionButton.errors.error",
            Runtime
          >;
        };
      };
    };
  };

  condition: StylingProps<Runtime> & {
    component: RefineComponent<"condition", Runtime>;
  };

  inputs: {
    date: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.date", Runtime>;

      double: StylingProps<Runtime> & {
        component: RefineComponent<"inputs.date.double", Runtime>;

        wrapper: StylingProps<Runtime> & {
          component: RefineComponent<"inputs.date.double.wrapper", Runtime>;
        };

        joiner: StylingProps<Runtime> & {
          component: RefineComponent<"inputs.date.double.joiner", Runtime>;
        };
      };

      relative: StylingProps<Runtime> & {
        component: RefineComponent<"inputs.date.relative", Runtime>;

        wrapper: StylingProps<Runtime> & {
          component: RefineComponent<"inputs.date.relative.wrapper", Runtime>;
        };
      };

      calendar: StylingProps<Runtime> & {
        component: RefineComponent<"inputs.date.calendar", Runtime>;

        icon: StylingProps<Runtime> & {
          component: RefineComponent<"inputs.date.calendar.icon", Runtime>;
        };
      };

      error: StylingProps<Runtime> & {
        component: RefineComponent<"inputs.date.error", Runtime>;

        icon: StylingProps<Runtime> & {
          component: RefineComponent<"inputs.date.error.icon", Runtime>;
        };
      };
    };

    number: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.number", Runtime>;

      double: StylingProps<Runtime> & {
        component: RefineComponent<"inputs.number.double", Runtime>;

        wrapper: StylingProps<Runtime> & {
          component: RefineComponent<"inputs.number.double.wrapper", Runtime>;
        };

        joiner: StylingProps<Runtime> & {
          component: RefineComponent<"inputs.number.double.joiner", Runtime>;
        };
      };
    };

    text: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.text", Runtime>;
    };
  };

  /**
   * Used in many places within the query builder, e.g. selecting a condition, selecting a clause.
   */
  select: StylingProps<Runtime> & {
    component: RefineComponent<"select", Runtime>;

    wrapper: StylingProps<Runtime> & {
      component: RefineComponent<"select.wrapper", Runtime>;
    };

    customOptions: StylingProps<Runtime> & {
      wrapper: StylingProps<Runtime> & {
        component: RefineComponent<"select.customOptions.wrapper", Runtime>;
      };
    };

    listbox: StylingProps<Runtime> & {
      component: RefineComponent<"select.listbox", Runtime>;

      wrapper: StylingProps<Runtime> & {
        component: RefineComponent<"select.listbox.wrapper", Runtime>;
      };

      item: StylingProps<Runtime> & {
        component: RefineComponent<"select.listbox.item", Runtime>;

        text: StylingProps<Runtime> & {
          component: RefineComponent<"select.listbox.item.text", Runtime>;
        };

        icon: StylingProps<Runtime> & {
          component: RefineComponent<"select.listbox.item.icon", Runtime>;
        };
      };
    };

    button: StylingProps<Runtime> & {
      component: RefineComponent<"select.button", Runtime>;

      placeholder: StylingProps<Runtime> & {
        component: RefineComponent<"select.button.placeholder", Runtime>;
      };

      selected: StylingProps<Runtime> & {
        component: RefineComponent<"select.button.selected", Runtime>;
      };

      icon: StylingProps<Runtime> & {
        component: RefineComponent<"select.button.icon", Runtime>;
      };
    };

    multi: StylingProps<Runtime> & {
      component: RefineComponent<"select.multi", Runtime>;

      button: StylingProps<Runtime> & {
        component: RefineComponent<"select.multi.button", Runtime>;

        placeholder: StylingProps<Runtime> & {
          component: RefineComponent<
            "select.multi.button.placeholder",
            Runtime
          >;
        };

        selected: StylingProps<Runtime> & {
          component: RefineComponent<"select.multi.button.selected", Runtime>;
        };

        deslect: {
          component: RefineComponent<"select.multi.button.deslect", Runtime>;

          icon: StylingProps<Runtime> & {
            component: RefineComponent<
              "select.multi.button.deslect.icon",
              Runtime
            >;

            wrapper: StylingProps<Runtime> & {
              component: RefineComponent<
                "select.multi.button.deslect.icon.wrapper",
                Runtime
              >;
            };
          };
        };

        icon: StylingProps<Runtime> & {
          component: RefineComponent<"select.multi.button.icon", Runtime>;

          wrapper: StylingProps<Runtime> & {
            component: RefineComponent<
              "select.multi.button.icon.wrapper",
              Runtime
            >;
          };
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
