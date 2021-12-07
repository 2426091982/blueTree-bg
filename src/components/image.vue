<script setup>
import { PictureFilled } from "@ant-design/icons-vue";
defineProps({
    src: String,
})
</script>

<template>
    <a-image :src="src">

        <template #fallback>
            <slot name="fallback">
                <PictureFilled />
                图片加载失败
            </slot>
        </template>
    </a-image>
</template>