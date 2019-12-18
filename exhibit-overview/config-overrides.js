const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require("customize-cra");
const path = require('path');
const paths = require('react-scripts/config/paths');
const rewireWebpackOutput = require('react-app-rewire-output');

const webpackConfig = () => (config, env) => {
  config = rewireWebpackOutput(config, env, {
    publicPath: './'
  });
  return config;
};
paths.appBuild = path.join(path.dirname(paths.appBuild), 'docker/build');

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    // 自定义主题
    modifyVars: {}
  }),
  webpackConfig(),
  addWebpackAlias({
    'components': path.resolve(__dirname, './src/components')
  })
);
