import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index"; //布局

Vue.use(Router);
import permissionRouter from "./modules/permission";

/*
 解决router内部报错
*/
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
export const constantRoutes = [
  //常规配置
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index"),
        name: "home",
        meta: {
          title: "首页",
        },
      },
    ],
  },
];

export const asyncRoutes = [
  //异步路由
  {
    path: "/loan-input", //loan-input贷款申请
    component: Layout,
    redirect: "/loan-input/index",
    meta: {
      roles: ["input"], //角色销售人员
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/loan-input/index"),
        name: "loan-input",
        meta: {
          title: "贷款申请",
        },
      },
    ],
  },
  {
    path: "/input-manager", //input-manager申请管理
    redirect: "/input-manager/index",
    component: Layout,
    meta: {
      roles: ["input"], //角色销售人员
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/input-manager/index"),
        name: "input-manager",
        meta: {
          title: "申请管理",
        },
      },
    ],
  },

  {
    path: "/loan-approve", //loan-approve贷款审批
    component: Layout,
    redirect: "/loan-approve/first",
    meta: {
      title: "贷款审批",
      roles: ["approve"], //角色审核人员
    },
    children: [
      {
        path: "first", //first 初审
        component: () => import("@/views/loan-approve/first"),
        name: "loan-approve/first",
        meta: {
          title: "初审",
        },
      },
      {
        path: "end", //end  终审
        component: () => import("@/views/loan-approve/end"),
        name: "loan-approve/end",
        meta: {
          title: "终审",
        },
      },
    ],
  },

  {
    path: "/contract", //contract标的管理
    component: Layout,
    redirect: "/contract/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/contract/index"),
        name: "contract",
        meta: {
          title: "标的管理",
        },
      },
    ],
  },
  permissionRouter,
  { path: "*", redirect: "/login" },
];

export default new Router({
  routes: constantRoutes,
});
