export default {
  install: (app, { DatePicker }) => {
    app.provide('DatePicker', DatePicker);
  },
}