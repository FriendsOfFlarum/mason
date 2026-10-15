const path = require('path');
const config = require('@flarum/jest-config')();

// flarum/tags is an optional dependency imported through `ext:` at runtime; tests read its vendored source.
const tagsDir = path.resolve(__dirname, '../vendor/flarum/tags/js');

module.exports = {
  ...config,
  roots: [...config.roots, tagsDir],
  moduleNameMapper: {
    '^ext:flarum/tags/(.*)$': path.join(tagsDir, 'src', '$1'),
    ...config.moduleNameMapper,
  },
};
