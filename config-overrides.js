const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackResolve,
  addWebpackPlugin,
  overrideDevServer,
  addWebpackExternals
} = require('customize-cra');
const path = require('path');
const paths = require('react-scripts/config/paths');
const pkgJson = require('./package.json');
const webpack = require('webpack');
const rewireWebpackOutput = require('react-app-rewire-output');

const devServerCustom = () => (config) => {
  config.quiet = false;
  config.proxy = {
    '/api': 'http://172.16.10.126:10000', // 登录
  };
  return config;
};
const webpackConfig = () => (config, env) => {
  config = rewireWebpackOutput(config, env, {
    publicPath: './'
  });
  return config;
};

paths.appBuild = path.join(path.dirname(paths.appBuild), 'docker/build');

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addWebpackExternals({
      moment: 'moment',
      jquery: 'jQuery',
      gridstack: 'GridStack',
      GridStackUI: 'GridStackUI',
      lodash: '_'
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#213571' }
    }),
    webpackConfig(),
    addWebpackResolve({
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@messages': path.resolve(__dirname, 'src/messages/index')
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.scss', '.less', '.css']
    }),
    addWebpackPlugin(
      new webpack.DefinePlugin({
        'process.env': {
          version: `"${pkgJson.version}"`
        }
      })
    )
  ),
  devServer: overrideDevServer(devServerCustom())
};
