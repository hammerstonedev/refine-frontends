let _config = {};

export default {
  init(config) {
    _config = config;
  },
  get(key, def = null) {
    return _config?.[key] ?? def;
  },
  set(key, value) {
    _config[key] = value;
  },
};