import { reactive, nextTick, inject, provide, onUnmounted } from 'vue-demi';

function ClickAway () {
    const handlers = {};
    return {
        // directive definition
        bind(el, binding) {
            const {value: handleClick} = binding;

            if (typeof (handleClick) !== 'function') {
                throw new Error('The click-away directive expects a function/method as an argument.');
            }

            if (!el.id) {
                throw new Error('The click-away directive requires the element it is bound to to have an id.');
            }

            const handler = (e) => {
                if (!(el.contains(e.target))) {
                    handleClick();
                }
            };

            handlers[el.id] = handler;

            document.addEventListener('click', handler);
            document.addEventListener('touchstart', handler);
        },
        unbind(el) {
            document.removeEventListener('click', handlers[el.id]);
            document.removeEventListener('touchstart', handlers[el.id]);
            delete handlers[el.id];
        },
    }
}

class Selector {
  constructor() {
    this.options = [];
    this.selectedOptions = [];
  }

  registerOption(newOption) {
    const { id: optionId } = newOption;
    for (var i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      if (currentOption.id === optionId) {
        throw new Error('An option with id ${optionId} has already been registered for this selector.');
      }
    }

    const previousOption = this.options[this.options.length - 1] || null;

    const currentOption = {
      previousOption,
      nextOption: null,
      ...newOption,
    };

    if (previousOption) {
      previousOption.nextOption = currentOption;
    }

    this.options.push(currentOption);
  }

  isSelected(optionId) {
    let isSelected = false;
    this.selectedOptions.forEach((option) => {
      if (option.id === optionId) {
        isSelected = true;
      }
    });
    return isSelected;
  }

  findOption(optionId) {
    for (var i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      if (currentOption.id === optionId) {
        return currentOption;
      }
    }
    return null;
  }

  toggleOption(optionId) {
    if (this.isSelected(optionId)) {
      return this.deselectOption(optionId);
    } else {
      return this.selectOption(optionId);
    }
  }

  clearSelectedOptions() {
    this.selectedOptions.splice(0, this.selectedOptions.length);
  }

  deselectOption(optionId) {
    const deselectedOption = this.findOption(optionId);

    this.selectedOptions = this.selectedOptions.filter((option) => {
      return option.id !== optionId;
    });

    return { deselectedOption, selectedOptions: this.selectedOptions };
  }

  selectOption(optionId) {
    const selectedOption = this.findOption(optionId);

    if (!this.isSelected(optionId)) {
      this.selectedOptions.push(selectedOption);
    }

    return { 
      selectedOption, 
      selectedOptions: this.selectedOptions,
    };
  }
}

var script$h = {
  name: "renderless-selector",
  data() {
    return {
      selector: reactive(new Selector()),
      isClosed: true,
      highlightedOption: null,
    };
  },
  provide() {
    return {
      selector: this.selector,
    };
  },
  computed: {
    selectedOptions() {
      return this.selector.selectedOptions;
    },
    firstSelectedOption() {
      return this.selectedOptions[0] || this.selector.options[0];
    },
    isOpen() {
      return !this.isClosed;
    },
    actions: function () {
      const {
        clearOptions,
        close,
        highlightNextOption,
        highlightPreviousOption,
        highlightOption,
        open,
        selectOption,
        selectedOptions,
        toggle,
        toggleOption,
      } = this;

      return {
        clearOptions,
        close,
        highlightNextOption,
        highlightPreviousOption,
        highlightOption,
        open,
        selectOption,
        selectedOptions,
        toggle,
        toggleOption,
      };
    },
    state: function () {
      const { isClosed, isOpen, selectedOptions, highlightedOption } = this;

      return {
        isClosed,
        isOpen,
        selectedOptions,
        highlightedOption,
        options: this.selector.options,
      };
    },
  },
  methods: {
    nextTick() {
      return nextTick().then(() => {
        return {
          actions: this.actions,
          ...this.state,
        };
      });
    },
    close() {
      if (!this.isClosed) {
        this.isClosed = true;
      }
      return this.nextTick();
    },
    open() {
      this.isClosed = false;
      this.highlightedOption = this.firstSelectedOption;
      return this.nextTick();
    },
    toggle() {
      if (this.isClosed) {
        this.open();
      } else {
        this.close();
      }
      return this.nextTick();
    },
    toggleOption(optionId) {
      const { selector, highlightOption } = this;
      const { 
        selectedOption, 
         } = selector.toggleOption(optionId);
      if (selectedOption) {
        this.selectOption(optionId);
      } else {
        this.deselectOption(optionId);
      }
      return highlightOption(selector.findOption(optionId));
    },
    clearOptions(){
      this.selector.clearSelectedOptions();
    },
    deselectOption(optionId) {
      this.$emit("deselect-option", this.selector.deselectOption(optionId));
    },
    selectOption(optionId) {
      this.$emit("select-option", this.selector.selectOption(optionId));
    },
    highlightOption(option) {
      this.highlightedOption = option;
      return this.nextTick();
    },
    highlightNextOption() {
      const nextOption = this.highlightedOption?.nextOption;

      if (nextOption) {
        this.highlightedOption = nextOption;
      }
      return this.nextTick();
    },
    highlightPreviousOption() {
      const previousOption = this.highlightedOption?.previousOption;
      if (previousOption) {
        this.highlightedOption = previousOption;
      }
      return this.nextTick();
    },
  },
  render() {
    const defaultSlot = this.$scopedSlots?.default || this.$slots?.default;

    if (defaultSlot) {
      return defaultSlot({
        actions: this.actions,
        ...this.state,
      });
    }
    return null;
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__$h = script$h;

/* template */

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$h = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    undefined,
    undefined,
    undefined
  );

const optionProps = {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    display: {
      type: String,
      required: false,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};

let uid$1 = 1;

var uid$2 = {
  beforeCreate() {
    this.uid = uid$1.toString();
    uid$1 = uid$1 + 1;
  },
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$g = {
  name: 'selector-button',
  props: {
    id: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
  },
  methods: {
    label: function() {
     return this.display ? `${this.display} Selected` : 'Choose an option'
    },
    focus: function() {
      this.$refs.button.focus();
    },
  },
};

/* script */
const __vue_script__$g = script$g;

/* template */
var __vue_render__$f = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      ref: "button",
      staticClass: "refine-selector-button",
      attrs: {
        id: _vm.id,
        type: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": _vm.isOpen,
        "aria-label": _vm.label(),
      },
      on: {
        click: function ($event) {
          $event.preventDefault();
          return _vm.$emit("toggle")
        },
        keydown: function ($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k(
              $event.keyCode,
              "arrow-down",
              undefined,
              $event.key,
              undefined
            )
          ) {
            return null
          }
          $event.stopPropagation();
          $event.preventDefault();
          return _vm.$emit("open")
        },
      },
    },
    [
      _vm.display.length === 0
        ? _c("span", { staticClass: "refine-selector-button-placeholder" }, [
            _vm._v("\n    Choose an option\n  "),
          ])
        : _c("span", { staticClass: "refine-selector-button-selected" }, [
            _vm._v("\n    " + _vm._s(_vm.display) + "\n  "),
          ]),
      _vm._v(" "),
      _c("span", { staticClass: "refine-selector-button-icon-wrapper" }, [
        _c(
          "svg",
          {
            staticClass: "refine-selector-button-icon",
            attrs: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
            },
          },
          [
            _c("path", {
              attrs: {
                "fill-rule": "evenodd",
                d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
                "clip-rule": "evenodd",
              },
            }),
          ]
        ),
      ]),
    ]
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$f = {
  name: 'selector-listbox',
  mixins: [uid$2],
  props: {
    isClosed: {
      type: Boolean,
      required: false,
      default: true,
    },
    selectedOption: {
      type: Object,
      required: false,
    },
  },
  methods: {
    focus: function() {
      this.$refs.listBox.focus();
    },
    createItemId: function(optionId) {
      return `listbox-option-${this.uid}-${optionId}`
    },
  },
};

