import React from "react";
import type { PartialReactRefineFlavor } from "refine-core/types";

const tailwindFlavor: PartialReactRefineFlavor = {
  group: {
    className: "refine-query-builder-group",
    wrapper: {},

    addCriterionButton: {
      className: "refine-query-builder-group-add-criterion-button",
      text: {},
    },
  },

  addGroupButton: {
    className: "refine-query-builder-add-group-button",
  },

  criterion: {
    className: "refine-query-builder-criterion",

    removeCriterionButton: {
      className: "refine-query-builder-criterion-remove-criterion-button",
    },

    errors: {
      error: {},
    },
  },

  condition: {
    className: "refine-query-builder-condition",
  },

  select: {
    className: "refine-query-builder-select",

    wrapper: {},

    customOptions: {
      wrapper: {},
    },

    listbox: {
      wrapper: {},

      item: {
        text: {},

        icon: {},
      },
    },

    button: {
      placeholder: {},

      selected: {},

      icon: {},
    },

    multi: {
      button: {
        placeholder: {},

        selected: {},

        deselect: {
          icon: {
            wrapper: {},
          },
        },

        icon: {
          wrapper: {},
        },
      },
    },
  },

  inputs: {
    date: {
      className: "refine-query-builder-inputs-date",

      double: {
        className: "refine-query-builder-inputs-date-double",

        wrapper: {
          className: "refine-query-builder-inputs-date-double-wrapper",
        },

        joiner: {},
      },

      relative: {
        className: "refine-query-builder-inputs-date-relative",

        wrapper: {
          className: "refine-query-builder-inputs-date-relative-wrapper",
        },
      },

      calendar: {
        icon: {},
      },

      error: {
        icon: {},
      },
    },

    number: {
      className: "refine-query-builder-inputs-number",

      double: {
        className: "refine-query-builder-inputs-number-double",

        wrapper: {
          className: "refine-query-builder-inputs-number-double-wrapper",
        },

        joiner: {},
      },
    },

    text: {
      className: "refine-query-builder-inputs-text",
    },
  },
};

export default tailwindFlavor;
