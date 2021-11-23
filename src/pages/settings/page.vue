<script setup>
import { reactive } from "@vue/reactivity";

const formState = reactive({
    title: "",
    logo: "",
    ico: "",
    keywords: "",
    descriptions: "",
    copy: "",
    ipc: "",
    ip: "",
});

const formRules = {
    title: [
        { required: true, message: "请输入网站标题" }
    ]
}

</script>

<template>
    <a-form :model="formState" :rules="formRules">
        <a-form-item name="title" label="网站标题">
            <a-input v-model:value="formState.title" placeholder="网站标题"></a-input>
        </a-form-item>

        <a-form-item name="logo" label="LOGO配置">
            <a-input v-model:value="formState.title" placeholder="网站logo"></a-input>
        </a-form-item>

        <a-form-item name="ico" label="favicon">
            <a-input v-model:value="formState.title" placeholder="浏览器选项卡logo"></a-input>
        </a-form-item>

        <a-form-item name="keywords" label="favicon">
            <a-input v-model:value="formState.keywords" placeholder="站点关键词用作于SEO优化，多个关键词用 “ , ” 分割"></a-input>
        </a-form-item>

        <a-form-item name="keywords" label="favicon">
            <a-input v-model:value="formState.keywords" placeholder="站点描述用作于SEO优化，一般为标题补充作用"></a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 2 }">
            <a-button htmlType="submit" type="primary">修改</a-button>
        </a-form-item>
    </a-form>
</template>