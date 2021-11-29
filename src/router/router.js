import { createRouter } from "vue-router";
import store from '@/store';

import history from "./history";
import routes from "./routes";

const router = createRouter({
    history,
    routes
});

export default router;
