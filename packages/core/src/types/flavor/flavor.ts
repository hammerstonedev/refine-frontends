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

    addCriterionButton: StylingProps<Runtime> & {
      component: RefineComponent<"group.addCriterionButton", Runtime>;

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

      icon: {
        component: RefineComponent<
          "criterion.removeCriterionButton.icon",
          Runtime
        >;
      };
    };
  };

  condition: StylingProps<Runtime> & {
    component: RefineComponent<"condition", Runtime>;
  };

  clause: StylingProps<Runtime> & {
    component: RefineComponent<"clause", Runtime>;
  };

  inputs: {
    date: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.date", Runtime>;
    };

    doubleDate: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.doubleDate", Runtime>;
    };

    number: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.number", Runtime>;
    };

    doubleNumber: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.doubleNumber", Runtime>;
    };

    option: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.option", Runtime>;
    };

    relativeDate: StylingProps<Runtime> & {
      component: RefineComponent<"inputs.relativeDate", Runtime>;
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