/* script */
const __vue_script__$f = script$f;

/* template */
var __vue_render__$e = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "refine-selector-listbox-wrapper" }, [
    _c(
      "ul",
      {
        ref: "listBox",
        staticClass: "refine-selector-listbox",
        class: { "refine-selector-listbox-hidden": _vm.isClosed },
        attrs: {
          tabindex: "-1",
          role: "listbox",
          "aria-activedescendant": _vm.selectedOption
            ? _vm.createItemId(_vm.selectedOption.id)
            : "",
        },
        on: {
          keydown: [
            function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k(
                  $event.keyCode,
                  "arrow-down",
                  undefined,
                  $event.key,
                  undefined
                )
              ) {
                return null
              }
              $event.stopPropagation();
              $event.preventDefault();
              return _vm.$emit("highlight-next-option")
            },
            function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k(
                  $event.keyCode,
                  "arrow-up",
                  undefined,
                  $event.key,
                  undefined
                )
              ) {
                return null
              }
              $event.stopPropagation();
              $event.preventDefault();
              return _vm.$emit("highlight-previous-option")
            },
            function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              $event.stopPropagation();
              $event.preventDefault();
              return _vm.$emit("select-option")
            },
            function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k(
                  $event.keyCode,
                  "escape",
                  undefined,
                  $event.key,
                  undefined
                )
              ) {
                return null
              }
              $event.stopPropagation();
              $event.preventDefault();
              return _vm.$emit("close")
            },
            function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
              ) {
                return null
              }
              $event.stopPropagation();
              $event.preventDefault();
              return _vm.$emit("close")
            },
          ],
        },
      },
      [_vm._t("default", null, { createItemId: _vm.createItemId })],
      2
    ),
  ])
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$e = {
  name: 'selector-list-item',
  props: {
    optionId: {
      type: [String, Number],
      required: true,
    },
    optionDisplay: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    isHighlighted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    scrollIntoView: function() {
      this.$refs.listItem.scrollIntoView(false);
    },
  },
};

/* script */
const __vue_script__$e = script$e;

/* template */
var __vue_render__$d = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "li",
    {
      key: _vm.optionId,
      ref: "listItem",
      staticClass: "refine-selector-list-item",
      class: { "refine-selector-list-item-highlighted": _vm.isHighlighted },
      attrs: {
        role: "option",
        "aria-label": _vm.optionDisplay,
        "aria-selected": _vm.selected,
      },
      on: {
        mouseenter: function ($event) {
          return _vm.$emit("mouseenter")
        },
        mouseleave: function ($event) {
          return _vm.$emit("mouseleave")
        },
      },
    },
    [
      _c(
        "span",
        {
          staticClass: "refine-selector-list-item-text",
          class: { "refine-selector-list-item-text-selected": _vm.selected },
        },
        [_vm._v("\n    " + _vm._s(_vm.optionDisplay) + "\n  ")]
      ),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "refine-selector-list-item-icon-wrapper",
          class: {
            "refine-selector-list-item-icon-wrapper-highlighted":
              !_vm.isHighlighted,
          },
        },
        [
          _c(
            "svg",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.selected,
                  expression: "selected",
                },
              ],
              staticClass: "refine-selector-list-item-icon",
              attrs: {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": !_vm.selected,
              },
            },
            [
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                  "clip-rule": "evenodd",
                },
              }),
            ]
          ),
        ]
      ),
    ]
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$d = {
  name: 'multi-selector-button',
  props: {
    id: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    selectedOptions: {
        type: Array,
        required: true,
    },
  },
  methods: {
    label: function() {
      const combinedOptions = this.selectedOptions.
      map(({ display }) => display).
      join(', ');
      const labelText = `${combinedOptions} Selected`;
      
      return this.selectedOptions.length === 0 ? 'Choose an option' : labelText;
    },
    focus: function() {
      this.$refs.button.focus();
    },
  },
};

/* script */
const __vue_script__$d = script$d;

