import { inject, provide, computed } from 'vue-demi';

const flavorContext = Symbol();

export function provideFlavor(flavor) {
  provide(flavorContext, flavor);
}

export function useFlavor(resolve, defaultComponent, options = computed(() => ({}))) {
  const configuration = inject(flavorContext);
  const flavor = computed(() => resolve(configuration) ?? {});

  const props = computed(() => {
    const props = {};
    const opts = options.value ?? {};

    const resolvedClass = flavor.value.class;
    if (resolvedClass) {
      props.class = typeof resolvedClass === 'function' ? resolvedClass(opts) : resolvedClass;
    }

    const resolvedStyle = flavor.value.style;
    if (resolvedStyle) {
      props.style = typeof resolvedStyle === 'function' ? resolvedStyle(opts) : resolvedStyle;
    }
    return props;
  });

  return computed(() => ({ component: flavor.value.component ?? defaultComponent.value, props }));
}
