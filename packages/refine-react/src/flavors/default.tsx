import React, { Fragment } from "react";
import type { PartialReactRefineFlavor } from "refine-core/types";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

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
    component: ({ onChange, children, ...props }) => (
      <Listbox
        onChange={(value) =>
          onChange({
            target: {
              value,
            },
          })
        }
        {...props}
        as="div"
      >
        <div className="relative">{children}</div>
      </Listbox>
    ),
    className: "refine-query-builder-select",

    wrapper: {},

    customOptions: {
      wrapper: {},
    },

    listbox: {
      component: (props) => (
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options {...props} />
        </Transition>
      ),
      className:
        "z-10 focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm",
      wrapper: {},

      item: {
        component: ({ children, ...props }) => (
          <Listbox.Option
            {...props}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
              }`
            }
          >
            {({ selected }) => (
              <>
                <span
                  className={`block truncate ${
                    selected ? "font-medium" : "font-normal"
                  }`}
                >
                  {children}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
        ),
        text: {},

        icon: {},
      },
    },

    button: {
      component: ({ children, ...props }) => (
        <Listbox.Button {...props}>
          <span className="block truncate">{children}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
      ),
      className: "refine-query-builder-select-button",
      // className:
      //   "focus:outline-none relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",

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
