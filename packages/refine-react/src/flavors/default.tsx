import type { ReactRefineFlavor } from "refine-core/types";

export const defaultFlavor: ReactRefineFlavor = {
  group: {
    component: (props) => <div {...props} />,

    /**
     * TODO: Not used in React implementation.
     */
    wrapper: {
      component: (props) => null,
    },

    addCriterionButton: {
      component: (props) => <button type="button" {...props} />,
      icon: {
        component: (props) => <span {...props} />,
      },
      text: {
        component: (props) => <span {...props} />,
      },
    },
  },

  addGroupButton: {
    component: (props) => <button type="button" {...props} />,
  },

  criterion: {
    component: (props) => <div {...props} />,

    removeCriterionButton: {
      component: (props) => <button type="button" {...props} />,
    },

    /**
     * TODO: Not used in React implementation.
     */
    errors: {
      component: (props) => null,

      /**
       * TODO: Not used in React implementation.
       */
      error: {
        component: (props) => null,
      },
    },
  },

  condition: {
    component: (props) => <div {...props} />,
  },

  select: {
    component: (props) => <select {...props} />,

    wrapper: {
      component: (props) => <div {...props} />,
    },

    /**
     * TODO: Not used in React implementation.
     */
    customOptions: {
      component: (props) => null,

      /**
       * TODO: Not used in React implementation.
       */
      wrapper: {
        component: (props) => null,
      },
    },

    /**
     * TODO: Not used in React implementation.
     */
    listbox: {
      component: (props) => null,

      /**
       * TODO: Not used in React implementation.
       */
      wrapper: {
        component: (props) => null,
      },

      /**
       * TODO: Not used in React implementation.
       */
      item: {
        component: (props) => null,

        /**
         * TODO: Not used in React implementation.
         */
        text: {
          component: (props) => null,
        },

        /**
         * TODO: Not used in React implementation.
         */
        icon: {
          component: (props) => null,
        },
      },
    },

    /**
     * TODO: Not used in React implementation.
     */
    button: {
      component: (props) => null,

      /**
       * TODO: Not used in React implementation.
       */
      placeholder: {
        component: (props) => null,
      },

      /**
       * TODO: Not used in React implementation.
       */
      selected: {
        component: (props) => null,
      },

      /**
       * TODO: Not used in React implementation.
       */
      icon: {
        component: (props) => null,
      },
    },

    /**
     * TODO: Not used in React implementation.
     */
    multi: {
      component: (props) => null,

      /**
       * TODO: Not used in React implementation.
       */
      button: {
        component: (props) => null,

        /**
         * TODO: Not used in React implementation.
         */
        placeholder: {
          component: (props) => null,
        },

        /**
         * TODO: Not used in React implementation.
         */
        selected: {
          component: (props) => null,
        },

        /**
         * TODO: Not used in React implementation.
         */
        deselect: {
          component: (props) => null,

          /**
           * TODO: Not used in React implementation.
           */
          icon: {
            component: (props) => null,

            /**
             * TODO: Not used in React implementation.
             */
            wrapper: {
              component: (props) => null,
            },
          },
        },

        /**
         * TODO: Not used in React implementation.
         */
        icon: {
          component: (props) => null,

          /**
           * TODO: Not used in React implementation.
           */
          wrapper: {
            component: (props) => null,
          },
        },
      },
    },
  },

  inputs: {
    date: {
      component: (props) => <input type="datetime-local" {...props} />,

      double: {
        component: (props) => <span>implement me</span>,

        wrapper: {
          component: (props) => <span>implement me</span>,
        },

        joiner: {
          component: (props) => <span>implement me</span>,
        },
      },

      relative: {
        component: (props) => <span>implement me</span>,

        wrapper: {
          component: (props) => <span>implement me</span>,
        },
      },

      calendar: {
        component: (props) => <span>implement me</span>,

        icon: {
          component: (props) => <span>implement me</span>,
        },
      },

      error: {
        component: (props) => <span>implement me</span>,

        icon: {
          component: (props) => <span>implement me</span>,
        },
      },
    },

    number: {
      component: (props) => <input type="number" {...props} />,

      double: {
        component: (props) => <span>implement me</span>,

        wrapper: {
          component: (props) => <span>implement me</span>,
        },

        joiner: {
          component: (props) => <span>implement me</span>,
        },
      },
    },

    text: {
      component: (props) => <input type="text" {...props} />,
    },
  },
};
