const inputBase = 'bg-white relative text-left cursor-default';
const inputFocus = 'focus:outline-none';
const inputSizing = 'pl-3 py-1';
const inputClassName = `${inputBase} ${inputFocus} ${inputSizing}`;

const linearFlavor = {
  emptyGroup: {
    class: '',

    wrapper: {
      class: 'space-y-4',
    },

    addCriterionButton: {
      class: 'flex items-center rounded text-sm text-gray-400 hover:bg-gray-100',

      wrapper: {},

      icon: {
        class: 'h-4 w-4',
      },

      text: {},
    },
  },

  group: {
    class: 'flex flex-wrap items-center gap-y-2',
    wrapper: {
      class: '',
    },

    addCriterionButton: {
      wrapper: {},

      class: 'flex items-center p-1 text-gray-100 hover:bg-gray-100 rounded',

      icon: {
        class: 'h-6 w-6 text-gray-400',
      },

      text: { class: 'hidden' },
    },
  },

  addGroupButton: {
    class: 'hidden px-2 py-1 bg-blue-500 text-white rounded',
  },

  criterion: {
    wrapper: {
      component: 'linear-criterion-row',
      order: ['errors', 'selector', 'remove'],
      class: 'mr-4',
    },
    removeCriterionButton: {
      class: 'px-3 hover:bg-gray-100 text-gray-400 flex items-center justify-center',
      icon: {
        class: 'h-4 w-4',
      },
    },
    errors: {
      class: 'hidden',
      error: {
        class: 'hidden',
      },
    },
  },

  select: {
    class: 'relative sm:inline-block',
    wrapper: {
      class: 'flex items-start',
    },
    customOptions: {
      class: '',
      wrapper: {
        class: 'w-auto pt-4 md:flex md:pt-0',
      },
    },
    listbox: {
      class: (options) => {
        return options.isClosed
          ? 'hidden'
          : 'overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none';
      },

      wrapper: {
        class: 'absolute w-48 z-10 mt-1 bg-white rounded-md shadow-lg',
      },

      item: {
        class: (options) => {
          return `relative py-1 border-b border-gray-100 pl-3 cursor-pointer select-none pr-9 ${
            options.isHighlighted ? 'text-white bg-blue-600' : 'text-gray-900'
          }`;
        },

        text: {
          class: (options) =>
            `block truncate ${options.selected ? 'font-semibold' : 'font-normal'}`,
        },

        icon: {
          class: 'w-5 h-5',
          wrapper: {
            class: (options) =>
              `absolute inset-y-0 right-0 flex items-center pr-4 ${
                !options.isHighlighted ? 'text-blue-600' : 'text-white'
              }`,
          },
        },
      },
    },

    button: {
      class: 'relative w-full py-1 px-3 text-left bg-white cursor-default hover:bg-gray-100',

      placeholder: {
        class: 'block text-gray-300 truncate select-none',
      },

      selected: {
        class: 'block truncate',
      },

      icon: {
        class: 'w-5 h-5 text-gray-300',
        wrapper: {
          class: 'hidden absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
        },
      },
    },

    multi: {
      button: {
        class:
          'relative w-full py-1 pl-3 pr-10 text-left bg-white cursor-default focus:outline-none',

        placeholder: {
          class: 'block text-gray-300 truncate select-none',
        },

        selected: {
          class: 'inline-flex mr-2 ',
        },

        deselect: {
          icon: {
            class: 'hidden w-4 h-4',

            wrapper: {
              class: 'hidden flex items-center ml-1 text-gray-300 cursor-pointer',
            },
          },
        },

        icon: {
          class: 'w-5 h-5 text-gray-300',

          wrapper: {
            class: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
          },
        },
      },
    },
  },

  inputs: {
    date: {
      pickerInput: {
        class: `${inputBase} ${inputFocus} block w-full pl-3 py-1 pr-0`,
      },
      relative: {
        class: `${inputClassName} w-12`,

        wrapper: {
          class: 'flex mr-4',
        },
      },

      double: {
        wrapper: {
          class: 'flex items-center gap-[1ch]',
        },

        joiner: {},
      },
    },

    number: {
      class: `${inputClassName} w-14`,

      double: {
        wrapper: {
          class: 'flex items-center gap-[1ch]',
        },

        joiner: {},
      },
    },

    text: {
      class: inputClassName,
    },
  },
};

export default linearFlavor;
