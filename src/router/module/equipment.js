import Main from '@/components/main'
export default {
  path: '/equipment',
  name: 'equipment',
  component: Main,
  meta: {
    showAlways: true,
    title: '我的设备',
    icon: '_huabanfuben'
  },
  children: [
    {
      path: 'group',
      name: 'equipmentGroup',
      meta: {
        title: '设备组管理'
      },
      component: () => import('@/view/equipment/group')
    },
    {
      path: 'list',
      name: 'equipmentList',
      meta: {
        title: '设备管理'
      },
      component: () => import('@/view/equipment/list')
    }
  ]
}
