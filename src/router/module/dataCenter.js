import Main from '@/components/main'
export default {
  path: '/dataCenter',
  name: 'dataCenter',
  component: Main,
  meta: {
    showAlways: true,
    title: '数据中心',
    icon: '_shuju'
  },
  children: [
    {
      path: 'label',
      name: 'dataCenterLabel',
      meta: {
        title: '标签管理'
      },
      component: () => import('@/view/dataCenter/label')
    },
    {
      path: 'talkingSkills',
      name: 'dataCenterTalkingSkills',
      meta: {
        title: '话术管理'
      },
      component: () => import('@/view/dataCenter/talkingSkills')
    }
  ]
}
