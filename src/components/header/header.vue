<script setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { logout } from '@/utils' 
</script>

<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
                <a-avatar :size="40">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
            </a>
            <!-- <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <a href="javascript:;">1st menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;">2nd menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;">3rd menu item</a>
                    </a-menu-item>
                </a-menu>
            </template> -->
        </a-dropdown>
        <a-popconfirm
            title="你确定退出登录吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="logout(false)"
        >
            <a-button type="link">退出登录</a-button>
        </a-popconfirm>
    </a-layout-header>
</template>

<style lang="less">
header {
    display: flex;
    padding-right: 40px !important;
    width: 100%;
    height: 80px;
    justify-content: flex-end;
    align-items: center;
}
</style>