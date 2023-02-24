import { login, logout, getInfo } from "@/api/article";
import { setToken, getToken } from "@/utils/cookie";
const state = {
  token: getToken(),
  roles: [],
};
const getters = {
  toten: (state) => state.token,
  roles: (state) => state.roles,
};
const mutations = {
  // 改变状态
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
};
const actions = {
  // 管理/提交mutations
  // 登录
  Login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user)
        .then((res) => {
          if (res.code === 20000) {
            commit("SET_TOKEN", res.data.token);
            setToken(res.data.token); // 保存token到cookie
            resolve(res);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  // 获取详情
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((res) => {
          const { data } = res;
          if (!data) {
            reject("Verification failed, please Login again.");
          }
          commit("SET_ROLES", data.roles);
          resolve(data);
          console.log(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 退出
  Logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
