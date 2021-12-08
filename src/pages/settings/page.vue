<script setup>
import { reactive, ref, watch } from "vue";
import store, { mapState } from "@/store";
import SelectImage from "@/components/select-image.vue";
import { message } from "ant-design-vue";

let {
    pageConf
} = mapState("settings", ["pageConf"]);
const model = reactive({
    title: "",  // 网站标题
    logo: "",   // LOGO配置
    favicon: "",    // 选项卡logo
    keywords: [],  // 站点关键词
    description: "",  // 站点描述
    copyright: "",  // 版权信息
    icp_license: "",   // IPC备案信息   
    public_ecurity_license: "",    // 公安备案信息
});

watch(
    () => pageConf.value,
    () => {
        Object.keys(model).forEach(key => {
            model[key] = pageConf.value[key];
        });
        model.keywords = pageConf.value["keywords"];
    },
    {
        immediate: true,
    }
)

const submit = async () => {
    await store.dispatch("settings/patchSettings", model)
    message.success("更新设置成功");
}


const formRules = {
    // title: [
    //     { required: true, message: "请输入网站标题" }
    // ],
    // keywords: [
    //     { required: true, message: "请输入网站关键词" }
    // ],
    // descriptions: [
    //     { required: true, message: "请输入网站描述信息" }
    // ],
    // copy: [
    //     { required: true, message: "请输入网站版权" }
    // ],
    // ipc: [
    //     { required: true, message: "请输入网站 IPC 备案号" }
    // ],
    // ip: [
    //     { required: true, message: "请输入网站公安备案信息" }
    // ],
}

const labelCol = {
    span: 2,
}

const wrapperCol = {
    span: 20
}

const handleChange = (value) => {
    
}

</script>

<template>
    <a-form :model="model" :rules="formRules" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="submit">
        <a-form-item name="title" label="网站标题">
            <a-input v-model:value="model.title" placeholder="网站标题"></a-input>
        </a-form-item>

        <a-form-item name="logo" label="LOGO配置">
            <SelectImage v-model:src="model.logo" />
        </a-form-item>

        <a-form-item name="favicon" label="选项卡logo">
            <SelectImage v-model:src="model.favicon" />
        </a-form-item>

        <a-form-item name="copyright" label="版权信息">
            <a-input 
                v-model:value="model.copyright" 
                placeholder="网页底部的版权信息, 推荐格式：Copyright © 2020-2021 ***. All rights reserved."
            ></a-input>
        </a-form-item>

        <a-form-item name="icp_license" label="IPC备案信息">
            <a-input v-model:value="model.icp_license"></a-input>
        </a-form-item>
        
        <a-form-item name="public_ecurity_license" label="公安备案信息">
            <a-input v-model:value="model.public_ecurity_license"></a-input>
        </a-form-item>

        <a-form-item name="keywords" label="站点关键词">
            <a-select
                v-model:value="model.keywords"
                mode="tags"
                style="width: 100%;"
                :token-separators="[',']"
                placeholder="站点关键词"
                @change="handleChange"
            ></a-select>
        </a-form-item>

        <a-form-item name="description" label="站点描述">
            <a-textarea v-model:value="model.description" :rows="4"></a-textarea>
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