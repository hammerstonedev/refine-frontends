import React, { Fragment } from "react";
import type { PartialReactRefineFlavor } from "refine-core/types";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { FlavorItem } from "components";

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

    wrapper: {
      className: "refine-query-builder-criterion-wrapper",
    },

    removeCriterionButton: {
      className: "refine-query-builder-criterion-remove-criterion-button",
    },

    errors: {
      className: "refine-query-builder-criterion-errors",

      error: {
        className: "refine-query-builder-criterion-errors-error",
      },
    },
  },

  condition: {
    className: "refine-query-builder-condition",
  },

  select: {
    component: ({ onChange, children, ...props }) => (
      <Listbox onChange={onChange} {...props} as="div">
        <div>{children}</div>
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
          leave="refine-query-builder-select-listbox-transition-leave"
          leaveFrom="refine-query-builder-select-listbox-transition-leave-from"
          leaveTo="refine-query-builder-select-listbox-transition-leave-to"
        >
          <Listbox.Options {...props} />
        </Transition>
      ),
      className: "refine-query-builder-select-listbox",
      wrapper: {},

      item: {
        component: ({ children, className, ...props }) => (
          <Listbox.Option {...props}>
            {({ active, selected }) => (
              <div
                className={[
                  className,
                  active && "refine-query-builder-select-listbox-item-active",
                ]
                  .filter<string>(
                    (className: unknown): className is string =>
                      typeof className === "string"
                  )
                  .join(" ")}
              >
                <FlavorItem<"select.listbox.item.text"> name="select.listbox.item.text">
                  {children}
                </FlavorItem>
                {selected ? (
                  <FlavorItem<"select.listbox.item.icon"> name="select.listbox.item.icon" />
                ) : null}
              </div>
            )}
          </Listbox.Option>
        ),
        className: "refine-query-builder-select-listbox-item",

        text: {
          component: (props) => <span {...props} />,
        },

        icon: {
          component: (props) => (
            <span {...props}>
              <CheckIcon aria-hidden="true" />
            </span>
          ),
          className: "refine-query-builder-select-listbox-item-icon",
        },
      },
    },

    button: {
      component: ({ children, ...props }) => (
        <Listbox.Button {...props}>
          <span>{children}</span>
        </Listbox.Button>
      ),
      className: "refine-query-builder-select-button",

      placeholder: {},

      selected: {},

      icon: {
        component: (props) => (
          <span {...props}>
            <SelectorIcon aria-hidden="true" />
          </span>
        ),
        className: "refine-query-builder-select-button-icon",
      },
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
