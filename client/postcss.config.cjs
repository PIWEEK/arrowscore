const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const config = {
  plugins: [
    autoprefixer,
    postcssImport,
    postcssPresetEnv({ stage: 0 }),
  ],
};

module.exports = config;
