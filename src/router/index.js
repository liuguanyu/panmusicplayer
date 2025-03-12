// 路由配置
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', icon: 'home-outlined' }
      },
      {
        path: 'playlists',
        name: 'Playlists',
        component: () => import('@/views/Playlists.vue'),
        meta: { title: '播放列表', icon: 'unordered-list-outlined' }
      },
      {
        path: 'playlist/:id',
        name: 'PlaylistDetail',
        component: () => import('@/views/PlaylistDetail.vue'),
        meta: { title: '列表详情', hideInMenu: true }
      },
      {
        path: 'player',
        name: 'Player',
        component: () => import('@/views/Player.vue'),
        meta: { title: '播放器', hideInMenu: true }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
        meta: { title: '设置', icon: 'setting-outlined' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', hideInMenu: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '404', hideInMenu: true }
  }
];

export default routes;