/* template */
var __vue_render__$c = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "button",
      staticClass: "refine-multi-selector-button",
      attrs: {
        id: _vm.id,
        "aria-haspopup": "listbox",
        "aria-label": _vm.label(),
        "aria-expanded": _vm.isOpen,
        tabindex: "0",
      },
      on: {
        click: function ($event) {
          $event.preventDefault();
          return _vm.$emit("toggle")
        },
        keydown: [
          function ($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            $event.stopPropagation();
            $event.preventDefault();
            return _vm.$emit("open")
          },
          function ($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k(
                $event.keyCode,
                "arrow-down",
                undefined,
                $event.key,
                undefined
              )
            ) {
              return null
            }
            $event.stopPropagation();
            $event.preventDefault();
            return _vm.$emit("open")
          },
        ],
      },
    },
    [
      _vm.selectedOptions.length === 0
        ? _c(
            "span",
            { staticClass: "refine-multi-selector-button-placeholder" },
            [_vm._v("\n    Choose an option\n  ")]
          )
        : _vm._l(_vm.selectedOptions, function (ref) {
            var id = ref.id;
            var display = ref.display;
            return _c(
              "span",
              { key: id, staticClass: "refine-multi-selector-button-selected" },
              [
                _vm._v("\n    " + _vm._s(display) + "\n    "),
                _c(
                  "span",
                  {
                    staticClass:
                      "refine-multi-selector-button-deselect-icon-wrapper",
                    on: {
                      click: function ($event) {
                        $event.preventDefault();
                        return _vm.$emit("deselect-option", id)
                      },
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        staticClass:
                          "refine-multi-selector-button-deselect-icon",
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                        },
                      },
                      [
                        _c("path", {
                          attrs: {
                            "fill-rule": "evenodd",
                            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                            "clip-rule": "evenodd",
                          },
                        }),
                      ]
                    ),
                  ]
                ),
              ]
            )
          }),
      _vm._v(" "),
      _c("span", { staticClass: "refine-multi-selector-button-icon-wrapper" }, [
        _c(
          "svg",
          {
            staticClass: "refine-multi-selector-button-icon",
            attrs: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
            },
          },
          [
            _c("path", {
              attrs: {
                "fill-rule": "evenodd",
                d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
                "clip-rule": "evenodd",
              },
            }),
          ]
        ),
      ]),
    ],
    2
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$c = {
  name: "selector",
  mixins: [uid$2],
  inject: ['builderModeActive'],
  props: {
    isMultiSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    innerClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    selectorId() {
      return this.uid;
    },
    buttonId() {
      return `button-${this.selectorId}`;
    },
  },
  mounted() {
    if (this.builderModeActive) {
      this.$refs.button.focus();
    }
  },
  directives: {
    clickAway: new ClickAway()
  },
  methods: {
    isSelected(option, selectedOptions) {
      let selected = false;

      selectedOptions.forEach((selectedOption) => {
        if (option.id === selectedOption.id) {
          selected = true;
        }
      });

      return selected;
    },
    deselectOption(optionId, { toggleOption }) {
      toggleOption(optionId);
    },
    async selectOption(optionId, actions) {
      const { clearOptions, selectOption, toggleOption } = actions;
      const { isMultiSelect } = this;
      
      if (isMultiSelect) {
        toggleOption(optionId);
      } else {
        clearOptions();
        selectOption(optionId);
        this.close(actions);
      }
    },
    scrollIntoView(optionId) {
      if (optionId) {
        const listItem = this.$refs[optionId][0];
        listItem.scrollIntoView();
      }
    },
    async close({ close }) {
      const { isClosed } = await close();
      if (isClosed) { 
        this.$refs.button?.focus();
      }
    },
    async open({ open }) {
      const { selectedOption } = await open();
      this.$refs.listBox.focus();
      this.scrollIntoView(selectedOption?.id);
    },
    async toggle({ toggle }) {
      const { isOpen, selectedOption } = await toggle();

      if (isOpen) {
        this.$refs.listBox.focus();
        this.scrollIntoView(selectedOption?.id);
      } else {
        this.$refs.button.focus();
      }
    },
    async highlightNextOption({ highlightNextOption }) {
      const { highlightedOption } = await highlightNextOption();
      this.scrollIntoView(highlightedOption?.id);
    },
    async highlightPreviousOption({ highlightPreviousOption }) {
      const { highlightedOption } = await highlightPreviousOption();
      this.scrollIntoView(highlightedOption?.id);
    },
  },
  components: {
    MultiSelectorButton: __vue_component__$d,
    RenderlessSelector: __vue_component__$h,
    SelectorListItem: __vue_component__$e,
    SelectorButton: __vue_component__$g,
    SelectorListbox: __vue_component__$f,
  },
};

/* script */
const __vue_script__$c = script$c;

/* template */
var __vue_render__$b = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("renderless-selector", {
        on: {
          "select-option": function ($event) {
            return _vm.$emit("select-option", $event)
          },
          "deselect-option": function ($event) {
            return _vm.$emit("deselect-option", $event)
          },
        },
        scopedSlots: _vm._u(
          [
            {
              key: "default",
              fn: function (ref) {
                var actions = ref.actions;
                var isOpen = ref.isOpen;
                var isClosed = ref.isClosed;
                var selectedOptions = ref.selectedOptions;
                var highlightedOption = ref.highlightedOption;
                var options = ref.options;
                return [
                  _c("div", { staticClass: "refine-selector-wrapper" }, [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "click-away",
                            rawName: "v-click-away",
                            value: actions.close,
                            expression: "actions.close",
                          },
                        ],
                        staticClass: "refine-selector",
                        class: _vm.innerClass,
                        attrs: {
                          id: "listbox-" + _vm.selectorId,
                          "aria-labelledby": _vm.buttonId,
                        },
                      },
                      [
                        _vm.isMultiSelect
                          ? _c("multi-selector-button", {
                              ref: "button",
                              attrs: {
                                id: _vm.buttonId,
                                isOpen: isOpen,
                                selectedOptions: selectedOptions,
                              },
                              on: {
                                toggle: function ($event) {
                                  return _vm.toggle(actions)
                                },
                                open: function ($event) {
                                  return _vm.open(actions)
                                },
                                "deselect-option": function ($event) {
                                  return _vm.deselectOption($event, actions)
                                },
                              },
                            })
                          : _c("selector-button", {
                              ref: "button",
                              attrs: {
                                id: _vm.buttonId,
                                isOpen: isOpen,
                                display: selectedOptions[0]
                                  ? selectedOptions[0].display
                                  : "",
                              },
                              on: {
                                toggle: function ($event) {
                                  return _vm.toggle(actions)
                                },
                                open: function ($event) {
                                  return _vm.open(actions)
                                },
                              },
                            }),
                        _vm._v(" "),
                        _c("selector-listbox", {
                          ref: "listBox",
                          attrs: {
                            selectedOption: selectedOptions[0],
                            isClosed: isClosed,
                          },
                          on: {
                            "highlight-next-option": function ($event) {
                              return _vm.highlightNextOption(actions)
                            },
                            "highlight-previous-option": function ($event) {
                              return _vm.highlightPreviousOption(actions)
                            },
                            "select-option": function ($event) {
                              return _vm.selectOption(
                                highlightedOption.id,
                                actions
                              )
                            },
                            close: function ($event) {
                              return _vm.close(actions)
                            },
                          },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "default",
                                fn: function (ref) {
                                  var createItemId = ref.createItemId;
                                  return _vm._l(options, function (option) {
                                    return _c("selector-list-item", {
                                      key: option.id,
                                      ref: option.id,
                                      refInFor: true,
                                      attrs: {
                                        id: createItemId(option.id),
                                        optionId: option.id,
                                        optionDisplay: option.display,
                                        selected: _vm.isSelected(
                                          option,
                                          selectedOptions
                                        ),
                                        isHighlighted:
                                          highlightedOption &&
                                          option.id === highlightedOption.id,
                                      },
                                      on: {
                                        mouseenter: function ($event) {
                                          return actions.highlightOption(option)
                                        },
                                        mouseleave: function ($event) {
                                          return actions.highlightOption(null)
                                        },
                                        click: function ($event) {
                                          return _vm.selectOption(
                                            option.id,
                                            actions
                                          )
                                        },
                                      },
                                    })
                                  })
                                },
                              },
                            ],
                            null,
                            true
                          ),
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "refine-selector-custom-options-wrapper" },
                      [_vm._t("default")],
                      2
                    ),
                  ]),
                ]
              },
            },
          ],
          null,
          true
        ),
      }),
    ],
    1
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

