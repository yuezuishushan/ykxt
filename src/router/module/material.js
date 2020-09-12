import Main from '@/components/main'
export default {
  path: '/material',
  name: 'material',
  component: Main,
  meta: {
    showAlways: true,
    title: '我的素材',
    icon: '_RectangleCopy'
  },
  children: [
    {
      path: 'group',
      name: 'materialGroup',
      meta: {
        title: '素材组管理'
      },
      component: () => import('@/view/material/group')
    },
    {
      path: 'list',
      name: 'materialList',
      meta: {
        title: '素材管理'
      },
      component: () => import('@/view/material/list')
    }
  ]
}
