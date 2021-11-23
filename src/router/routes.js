import { defineRoutes } from '@/utils/router-util';
import { SettingOutlined, HomeOutlined } from "@ant-design/icons-vue";

import fragment from '@/components/fragment'; // <router-view />

const routes = defineRoutes([
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/home'),
        meta: {
            title: '首页',
            icon: HomeOutlined,
        }
    },
    {
        path: '/setting',
        meta: {
            title: "基本配置",
            icon: SettingOutlined,
        },
        component: fragment,
        redirect: "/setting/page",
        children: [
            {
                path: "page",
                component: () => import("@/pages/settings/page"),
                meta: {
                    title: "页面配置"
                }
            },
            {
                path: "banner",
                component: () => import("@/pages/settings/banner"),
                meta: {
                    title: "轮播图管理"
                }
            }
        ]
    },
]);

// 1. 
export default routes;