let uid = 0;
const getNextUid = function() {
  return uid++;
};

const criterion = ( id, depth, meta, refinements ) => {
  const uid = getNextUid();
  const [firstRefinement] = refinements || [];

  const condition = {
    condition_id: id,
    depth,
    type: "criterion",
    input: { 
      clause: meta?.clauses[0].id,
      ...( firstRefinement && { 
        [firstRefinement.id]: {
          clause: firstRefinement?.meta?.clauses[0]?.id,
        }}),
    },
    uid,
  };

  return condition;
};

const or = function(depth) {
  depth = depth === undefined ? 0 : depth;
  return {
    depth,
    type: 'conjunction',
    word: 'or',
  };
};

const and = function(depth) {
  depth = depth === undefined ? 1 : depth;
  return {
    depth,
    type: 'conjunction',
    word: 'and',
  };
};

class Blueprint {
  constructor(initialBlueprint, conditions, onChange) {
    uid = 0;

    initialBlueprint = initialBlueprint || [];
    conditions = conditions || [];

    this.conditions = conditions;

    this.blueprint = this.mapBlueprint(initialBlueprint);

    this.blueprintChanged = () => {
      // console.log(JSON.parse(JSON.stringify(this.blueprint)));
      if (onChange) {
        onChange([...this.blueprint]);
      }
    };
  }

  mapBlueprint(blueprint)
  {
      return blueprint.map(condition => {
          return {
              ...condition,
              id: condition.condition_id,
              uid: getNextUid(),
          };
      })
  }

  updateBlueprint(newBlueprint) {
      uid = 0;

      this.blueprint = this.mapBlueprint(newBlueprint);
  }

  groupedBlueprint() {
    if (this.blueprint.length === 0) {
      return [];
    }

    const groupedBlueprint = [];

    // start with an empty group
    groupedBlueprint.push([]);

    this.blueprint.forEach((piece, index) => {
      if (piece.word === 'or') {
        groupedBlueprint.push([]);
      } else if (piece.word === 'and') {
        return;
      } else {
        groupedBlueprint[groupedBlueprint.length - 1].push({
          ...piece,
          position: index,
        });
      }
    });

    return groupedBlueprint;
  }

  indexOfCriterion({ uid }) {
    let index = -1;
    for (let i = 0; i < this.blueprint.length; i++) {
      if (this.blueprint[i].uid === uid) {
        index = i;
        break;
      }
    }
    return index;
  }

  replaceCriterion(previousIndex, nextCriterion) {
    const { meta, id, refinements, } = this.findCondition(nextCriterion.id);
    const newCriterion = criterion(id, 1, meta, refinements);
    this.blueprint.splice(previousIndex, 1, newCriterion);
    this.blueprintChanged();
  }

  removeCriterion(position) {
    /**
       To support 'groups' there is some complicated logic for deleting criterion.

       Imagine this simplified blueprint: [eq, and, sw, or, eq]

       User clicks to delete the last eq. We also have to delete the preceding or
       otherwise we're left with a hanging empty group

       What if the user deletes the sw? We have to clean up the preceding and.

       Imagine another scenario: [eq or sw and ew]
       Now we delete the first eq but this time we need to clean up the or.

       These conditionals cover these cases.
    **/
      const { blueprint } = this;
      const previous = blueprint[position - 1];
      const next = blueprint[position + 1];
  
      const nextIsOr = next && next.word === 'or';
      const previousIsOr = previous && previous.word === 'or';
  
      const nextIsRightParen = nextIsOr || !next;
      const previousIsLeftParen = previousIsOr || !previous;
  
      const isFirstInGroup = previousIsLeftParen && !nextIsRightParen;
      const isLastInGroup = previousIsLeftParen && nextIsRightParen;
      const isLastCriterion = !previous && !next;
  
      if (isLastCriterion) {
        this.blueprint = [];
  
      } else if (isLastInGroup && previousIsOr) {
        blueprint.splice(position - 1, 2);
  
      } else if (isLastInGroup && !previous) {
        blueprint.splice(position, 2);
  
      } else if (isFirstInGroup) {
        blueprint.splice(position, 2);
  
      } else {
        blueprint.splice(position - 1, 2);
      }
      this.blueprintChanged();
  }

  findCriterion(uid) {
    const conditionIndex = this.indexOfCriterion({ uid });
    return this.blueprint[conditionIndex];
  }

  addGroup() {
    const { blueprint, conditions } = this;
    const condition = conditions[0];
    const { meta, refinements } = condition;

    if(blueprint.length > 0) {
      blueprint.push(or());
    }
    blueprint.push(
      criterion(condition.id, 1, meta, refinements)
    );    
    
    this.blueprintChanged();
  }

  addCriterion(newCriterion) {
    const { id, depth } = newCriterion;
    const { blueprint } = this;
    const generatedCriterion = criterion(id, depth);
    if (blueprint.length === 0) {
      blueprint.push(generatedCriterion);
    } else {
      blueprint.splice(
        blueprint.length,
        0,
        and(),
        generatedCriterion,
      );
    }
    
    this.blueprintChanged();
    return generatedCriterion;
  }

  insertCriterion(previousPosition) {
    const { blueprint, conditions } = this;
    const condition = conditions[0];
    const { meta, refinements } = condition;

    blueprint.splice(
      previousPosition + 1,
      0,
      and(),
      criterion(condition.id, 1, meta, refinements),
    );

    this.blueprintChanged();
    return blueprint[previousPosition + 1];
  }

  findRefinement(conditionId, findId) {
    const { refinements } = this.findCondition(conditionId);

    let result;
    refinements.forEach((refinement) => {
      if (refinement.id === findId) {
        result = refinement; 
      }
    });
    return result;
  }

  findCondition(conditionId) {
    let foundCondition = this.conditions[0];

    this.conditions.forEach((condition) => {
      if (condition.id === conditionId) {
        foundCondition = condition; 
      }
    });

    return foundCondition;
  }

