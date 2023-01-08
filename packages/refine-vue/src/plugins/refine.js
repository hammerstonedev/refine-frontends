import { RefineNativeDatePicker } from '../components/base/inputs';
import Config from './config';

export default {
  install: (app, options = {}) => {
    options = {
      DatePicker: RefineNativeDatePicker,
      showLocators: false,
      ...options,
    };

    app.component('refine-date-picker', options.DatePicker);

    delete options.DatePicker;

    Config.init(options);
  },
};
