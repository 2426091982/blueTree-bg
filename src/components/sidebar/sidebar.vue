<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const openKeys = ref([]);
const selectedKeys = ref([]);

watch(
    route,
    () => {
        if (route.matched.length === 1) {
            if ( !selectedKeys.value.includes(route.matched[0].path) ) {
                selectedKeys.value = [route.matched[0].path];
            }
        }
        if (route.matched.length === 2) {
            if ( !openKeys.value.includes(route.matched[0].path) ) {
                openKeys.value = [route.matched[0].path];
            };
            if ( !selectedKeys.value.includes(route.matched[1].path) ) {
                selectedKeys.value = [route.matched[1].path];
            };
        }
    },
    {
        immediate: true,
        deep: true,
    }
)
</script>

<template>
    <div class="logo">aaaa</div>
    <a-menu theme="dark" mode="inline" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" class="navs">
        <template v-for="item in $router.options.routes">
            <template v-if="item.children">
                <a-sub-menu :key="item.path">
                    <template #title>
                        <component
                            :is="item.meta.icon" 
                            v-if="item.meta && item.meta.icon"
                        />
                        <span class="menu-title">
                            {{item.meta.title}}
                        </span>
                    </template>

                    <a-menu-item 
                        v-for="childRoute in item.children" 
                        :key="`${item.path}/${childRoute.path}`"
                        @click="$router.push(`${item.path}/${childRoute.path}`)"
                    >
                        <component
                            :is="childRoute.meta.icon" 
                            v-if="childRoute.meta && childRoute.meta.icon"
                        />
                        <span class="menu-title">
                            {{childRoute.meta.title}}
                        </span>
                    </a-menu-item>
                </a-sub-menu>
            </template>

            <template v-else>
                <a-menu-item
                    :key="`${item.path}`"
                    @click="$router.push(item.path)"
                >
                    <component
                        :is="item.meta.icon" 
                        v-if="item.meta && item.meta.icon"
                    ></component>
                    <span class="menu-title">
                        {{item.meta.title}}
                    </span>
                </a-menu-item>
            </template>
        </template>
    </a-menu>
</template>

<style lang="less">
.menu-title {
    margin-left: 10px;
    transition: color .3s;
}

.navs {
    user-select: none;
}
</style>