  switchClause({ uid, id }, clause, refinementId) {
    const { meta } = this.findCondition(id);
    const criterion = this.findCriterion(uid);

    if (Array.isArray(meta.options)) {
      criterion.input = {
        clause,
      };
    } else {
      this.updateInput({ uid }, { clause }, refinementId);
    }
  }

  switchRefinement({ uid, id }, oldRefinementId, newRefinementId) {
    const nextRefinement = this.findRefinement(id, newRefinementId);
    const criterion = this.findCriterion(uid);
    const input = { ...criterion.input };

    // Have to copy and swap out the input
    // because deleting and adding properties is
    // not observable by vue's reactivity system.
    // https://vuejs.org/v2/guide/reactivity.html#For-Objects
    delete input[oldRefinementId];
    input[newRefinementId] = {
      clause: nextRefinement.meta.clauses[0].id,
    };
    criterion.input = input;
  }

  updateInput({ uid }, updates, refinementId) {
    // Do the update iteratively on the input object to preserve it
    // as an observable to anything that references it. Swapping it out
    // means you can't pass it directly to anything you would always have
    // to reference condition.input everywhere versus just passing input.
    const condition = this.findCriterion(uid);
    Object.keys(updates).forEach((key) => {
      if (refinementId){
        condition.input[refinementId][key] = updates[key];
      } else {
        condition.input[key] = updates[key];
      }
    });
    this.blueprintChanged();
  }

}

var RenderlessQueryBuilder = {
  name: 'renderless-query-builder',
  emits: ['change'],
  props: {
    blueprint: {
      type: Array,
      required: false,
    },
    conditions: {
      type: Array,
      required: true,
    },
  },
  provide() {
    const {
      blueprintStore: blueprint,
    } = this;

    return {
      blueprint,
      builderModeActive: true,
    };
  },
  data() {
    const conditionsLookup = this.conditions.reduce((lookup, condition) => {
      lookup[condition.id] = condition;
      return lookup;
    }, {});

    return {
      conditionsLookup,
      internalBlueprint: null,
      blueprintStore: new Blueprint(
        this.blueprint,
        this.conditions,
        (updatedBlueprint) => {
          this.internalBlueprint = updatedBlueprint;
          this.$emit('change', updatedBlueprint);
        },
      ),
    };
  },
    watch: {
        blueprint: {
            deep: true,
            handler(newBlueprint) {
                if (newBlueprint === this.internalBlueprint) {
                    return;
                }

                this.blueprintStore.updateBlueprint(newBlueprint);
            }
        }
    },
  methods: {
    replaceCriterion(previousPosition, newCriterion) {
      this.blueprintStore.replaceCriterion(previousPosition, newCriterion);
    },
    insertCriterion(position) {
      this.blueprintStore.insertCriterion(position);
    },
    removeCriterion(position) {
      this.blueprintStore.removeCriterion(position);
    },
    addGroup() {
      this.blueprintStore.addGroup();
    },
    conditionFor(criterion) {
      const { id: conditionId, uid } = criterion;
      const { id, type, display, meta } = this.conditionsLookup[conditionId];
      return { id, type, display, uid, meta };
    },
  },
  render() {
    const {
      insertCriterion,
      addGroup,
      blueprintStore: blueprint,
      conditionFor,
      replaceCriterion,
      removeCriterion,
    } = this;
    const defaultSlot = this.$scopedSlots?.default || this.$slots?.default;

    if (defaultSlot) {
      return defaultSlot({
        insertCriterion,
        addGroup,
        blueprint,
        conditionFor,
        removeCriterion,
        replaceCriterion,
        groupedBlueprint: blueprint.groupedBlueprint(),
      });
    }
    return null;
  },
};

var useCondition = (id, props, context) => {
  const blueprint = inject('blueprint');
  const builderModeActive = inject('builderModeActive');

  if (!id) {
    throw new Error('useCondition requires an id.');
  }

  if (!context) {
    throw new Error('useCondition requires a Vue context.');
  }

  if (!blueprint) {
    throw new Error('Conditions must be rendered within a query.');
  }

  // in builder mode we don't add/remove/update conditions on lifecycle methods
  // instead this behavior is delegated to the query builder.
  let criterion;
  if (!builderModeActive) {
    criterion = blueprint.addCriterion({
      id,
      depth: 0,
    });
  } else {
    criterion = blueprint.findCriterion(props.uid);
  }

  const updateInput = (updates, refinementId) => blueprint.updateInput(criterion, updates, refinementId);
  const switchClause = (clause) => blueprint.switchClause(criterion, clause);
  const switchRefinement = (oldRefinementId, newRefinementId) => {
    blueprint.switchRefinement(criterion, oldRefinementId, newRefinementId);
  };

  provide('criterion', criterion);
  provide('criterionMeta', props.meta);
  provide('updateInput', updateInput);
  provide('switchRefinement', switchRefinement);

  // This is overriden by refinement components
  provide('refinementId', null);

  onUnmounted(() => {
    // Again, in builder mode adding/removing criterions
    // is relegated to the query builder.
    if(!builderModeActive) {
      blueprint.removeCriterion(blueprint.indexOfCriterion(criterion));
    }
  });

  // Renderless condition doesn't accept a criterion prop, this
  // reference to props.condition is an outdated interface that is
  // only used by the non builder mode components. 
  // TODO: update non builder components to use the same props
  // as renderless condition. (see conditionProps in mixins/condition.js)
  let clauses = null;
  if (props?.condition?.meta?.clauses) {
    clauses = props.condition.meta.clauses.map((clause) => {
      return clause.component;
    });
  }

  return () => {
    if (context.slots.default) {
      return context.slots.default({ 
        clauses, 
        criterion, 
        updateInput, 
        switchClause 
      });
    }
    return null;
  };
};

