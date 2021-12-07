<script setup>
import { LogoutOutlined, FileTextOutlined } from "@ant-design/icons-vue";
import { logout } from "@/utils";

import Top10 from "./top10";
import AverageTime from "./average-time";
import WeeklyUser from "./weekly-user";
import WeeklyVisit from "./weekly-visit";

const gutter = [20, 20];
</script>

<template>
    <a-space class="home" direction="vertical" :size="20">
        <a-row :gutter="gutter">
            <a-col :span="8">
                <a-card hoverable>
                    <a-card-meta title="admin" description="上次登录时间：2021-11-30">
                        <template #avatar>
                            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </template>
                    </a-card-meta>
                    <template #actions>
                        <a-popconfirm
                            title="确定退出登录 ？"
                            @confirm="logout"
                            placement="bottom"
                        >
                            <LogoutOutlined /> 退出登录
                        </a-popconfirm>
                    </template>
                </a-card>
            </a-col>
            <a-col :span="16">
                <a-row :gutter="gutter" style="height: 100%;">
                    <a-col :span="8">
                        <a-card hoverable class="page-tips">
                            <!-- <template #cover>
                                <FileTextOutlined style="font-size: 30px;"/>
                            </template> -->
                            文章总数： <a-tag>1111</a-tag>
                        </a-card>
                    </a-col>
                    <a-col :span="8">
                        <a-card hoverable class="page-tips">
                            今日访客数：<a-tag>1111</a-tag>
                        </a-card>
                    </a-col>
                    <a-col :span="8">
                        <a-card hoverable class="page-tips">
                            今日浏览量：<a-tag>1111</a-tag>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row :gutter="gutter">
            <a-col :span="12">
                <Top10 />
            </a-col>
            <a-col :span="12">
                <AverageTime />
            </a-col>
            <a-col :span="12">
                <WeeklyUser />
            </a-col>
            <a-col :span="12">
                <WeeklyVisit />
            </a-col>
        </a-row>
    </a-space>
</template>

<style lang="less" scoped>
.home {
    margin-top: 20px;
    width: 100%;
}

.page-tips {
    height: 100%;
}

:deep(.ant-space-item) {
    margin-top: 20px;
    
}
</style>