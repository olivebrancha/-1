import Layout from '@/layout/index'

const permissionRouter = {
  path: '/permission',
  redirect: '/permission/create',
  component:Layout,
  meta:{title:'权限管理'},
  children:[
    {
      path: 'create',
      name:'permission/create',
      component: () => import('@/views/permission/create'),
      meta:{title:'创建管理员'}
    },
    {
      path: 'list',
      name:'permission/list',
      component: () => import('@/views/permission/list'),
      meta:{title:'列表展示'}
    }
  ]
}

export default permissionRouter