var RenderlessCondition = {
  name: 'renderless-condition',
  props: {
    id: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    uid: {
      type: Number,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    return useCondition(props.id, props, context);
  },
};

var RenderlessOption = {
  name: 'renderless-option',
  inject: ['selector'],
  mixins: [optionProps],
  computed: {
    isSelected: function() {
      const { selector, id } = this;
      return selector.isSelected(id);
    },
  },
  created() {
    const { id, display, selected, selector } = this;
    selector.registerOption({
      id,
      display: display || id,
      ...this.$attrs,
    });

    if (selected) {
      selector.selectOption(id);
    }
  },
  render() {
    const { isSelected } = this;
    const defaultSlot = this.$scopedSlots?.default || this.$slots?.default;

    if (defaultSlot && isSelected) {
      return defaultSlot();
    }
    return null;
  },
};

var useClause = (id, props, context) => {
  const criterion = inject('criterion');
  const updateInput = inject('updateInput');
  const refinementId = inject('refinementId');
  const builderModeActive = inject('builderModeActive');
  const setValue = (input) => {
    updateInput(input, refinementId);
  };

  if (!criterion) {
    throw new Error('A clause must be used within a criterion.');
  }

  if (!builderModeActive) {
    updateInput({ clause: id }, refinementId);
    // eslint-disable-next-line no-unused-vars
    const { clause, ...values } = criterion.input;
    if (Object.keys(props).length > 0 && Object.keys(values).length === 0) {
      updateInput({ ...props }, refinementId);
    }
  }

  onUnmounted(() => {
    if (!builderModeActive) {
      // only mark the clause as empty if when unmounting no other
      // clause has been selected. Mounting/unmounting happens in the
      // order that the components were rendered.
      if (criterion.input.clause === id) {
        updateInput({ clause: undefined }, refinementId);
      }
    }
  });

  return () => {
    if (context.slots.default) {
      return context.slots.default({
        setValue,
        ...criterion.input,
      });
    }
    return null;
  };
};

var RenderlessClause = {
  name: 'renderless-clause',
  props: {
    clause: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    return useClause(props.clause, props, context);
  },
};

var RenderlessRefinement = {
  name: 'renderless-refinement',
  inject: ['updateInput'],
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  provide() {
    return {
      refinementId: this.id,
    };
  },
  render() {
    const defaultSlot = this.$scopedSlots?.default || this.$slots?.default;

    if (defaultSlot) {
      return defaultSlot();
    }
  }
};

//

var script$b = {
  name: 'selector-option',
  mixins: [optionProps],
  components: {
    RenderlessOption,
  },
};

/* script */
const __vue_script__$b = script$b;

/* template */
var __vue_render__$a = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "renderless-option",
    { attrs: { id: _vm.id, display: _vm.display, selected: _vm.selected } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$a = {
  name: 'condition-selector',
  methods: {
    selectOption(nextOption) {
      this.$emit('select-condition', nextOption);
    },
  },
  components: {
    Selector: __vue_component__$c
  }
};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$9 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "selector",
    { on: { "select-option": _vm.selectOption } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

var script$9 = {
  props: {
    blueprint: {
      type: Array,
      required: false,
    },
    conditions: {
      type: Array,
      required: false,
    },
  },
  provide() {
    const { blueprintStore } = this;
    return {
      blueprint: blueprintStore,
      builderModeActive: false,
    }
  },
  data() {
    return {
      blueprintStore: new Blueprint(
          this.blueprint,
          this.conditions,
          (updatedBlueprint) => {
            this.$emit('change', updatedBlueprint);
          },
      ),
    };
  },
  render() {
    const { blueprintStore: blueprint } = this;
    const defaultSlot = this.$scopedSlots?.default || this.$slots?.default;

    if (defaultSlot) {
      return defaultSlot({ blueprint });
    }
    return null;
  },
};

/* script */
const __vue_script__$9 = script$9;

/* template */

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//

var script$8 = {
  name: 'refine-number-input',
  data() {
    return {
      currentValue: this.value,
    }
  },
  props: {
    value: {
      type: Number,
      required: false,
    },
    meta: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    metaAttributes() {
      // A set of allowable attributes that can be passed
      // in from the outside, usually the backend.
      return ['min', 'max', 'step', 'placeholder'].reduce((carry, prop) => {
        if (Object.prototype.hasOwnProperty.call(this.meta, prop)) {
          if (this.meta[prop] !== '') {
           carry[prop] = this.meta[prop];
          }
        }

        return carry;
      }, {})
    }
  },
  methods: {
    handleInputChange: function (event) {
      const inputValue = event.target.value;
      const newValue = Number(inputValue);

      if (isNaN(newValue)) {
        // Don't emit. Only update with valid inputs so the
        // blueprint won't be updated with garbage and
        // we won't throw proptype errors.
        this.currentValue = inputValue;
      } else {
        this.currentValue = newValue;
        this.$emit('input', {value: newValue});
      }
    },
  },
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "input",
    _vm._b(
      {
        staticClass: "refine-number-input",
        attrs: { type: "number" },
        domProps: { value: _vm.currentValue },
        on: { input: _vm.handleInputChange },
      },
      "input",
      _vm.metaAttributes,
      false
    )
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$7 = {
  name: 'refine-double-number-input',
  data() {
    return {
      currentValue: this.value,
    }
  },
  computed: {
    joinWord() {
      // @TODO Meta helper
      return Object.prototype.hasOwnProperty.call(this.meta, 'joiner') ? this.meta.joiner : 'and';
    }
  },
  methods: {
    updateFirstValue: function ({value}) {
      this.$emit('input', {value1: value});
    },
    updateSecondValue: function ({value}) {
      this.$emit('input', {value2: value});
    },
  },
  props: {
    value1: {
      type: [String, Number],
      required: false,
    },
    value2: {
      type: [String, Number],
      required: false,
    },
    meta: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  components: {
    NumberInput: __vue_component__$8,
  },
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "refine-double-number-wrapper" },
    [
      _c("number-input", {
        attrs: { meta: _vm.meta, value: _vm.currentValue },
        on: { input: _vm.updateFirstValue },
      }),
      _vm._v(" "),
      _vm.joinWord
        ? _c("span", { staticClass: "refine-double-number-joiner" }, [
            _vm._v(_vm._s(_vm.joinWord)),
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("number-input", {
        attrs: { meta: _vm.meta, value: _vm.currentValue },
        on: { input: _vm.updateSecondValue },
      }),
    ],
    1
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//

var script$6 = {
  name: 'refine-text-input',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    staticClass: "refine-text-input",
    attrs: { type: "text" },
    domProps: { value: _vm.value },
    on: {
      input: function ($event) {
        return _vm.$emit("input", { value: $event.target.value })
      },
    },
  })
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$5 = {
  name: 'refine-date-input',
  components: {
    Selector: __vue_component__$c,
    SelectorOption: __vue_component__$b,
  },
  mixins: [uid$2],
  props: {
    amount: {
      type: [String, Number],
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    modifier: {
      type: String,
      required: false,
    },
    units: {
      type: Array,
      required: true,
    },
    modifiers: {
      type: Array,
      required: true,
    },
  },
  created() {
    const {modifier} = this;
    this.$emit('input', {modifier});
  },
  methods: {
    id(seed) {
      return `${this.uid}-${seed}`;
    },
    updateModifier: function (nextOption) {
      this.$emit('input', {modifier: nextOption.id});
    },
    updateAmount: function (event) {
      const amount = event.target.value;
      this.$emit('input', {amount});
    },
    updateUnit: function (nextOption) {
      this.$emit('input', {unit: nextOption.id});
    },
  },
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "refine-relative-date-wrapper" },
    [
      _c("div", [
        _c("input", {
          staticClass: "refine-number-input",
          attrs: { type: "number", name: "days" },
          domProps: { value: _vm.amount },
          on: { input: _vm.updateAmount },
        }),
      ]),
      _vm._v(" "),
      _c(
        "selector",
        { on: { "select-option": _vm.updateUnit } },
        _vm._l(_vm.units, function (unit) {
          return _c("selector-option", {
            key: unit.id,
            attrs: { id: _vm.id("unit-" + unit.id), display: unit.display },
          })
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "selector",
        { on: { "select-option": _vm.updateModifier } },
        _vm._l(_vm.modifiers, function (modifier) {
          return _c("selector-option", {
            key: modifier.id,
            attrs: {
              id: _vm.id("modifier-" + modifier.id),
              display: modifier.display,
            },
          })
        }),
        1
      ),
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$4 = {
  name: "refine-option-input",
  components: {
    Selector: __vue_component__$c,
    SelectorOption: __vue_component__$b,
  },
  props: {
    selected: {
      type: Array,
      required: false,
      default: () => [],
    },
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    selectOption({ selectedOptions }) {
      const selected = selectedOptions.map(({ id }) => id);
      this.$emit("input", { selected });
    },
    deselectOption({ selectedOptions }) {
      const selected = selectedOptions.map(({ id }) => id);
      this.$emit("input", { selected });
    },
    isSelected(id) {
      let selected = false;

      this.selected.forEach((selectedId) => {
        if (selectedId === id) {
          selected = true;
        }
      });

      return selected;
    },
  },
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "selector",
    {
      attrs: { isMultiSelect: _vm.multiple },
      on: {
        "select-option": _vm.selectOption,
        "deselect-option": _vm.deselectOption,
      },
    },
    _vm._l(_vm.options, function (ref) {
      var id = ref.id;
      var display = ref.display;
      return _c("selector-option", {
        key: id,
        attrs: { id: id, display: display, selected: _vm.isSelected(id) },
      })
    }),
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

var index = {
//  RefineDateInput,
//  RefineDoubleDateInput,
  RefineDoubleNumberInput: __vue_component__$7,
  RefineNumberInput: __vue_component__$8,
  RefineOptionInput: __vue_component__$4,
  RefineRelativeDateInput: __vue_component__$5,
  RefineTextInput: __vue_component__$6,
};

var inputs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': index,
    RefineDoubleNumberInput: __vue_component__$7,
    RefineNumberInput: __vue_component__$8,
    RefineOptionInput: __vue_component__$4,
    RefineRelativeDateInput: __vue_component__$5,
    RefineTextInput: __vue_component__$6
});

//

var script$3 = {
  name: 'clause',
  props: {
    input: {
      type: Object,
      default: () => { return {}; },
    },
    meta: {
      type: Object,
      required: true,
    },
  },
  methods: {
    switchClause: function ({ selectedOption: nextClause }) {
      this.$emit("switch-clause", nextClause);
    },
  },
  components: {
    RenderlessClause,
    SelectorOption: __vue_component__$b,
    Selector: __vue_component__$c,
    ...inputs,
  },
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "renderless-clause",
    _vm._b(
      {
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function (ref) {
              var setValue = ref.setValue;
              return [
                _c(
                  "selector",
                  {
                    attrs: { innerClass: "refine-clause-selector" },
                    on: { "select-option": _vm.switchClause },
                  },
                  _vm._l(_vm.meta.clauses, function (ref) {
                    var clauseId = ref.id;
                    var display = ref.display;
                    var component = ref.component;
                    var clauseMeta = ref.meta;
                    return _c(
                      "selector-option",
                      {
                        key: clauseId,
                        attrs: {
                          id: clauseId,
                          display: display,
                          selected: _vm.input.clause === clauseId,
                        },
                      },
                      [
                        _c(
                          "div",
                          [
                            component
                              ? _c(
                                  component,
                                  _vm._b(
                                    {
                                      tag: "component",
                                      on: { input: setValue },
                                    },
                                    "component",
                                    Object.assign(
                                      {},
                                      _vm.meta,
                                      clauseMeta,
                                      _vm.input
                                    ),
                                    false
                                  )
                                )
                              : _vm._e(),
                          ],
                          1
                        ),
                      ]
                    )
                  }),
                  1
                ),
              ]
            },
          },
        ]),
      },
      "renderless-clause",
      _vm.input,
      false
    )
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$2 = {
  name: 'refinements',
  inject: ['updateInput', 'switchRefinement'],
  components: {
    Clause: __vue_component__$3,
    RenderlessRefinement,
    Selector: __vue_component__$c,
    SelectorOption: __vue_component__$b,
  },
  props: {
    refinements: {
      required: true,
      type: Array,
    },
    input: {
      required: false,
      type: Object,
      default: () => { return {}; },
    },
  }, 
  methods: {
    selectedRefinementId() {
      let selectedId;
      this.refinements.forEach(({ id }) => {
        if (this.input[id]) {
          selectedId = id;
        }
      });

      return selectedId;
    },
    
    selectRefinement({ selectedOption }) {
      const { id: nextId } = selectedOption;
      this.switchRefinement(this.selectedRefinementId(), nextId);
    },
  },
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "selector",
    {
      staticClass: "pt-4",
      attrs: { innerClass: "mr-4" },
      on: { "select-option": _vm.selectRefinement },
    },
    _vm._l(_vm.refinements, function (ref) {
      var id = ref.id;
      var meta = ref.meta;
      var display = ref.display;
      return _c(
        "selector-option",
        {
          key: id,
          attrs: { id: id, display: display, selected: !!_vm.input[id] },
        },
        [
          _c(
            "renderless-refinement",
            { attrs: { id: id } },
            [
              _c("clause", {
                attrs: { meta: meta, input: _vm.input[id] },
                on: {
                  "switch-clause": function (ref) {
                    var clause = ref.id;

                    return _vm.updateInput({ clause: clause }, id)
                  },
                },
              }),
            ],
            1
          ),
        ],
        1
      )
    }),
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$1 = {
  name: "criterion",
  props: {
    conditions: {
      required: true,
      type: Array,
    },
    conditionId: {
      type: String,
      required: true,
    },
    input: {
      type: Object,
      required: true,
    },
    errors: {
      type: Array,
      required: false,
      default: () => { return []; },
    },
  },
  methods: {
    switchCondition: function ({ selectedOption: nextCondition }) {
      this.$emit("switch-condition", nextCondition);
    },
    switchClause: function (nextClause) {
      this.$emit("switch-clause", nextClause);
    },
  },
  components: {
    Clause: __vue_component__$3,
    Refinements: __vue_component__$2,
    SelectorOption: __vue_component__$b,
    Selector: __vue_component__$c,
  },
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "py-2" }, [
    _c(
      "ul",
      { staticClass: "refine-criterion-errors" },
      _vm._l(_vm.errors, function (error) {
        return _c(
          "li",
          { key: error.id, staticClass: "refine-criterion-error" },
          [_vm._v("\n      " + _vm._s(error.message) + "\n    ")]
        )
      }),
      0
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "flex items-start" },
      [
        _c(
          "button",
          {
            staticClass: "refine-criterion-remove-icon",
            attrs: { type: "button" },
            on: {
              click: function ($event) {
                $event.preventDefault();
                return _vm.$emit("remove-condition")
              },
            },
          },
          [
            _c(
              "svg",
              {
                staticClass: "h-5 w-5",
                attrs: {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                },
              },
              [
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
                    "clip-rule": "evenodd",
                  },
                }),
              ]
            ),
          ]
        ),
        _vm._v(" "),
        _c(
          "selector",
          {
            staticClass: "refine-condition-selector",
            attrs: { innerClass: "mr-4" },
            on: { "select-option": _vm.switchCondition },
          },
          _vm._l(_vm.conditions, function (ref) {
            var id = ref.id;
            var display = ref.display;
            var meta = ref.meta;
            var refinements = ref.refinements;
            return _c(
              "selector-option",
              {
                key: id,
                attrs: {
                  id: id,
                  display: display,
                  selected: _vm.conditionId === id,
                },
              },
              [
                _c(
                  "div",
                  [
                    _c("clause", {
                      attrs: { input: _vm.input, meta: meta },
                      on: { "switch-clause": _vm.switchClause },
                    }),
                    _vm._v(" "),
                    refinements && refinements.length > 0
                      ? _c("refinements", {
                          attrs: { input: _vm.input, refinements: refinements },
                        })
                      : _vm._e(),
                  ],
                  1
                ),
              ]
            )
          }),
          1
        ),
      ],
      1
    ),
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script = {
  name: "query-builder",
  model: {
    prop: "blueprint",
    event: "change",
  },
  emits: ['update:blueprint'],
  props: {
    blueprint: {
      required: false,
      type: Array,
      default: () => {
        return [];
      },
    },
    conditions: {
      required: true,
      type: Array,
    },
    errors: {
      required: false,
      type: Object,
      default: () => { return {}; },
    },
  },
  methods: {
    onChange(newBlueprint) {
      // bubble up the change event.
      this.$emit("change", newBlueprint);
    },
  },
  created() {
    if (this.conditions.length === 0) {
      throw new Error(
        "You must provide at least one condition to the query builder."
      );
    }
  },
  components: {
    Criterion: __vue_component__$1,
    RenderlessCondition,
    RenderlessQueryBuilder,
  },
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("renderless-query-builder", {
        attrs: { blueprint: _vm.blueprint, conditions: _vm.conditions },
        on: { change: _vm.onChange },
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function (ref) {
              var groupedBlueprint = ref.groupedBlueprint;
              var replaceCriterion = ref.replaceCriterion;
              var insertCriterion = ref.insertCriterion;
              var addGroup = ref.addGroup;
              var removeCriterion = ref.removeCriterion;
              var conditionFor = ref.conditionFor;
              return [
                _c(
                  "div",
                  { staticClass: "refine-query-builder-wrapper" },
                  [
                    _vm._l(groupedBlueprint, function (group, index) {
                      return _c(
                        "div",
                        {
                          key: index,
                          staticClass: "refine-query-builder-condition-group",
                        },
                        [
                          _vm._l(group, function (criterion, index) {
                            return _c(
                              "div",
                              {
                                key: criterion.uid,
                                staticClass: "refine-query-builder-condition",
                              },
                              [
                                _c(
                                  "renderless-condition",
                                  _vm._b(
                                    {
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function (ref) {
                                              var switchClause =
                                                ref.switchClause;
                                              return [
                                                _c("criterion", {
                                                  attrs: {
                                                    conditionId:
                                                      criterion.condition_id,
                                                    conditions: _vm.conditions,
                                                    errors: _vm.errors[index],
                                                    input: criterion.input,
                                                  },
                                                  on: {
                                                    "switch-clause": function (
                                                      ref
                                                    ) {
                                                      var clause = ref.id;

                                                      return switchClause(
                                                        clause
                                                      )
                                                    },
                                                    "remove-condition":
                                                      function ($event) {
                                                        return removeCriterion(
                                                          criterion.position
                                                        )
                                                      },
                                                    "switch-condition":
                                                      function (nextCondition) {
                                                        return replaceCriterion(
                                                          criterion.position,
                                                          conditionFor(
                                                            nextCondition
                                                          )
                                                        )
                                                      },
                                                  },
                                                }),
                                              ]
                                            },
                                          },
                                        ],
                                        null,
                                        true
                                      ),
                                    },
                                    "renderless-condition",
                                    conditionFor(
                                      Object.assign(
                                        {},
                                        { id: criterion.condition_id },
                                        criterion
                                      )
                                    ),
                                    false
                                  )
                                ),
                              ],
                              1
                            )
                          }),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "refine-query-builder-and-button",
                              attrs: { tabindex: "0", type: "button" },
                              on: {
                                click: function ($event) {
                                  return insertCriterion(
                                    group[group.length - 1].position
                                  )
                                },
                              },
                            },
                            [
                              _c(
                                "svg",
                                {
                                  staticClass: "h-5 w-5",
                                  attrs: {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    "aria-hidden": "true",
                                  },
                                },
                                [
                                  _c("path", {
                                    attrs: {
                                      "fill-rule": "evenodd",
                                      d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
                                      "clip-rule": "evenodd",
                                    },
                                  }),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "refine-query-builder-and-button-span",
                                },
                                [_vm._v("And")]
                              ),
                            ]
                          ),
                        ],
                        2
                      )
                    }),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "refine-query-builder-or-button",
                        attrs: { type: "button" },
                        on: { click: addGroup },
                      },
                      [_vm._v("\n        Add an 'Or'\n      ")]
                    ),
                  ],
                  2
                ),
              ]
            },
          },
        ]),
      }),
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export { __vue_component__$a as ConditionSelector, __vue_component__$9 as Query, __vue_component__ as QueryBuilder, __vue_component__$c as Selector, __vue_component__$b as SelectorOption };
//# sourceMappingURL=refine-vue.esm.js.map
