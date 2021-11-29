import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index";
import "ant-design-vue/dist/antd.css";

let app = createApp(App);

app.use(router);
app.mount("#app");
