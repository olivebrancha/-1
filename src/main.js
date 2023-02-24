import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import "./permission"; // 路由拦截

Vue.use(ElementUI);
Vue.config.productionTip = false;
// Vue.prototype.url = "http://1.116.64.64:5004";
Vue.prototype.url = "http://localhost:3000";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
