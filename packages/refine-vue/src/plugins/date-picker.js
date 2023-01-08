import plugin from './refine';

/**
 * @deprecated use the RefinePlugin instead.
 */
export default {
  install: (app, options = {}) => {
    // Defer to the new plugin.
    plugin.install(app, options);
  },
};
