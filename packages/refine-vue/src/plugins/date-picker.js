export default {
  install: (app, { DatePicker }) => {
    // vue3 recommends providing this component
    // and getting it via inject, however, this works
    // in both vue2 and vue3
    app.component('refine-date-picker', DatePicker);
  },
};
