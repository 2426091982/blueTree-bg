<script setup>
import { reactive } from "@vue/reactivity";

const formState = reactive({
    title: "",  // 网站标题
    logo: "",   // LOGO配置
    ico: "",    // 选项卡logo
    keywords: "",  // 站点关键词
    descriptions: "",  // 站点描述
    copy: "",  // 版权信息
    ipc: "",   // IPC备案信息
    ip: "",    // 公安备案信息
});

const formRules = {
    title: [
        { required: true, message: "请输入网站标题" }
    ],
    keywords: [
        { required: true, message: "请输入网站关键词" }
    ],
    descriptions: [
        { required: true, message: "请输入网站描述信息" }
    ],
    copy: [
        { required: true, message: "请输入网站版权" }
    ],
    ipc: [
        { required: true, message: "请输入网站 IPC 备案号" }
    ],
    ip: [
        { required: true, message: "请输入网站公安备案信息" }
    ],
}

const labelCol = {
    span: 2,
}

const wrapperCol = {
    span: 20
}

const textareaRows = 4;

</script>

<template>
    <a-form :model="formState" :rules="formRules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item name="title" label="网站标题">
            <a-input v-model:value="formState.title" placeholder="网站标题"></a-input>
        </a-form-item>

        <a-form-item name="logo" label="LOGO配置">
            <a-input v-model:value="formState.title" placeholder="网站logo"></a-input>
        </a-form-item>

        <a-form-item name="ico" label="选项卡logo">
            <a-input v-model:value="formState.title" placeholder="浏览器选项卡logo"></a-input>
        </a-form-item>

        <a-form-item name="copy" label="版权信息">
            <a-input 
                v-model:value="formState.copy" 
                placeholder="网页底部的版权信息, 推荐格式：Copyright © 2020-2021 ***. All rights reserved."
            ></a-input>
        </a-form-item>

        <a-form-item name="ipc" label="IPC备案信息">
            <a-input v-model:value="formState.descriptions" placeholder="输入 IPC 备案号即可"></a-input>
        </a-form-item>

        <a-form-item name="ip" label="公安备案信息">
            <a-input v-model:value="formState.descriptions" placeholder="输入 公安备案信息即可"></a-input>
        </a-form-item>

        <a-form-item name="keywords" label="站点关键词">
            <a-textarea 
                v-model:value="formState.keywords" 
                placeholder="站点关键词用作于SEO优化，多个关键词用 “ , ” 分割"
                :rows="textareaRows"
            ></a-textarea>
        </a-form-item>

        <a-form-item name="descriptions" label="站点描述">
            <a-textarea 
                v-model:value="formState.descriptions" 
                placeholder="站点描述用作于SEO优化，一般为标题补充作用"
                :rows="textareaRows"
            ></a-textarea>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: labelCol.span }">
            <a-button htmlType="submit" type="primary">修改</a-button>
        </a-form-item>
    </a-form>
</template>

<style lang="less" scoped>
:deep(.ant-form-item-control) {
    margin-bottom: 10px;
}
</style>