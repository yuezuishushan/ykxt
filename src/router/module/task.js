import Main from '@/components/main'
export default {
  path: '/task',
  name: 'task',
  component: Main,
  meta: {
    title: '任务管理',
    icon: '_renwu'
  },
  children: [
    {
      path: 'list',
      name: 'taskList',
      meta: {
        title: '任务管理'
      },
      component: () => import('@/view/task')
    }
  ]
}
