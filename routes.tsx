
/** https://github.com/umijs/umi/blob/9878caaf406855c800dac5f497372cb4623892ef/packages/core/src/Route/types.d.ts#L1 */
export interface IRoute {
  component?: any;
  exact?: boolean;
  path?: string;
  routes?: IRoute[];
  wrappers?: string[];
  title?: string;
  __toMerge?: boolean;
  __isDynamic?: boolean;
  [key: string]: any;

  // 扩展字段
  /** 是否要显示在左侧菜单中 */
  hide?: boolean;
  /** 权限字段 */
  auth?: string;
}

export const routes: IRoute[] = [
  {
    // layouts 路径 - 默认不用配置
    // path: '/',
    // component: '../layouts',
    auth: 'layout-main',
    routes: [
      {
        // 首页路径
        path: '',
        component: './',
        title: '首页',
        auth: 'home',
      },
      {
        path: '/login',
        component: './login',
        title: '登录',
        hide: true,
      },
      {
        path: '/menus',
        component: './menus',
        title: '菜单组',
        auth: 'menus',
        routes: [
          {
            // 子菜单不能以 ./ 或者 / 开头
            path: 'docs',
            component: './docs',
            title: '文档',
            auth: 'menus-docs',
          },
        ],
      },
    ],
  },
];
