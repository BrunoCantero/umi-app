// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/PageLoading',
      },
      title: {
        defaultTitle: 'App',
        useLocale: true,
      },
      dll: true,
      locale: {
        enable: true,
        default: 'es-ES',
      },
    }],
  ],
  // theme: {
  //   '@primary-color': '#1DA57A',
  //   '@link-color': '#1DA57A',
  //   '@layout-header-background': '#002900',
  // },
};
