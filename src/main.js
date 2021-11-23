import { createApp } from "vue";
import App from "./App.vue";
// 引入上面新建的路由文件
import router from "./router/index";
import "@/assets/style/iconfont.css";
let app = createApp(App);
app.use(router);

app.mount("#app");
