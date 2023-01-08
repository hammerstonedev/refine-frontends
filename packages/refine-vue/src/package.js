import './directives';
import { default as RefinePlugin } from './plugins/refine';

/**
 * @deprecated Use the RefinePlugin instead.
 */
import { default as DatePickerPlugin } from './plugins/date-picker';

export * from './components/base';
export * from './flavors';
export { RefinePlugin, DatePickerPlugin };
