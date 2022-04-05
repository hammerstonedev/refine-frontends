import { h, defineComponent, isVue2, isVue3, computed } from 'vue-demi';
import { useFlavor } from '../../../hooks/useFlavor';

export const RefineFlavor = defineComponent({
  name: 'RefineFlavor',
  props: {
    as: {
      type: String,
      default: 'div',
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
      computed(() => incomingProps.flavorOptions)
    );

    return () => {
      const props = omit(incomingProps, ['as', 'component']);
      const resolvedFlavor = flavor.value;

      return h(
        resolvedFlavor.component,
        {
          attrs: bindings.attrs,
          ...(isVue2 && { ...resolvedFlavor.props.value, props, on: bindings.listeners }),
          ...(isVue3 && { ...resolvedFlavor.props.value, ...props }),
        },
        bindings.slots.default?.()
      );
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
