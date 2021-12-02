import { createApp } from "vue";
import { message } from "ant-design-vue";
import store from "@/store/index";
import App from "./App.vue";
import router from "./router/index";
import "ant-design-vue/dist/antd.css";
// md 编辑器
import MdEditorV3 from "md-editor-v3";
import "md-editor-v3/lib/style.css";
message.config({
  // 配置全局提示信息
  duration: 2,
  maxCount: 3,
});

let app = createApp(App);
app.use(router);
app.use(store);
app.use(MdEditorV3);

app.mount("#app");

router.beforeEach((to, from, next) => {
  let isLogin = store.state.token; // 通过token判断是否登录
  if (!isLogin && to.path !== "/login") {
    message.error("您还未登录请先登录！", 2);
    return next("/login");
  } else if (isLogin && to.path === "/login") {
    let path = from.path;
    return next(path === "/login" ? "/" : path);
  }
  next();
});
