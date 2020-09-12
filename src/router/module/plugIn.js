import Main from '@/components/main'
export default {
  path: '/plugIn',
  name: 'plugIn',
  component: Main,
  meta: {
    title: '插件管理',
    icon: '_chajiangongneng'
  },
  children: [
    {
      path: 'group',
      name: 'plugInGroup',
      meta: {
        title: '插件管理'
      },
      component: () => import('@/view/plugIn/group')
    },
    {
      path: 'list',
      name: 'plugInList',
      meta: {
        title: '我的插件'
      },
      component: () => import('@/view/plugIn/list')
    }
  ]
}
