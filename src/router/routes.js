import { defineRoutes } from '@/utils/router-util';
import { SettingOutlined, HomeOutlined, PictureOutlined } from "@ant-design/icons-vue";

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
    {
        path: '/article',
        meta: {
            title: "文章管理",
            icon: SettingOutlined,
        },
        component: fragment,
        redirect: "/article/list",
        children: [
            {
                path: "list",
                component: () => import("@/pages/article/list"),
                meta: {
                    title: "文章列表"
                }
            },
            {
                path: "add",
                component: () => import("@/pages/article/add"),
                meta: {
                    title: "添加文章"
                }
            },
            {
                path: "classification",
                component: () => import("@/pages/article/classification"),
                meta: {
                    title: "文章分类管理"
                }
            },
        ]
    },
    {
        path: "/picture",
        component: fragment,
        redirect: "/picture/list",
        meta: {
            icon: PictureOutlined,
            title: "图片管理",
        },
        children: [
            {
                path: "list",
                component: () => import("@/pages/picture/picture-list"),
                meta: {
                    title: "图片列表",
                }
            },
            {
                path: "recycle",
                component: () => import("@/pages/picture/picture-recycle"),
                meta: {
                    title: "图片回收站",
                }
            },
        ]
    }
]);

// 1. 
export default routes;
