import { h, defineComponent, isVue2, computed } from 'vue-demi';

// vue-demi does not export resolveComponent, which is required when using
// Vue3. If we just try to import it from vue-demi, rollup complains that
// the export doesn't exist for the Vue2 build. In our Vue3 Vite config,
// we override `vue-demi-shim` to point to the real vue-demi.
import { resolveComponent } from './vue-demi-shim';

import { useFlavor } from '../../../hooks/useFlavor';

export const RefineFlavor = defineComponent({
  name: 'RefineFlavor',
  props: {
    as: {
      type: String,
      default: 'div',
    },
    order: {
      type: Array,
      default: () => ['default'],
    },
    component: {
      type: String,
      required: true,
    },
    flavorOptions: {
      type: Object,
      required: false,
    },
  },
  inheritAttrs: false,
  setup(incomingProps, bindings) {
    const flavor = useFlavor(
      (flavor) => {
        const parts = incomingProps.component.split('.');
        let result = flavor;
        for (const part of parts) {
          result = result?.[part];
        }
        return result;
      },
      computed(() => incomingProps.as),
      computed(() => {
        // Originally we only passed "flavorOptions" through to the flavor `class`
        // function, but it makes more sense to send them all. So now we combine
        // them and pass them all through.
        // @TODO It might make sense to get rid of flavorOptions altogether?
        return {
          ...(bindings.attrs ?? {}),
          ...(incomingProps.flavorOptions ?? {}),
        }
      })
    );

    return () => {
      const resolvedFlavor = flavor.value;
      const order = resolvedFlavor.extra.value.order ?? incomingProps.order;
      const props = omit(incomingProps, ['as', 'component', 'order']);
      const slots = bindings.slots;

      let isComponent =
        typeof resolvedFlavor.component === 'string' && resolvedFlavor.component.includes('-');

      let orderedSlots = isComponent ? slots : order.map((key) => slots?.[key]?.());

      let el = isVue2
        ? h(
            resolvedFlavor.component,
            {
              scopedSlots: slots,
              attrs: { ...bindings.attrs, 'data-flavor': incomingProps.component },

              props,
              on: bindings.listeners,
              ...resolvedFlavor.props.value,
            },
            orderedSlots
          )
        : h(
            // In Vue 3, globally registered components must be resolved before they can be used.
            // https://vuejs.org/guide/extras/render-function.html#components
            isComponent ? resolveComponent(resolvedFlavor.component) : resolvedFlavor.component,
            {
              ...bindings.attrs,
              'data-flavor': incomingProps.component,
              ...props,
              ...resolvedFlavor.props.value,
            },
            orderedSlots
          );

      if (resolvedFlavor.extra.value.wrap) {
        return resolvedFlavor.extra.value.wrap(el);
      }

      return el;
    };
  },
});

function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
