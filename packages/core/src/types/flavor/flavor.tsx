import type {
  ClassOrClassName,
  DeepPartial,
  ExtractComponentNames,
  RefineReactComponent,
  RefineVueComponent,
} from ".";

export type RefineRuntime = "vue" | "react";

export type RefineFlavor<Runtime extends RefineRuntime> = {
  group: ClassOrClassName<Runtime> & {
    component: RefineComponent<"group", Runtime>;

    addCriterionButton: ClassOrClassName<Runtime> & {
      component: RefineComponent<"group.addCriterionButton", Runtime>;

      icon: ClassOrClassName<Runtime> & {
        component: RefineComponent<"group.addCriterionButton.icon", Runtime>;
      };
    };
  };

  addGroupButton: ClassOrClassName<Runtime> & {
    component: RefineComponent<"addGroupButton", Runtime>;
  };

  criterion: ClassOrClassName<Runtime> & {
    component: RefineComponent<"criterion", Runtime>;

    removeCriterionButton: ClassOrClassName<Runtime> & {
      component: RefineComponent<"criterion.removeCriterionButton", Runtime>;

      icon: {
        component: RefineComponent<
          "criterion.removeCriterionButton.icon",
          Runtime
        >;
      };
    };
  };

  condition: ClassOrClassName<Runtime> & {
    component: RefineComponent<"condition", Runtime>;
  };

  clause: ClassOrClassName<Runtime> & {
    component: RefineComponent<"clause", Runtime>;
  };

  inputs: {
    date: ClassOrClassName<Runtime> & {
      component: RefineComponent<"inputs.date", Runtime>;
    };

    doubleDate: ClassOrClassName<Runtime> & {
      component: RefineComponent<"inputs.doubleDate", Runtime>;
    };

    number: ClassOrClassName<Runtime> & {
      component: RefineComponent<"inputs.number", Runtime>;
    };

    doubleNumber: ClassOrClassName<Runtime> & {
      component: RefineComponent<"inputs.doubleNumber", Runtime>;
    };

    option: ClassOrClassName<Runtime> & {
      component: RefineComponent<"inputs.option", Runtime>;
    };

    relativeDate: ClassOrClassName<Runtime> & {
      component: RefineComponent<"inputs.relativeDate", Runtime>;
    };

    text: ClassOrClassName<Runtime> & {
      component: RefineComponent<"inputs.text", Runtime>;
    };
  };

  /**
   * Used in many places within the query builder, e.g. selecting a condition, selecting a clause.
   */
  select: ClassOrClassName<Runtime> & {
    component: RefineComponent<"select", Runtime>;
  };
};

export type AllVueRefineFlavor = RefineFlavor<"vue">;
export type VueRefineFlavor = DeepPartial<AllVueRefineFlavor>;

export type AllReactRefineFlavor = RefineFlavor<"react">;
export type ReactRefineFlavor = DeepPartial<AllReactRefineFlavor>;

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
