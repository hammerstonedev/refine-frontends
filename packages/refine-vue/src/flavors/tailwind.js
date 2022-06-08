const inputBase =
  'bg-white relative border border-gray-300 rounded-md shadow-sm text-left cursor-default';
const inputFocus = 'focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500';
const inputSizing = 'w-60 pl-3 py-2';

const inputClassName = `${inputBase} ${inputFocus} ${inputSizing}`;

const tailwindFlavor = {
  emptyGroup: {
    class: '',

    wrapper: {
      class: 'space-y-4',
    },

    addCriterionButton: {
      class: 'flex items-center rounded text-sm text-gray-600',

      wrapper: {},

      icon: {
        class: 'h-4 w-4',
      },

      text: {},
    },
  },

  group: {
    class: 'flex flex-col gap-4 bg-gray-100 px-4 py-8 rounded-lg border-l-4',
    wrapper: {
      class: 'space-y-4',
    },

    addCriterionButton: {
      wrapper: {},

      class: 'flex items-center rounded text-sm text-gray-600',

      icon: {
        class: 'h-4 w-4',
      },

      text: {},
    },
  },

  addGroupButton: {
    class: 'px-2 py-1 bg-blue-500 text-white rounded',
  },

  criterion: {
    wrapper: {
      order: ['errors', 'selector', 'remove'],
      class: 'flex flex-wrap gap-x-2 gap-y-4',
    },
    removeCriterionButton: {
      class:
        'rounded-full bg-gray-200 w-10 h-10 text-gray-600 flex items-center justify-center ml-auto',
      icon: {
        class: 'h-5 w-5',
      },
    },
    errors: {
      class:
        'flex-1 basis-full bg-red-50 border-l-2 border-red-600 text-red-300 px-4 py-2 rounded list-disc list-inside',
      error: {
        class: 'text-red-600 font-semibold',
      },
    },
  },

  select: {
    class: 'relative sm:inline-block w-60',
    wrapper: {
      class: 'flex items-start gap-4',
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
        class: 'absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg',
      },

      item: {
        class: (options) => {
          return `relative py-2 pl-3 cursor-pointer select-none pr-9 ${
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
      class:
        'relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default; focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',

      placeholder: {
        class: 'block text-gray-300 truncate select-none',
      },

      selected: {
        class: 'block truncate',
      },

      icon: {
        class: 'w-5 h-5 text-gray-400',
        wrapper: {
          class: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
        },
      },
    },

    multi: {
      button: {
        class:
          'relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',

        placeholder: {
          class: 'block text-gray-300 truncate select-none',
        },

        selected: {
          class: 'inline-flex p-1 mr-1 border border-gray-300 rounded',
        },

        deselect: {
          icon: {
            class: 'w-4 h-4',

            wrapper: {
              class: 'flex items-center ml-1 text-gray-500 cursor-pointer',
            },
          },
        },

        icon: {
          class: 'w-5 h-5 text-gray-400',

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
        class: `${inputBase} ${inputFocus} block w-full pl-3 py-2 pr-0`,
      },
      relative: {
        class: `${inputClassName} mr-4`,

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
      class: inputClassName,

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

export default tailwindFlavor;
