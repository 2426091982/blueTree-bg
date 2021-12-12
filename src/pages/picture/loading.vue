<script setup>
import { LoadingOutlined } from "@ant-design/icons-vue";

import { mapState } from "@/store";

let {
    isRequestImages,
    requestingText
} = mapState("image", ["isRequestImages", "requestingText"])
</script>

<template>
    <transition name="opacity">
        <div class="picture-loading" v-show="isRequestImages">
            <LoadingOutlined spin />
            {{requestingText}}
        </div>
    </transition>
</template>

<style lang="less" scoped>
.picture-loading {
    color: #1890ff;
    justify-content: center;
    display: flex;
    column-gap: 10px;
    margin-top: 10px;
}

:deep(.anticon) {
    font-size: 20px;
}
</style>