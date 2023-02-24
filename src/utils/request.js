import axios from "axios";
import { Message } from "element-ui";
import { getToken } from "./cookie";

const service = axios.create({
  baseURL: "/api",
  withCredentials: true, // 允许携带coolie
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const TOKEN_EXPIRES = 603;
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.data || "服务器错误",
        type: "error",
        duration: 2000,
      });

      if (res.code === TOKEN_EXPIRES) {
        window.location = '/#/login';
        window.location.reload();
        return 
      }

      return Promise.reject(new Error(res.data || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 2000,
    });
    return Promise.reject(error);
  }
);

export default service;
