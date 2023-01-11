import { RefineNativeDatePicker } from '../components/base/inputs';
import Config from './config';

export default {
  install: (app, options = {}) => {
    options = {
      // By default, we register the NativeDatePicker as the default picker.
      // This works with no dependencies and in every browser. If they want
      // to register their own picker, they can pass in a new component.
      DatePicker: RefineNativeDatePicker,

      // Don't add the data-locator to each element by default.
      showLocators: false,

      // User's options last, so they override ours.
      ...options,
    };

    app.component('refine-date-picker', options.DatePicker);

    // No use passing this on.
    delete options.DatePicker;

    Config.init(options);
  },
};
