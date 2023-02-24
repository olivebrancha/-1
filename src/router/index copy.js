import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index')
  },
  {
    path: '/',
    redirect: '/home',
    component:Layout,
    meta:{title:'首页'},
    children:[
      {
        path: 'home',
        name:'home',
        component: () => import('../views/home/index')
      }
    ]
  },
  {
    path: '/loan-input',
    redirect: '/loan-input/index',
    component:Layout,
    meta:{title:'贷款申请'},
    children:[
      {
        path: 'index',
        name:'loan-input',
        component: () => import('../views/loan-input/index')
      }
    ]
  },
  {
    path: '/input-manager',
    redirect: '/input-manager/index',
    component:Layout,
    meta:{title:'申请管理'},
    children:[
      {
        path: 'index',
        name:'input-manager',
        component: () => import('../views/input-manager/index')
      }
    ]
  },
  {
    path: '/loan-approve',
    redirect: '/loan-approve/first',
    component:Layout,
    meta:{title:'贷款审批'},
    children:[
      {
        path: 'first',
        name:'loan-approve/first',
        component: () => import('../views/loan-approve/first'),
        meta:{title:'初审'}
      },
      {
        path: 'end',
        name:'loan-approve/end',
        component: () => import('../views/loan-approve/end'),
        meta:{title:'终审'}
      }
    ]
  },
  {
    path: '/contract',
    redirect: '/contract/index',
    component:Layout,
    meta:{title:'标的管理'},
    children:[
      {
        path: 'index',
        name:'contract',
        component: () => import('../views/contract/index')
      }
    ]
  },
  {
    path: '/permission',
    redirect: '/permission/create',
    component:Layout,
    meta:{title:'权限管理'},
    children:[
      {
        path: 'create',
        name:'permission/create',
        component: () => import('../views/permission/create'),
        meta:{title:'创建管理员'}
      },
      {
        path: 'list',
        name:'permission/list',
        component: () => import('../views/permission/list'),
        meta:{title:'列表展示'}
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
