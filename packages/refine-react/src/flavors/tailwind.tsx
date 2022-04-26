import React from "react";
import type { PartialReactRefineFlavor } from "refine-core/types";

const inputClassName =
  "w-60 bg-white relative border border-gray-300 rounded-md shadow-sm pl-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

const tailwindFlavor: PartialReactRefineFlavor = {
  group: {
    className: "bg-gray-50 p-4 mb-4 space-y-6 rounded",
    wrapper: {},

    addCriterionButton: {
      className:
        "background-transparent text-blue-600 text-xs flex items-center py-1 px-3 mt-3",
      text: {},
    },
  },

  addGroupButton: {
    className:
      "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  },

  criterion: {
    className: "flex items-center space-x-3",

    removeCriterionButton: {
      className:
        "inline-flex items-center justify-center py-1 px-3 text-gray-500",
    },

    errors: {
      error: {},
    },
  },

  condition: {
    className: "flex space-x-4",
  },

  select: {
    className: inputClassName,

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
      className: inputClassName,

      double: {
        className: inputClassName,

        wrapper: {
          className: "flex items-baseline space-x-3",
        },

        joiner: {},
      },

      relative: {
        className: inputClassName,

        wrapper: {
          className: "flex items-baseline space-x-3",
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
      className: inputClassName,

      double: {
        className: inputClassName,

        wrapper: {
          className: "flex items-baseline space-x-3",
        },

        joiner: {},
      },
    },

    text: {
      className: inputClassName,
    },
  },
};

export default tailwindFlavor;
