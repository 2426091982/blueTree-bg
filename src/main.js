import { createApp } from "vue";
import { message } from "ant-design-vue";

import App from "./App.vue";
import router from "./router/index";
import "ant-design-vue/lib/message/style/index.css";
import store from "./store";

let app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

router.beforeEach((to, from, next) => {
    let isLogin = store.state.token; // 通过token判断是否登录
    if (!isLogin && to.path !== '/login') {
       message.error('您还未登录请先登录！', 2);
       return next('/login');
    } else if (isLogin && to.path === '/login') {
        let path = from.path;
        return next( (path === '/login') ? '/' : path );
    }
    next();
});
