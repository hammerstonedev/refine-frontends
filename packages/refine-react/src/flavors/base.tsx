import React from "react";
import type { ReactRefineFlavor } from "refine-core/types";

const baseFlavor: ReactRefineFlavor = {
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

    wrapper: {
      component: (props) => <div {...props} />,
    },

    removeCriterionButton: {
      component: (props) => <button type="button" {...props} />,
    },

    errors: {
      component: (props) => <ul {...props} />,

      error: {
        component: (props) => <li {...props} />,
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
      component: (props) => <input type="date" {...props} />,

      double: {
        component: (props) => <input type="date" {...props} />,

        wrapper: {
          component: (props) => <div {...props} />,
        },

        joiner: {
          component: (props) => <span {...props} />,
        },
      },

      relative: {
        component: (props) => <input type="date" {...props} />,

        wrapper: {
          component: (props) => <div {...props} />,
        },
      },

      calendar: {
        component: (props) => <span>TODO: implement me</span>,

        icon: {
          component: (props) => <span>TODO: implement me</span>,
        },
      },

      error: {
        component: (props) => <span>TODO: implement me</span>,

        icon: {
          component: (props) => <span>TODO: implement me</span>,
        },
      },
    },

    number: {
      component: (props) => <input type="number" {...props} />,

      double: {
        component: (props) => <input type="number" {...props} />,

        wrapper: {
          component: (props) => <div {...props} />,
        },

        joiner: {
          component: (props) => <span {...props} />,
        },
      },
    },

    text: {
      component: (props) => <input type="text" {...props} />,
    },
  },
};

export default baseFlavor;
