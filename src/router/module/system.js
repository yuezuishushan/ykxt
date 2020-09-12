import Main from '@/components/main'
export default {
  path: '/system',
  name: 'system',
  component: Main,
  meta: {
    title: '系统管理选项',
    icon: '_xitong1'
  },
  children: [
    {
      path: 'user',
      name: 'systemUser',
      meta: {
        title: '用户管理'
      },
      component: () => import('@/view/system/user')
    },
    {
      path: 'role',
      name: 'systemRole',
      meta: {
        title: '角色管理'
      },
      component: () => import('@/view/system/role')
    },
    {
      path: 'menu',
      name: 'systemMenu',
      meta: {
        title: '菜单管理'
      },
      component: () => import('@/view/system/menu')
    }
  ]
}
