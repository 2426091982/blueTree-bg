import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index";

let app = createApp(App);

app.use(router);
router.beforeEach(() => {
    console.log(123);
})
app.mount("#app");