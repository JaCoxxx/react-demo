// ref: https://umijs.org/config/
import path from 'path'
import Routes from './router.config'


// 路径拼接
const resolvePath = dir => path.resolve(__dirname, dir)

export default {
  treeShaking: true,
  routes: Routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'umi-demo',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  alias: {
    '@': resolvePath('../src'),
    Pages: resolvePath('../src/pages'),
    Components: resolvePath('../src/components'),
    Assets: resolvePath('../src/assets'),
    Router: resolvePath('../src/router'),
    Store: resolvePath('../src/store'),
    Utils: resolvePath('../src/utils'),
    Widget: resolvePath('../src/components/Widget'),
    Style: resolvePath('../src/styles'),
    Context: resolvePath('../src/context'),
  },
};
