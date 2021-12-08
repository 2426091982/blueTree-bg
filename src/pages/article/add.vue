<script setup>
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, reactive } from "vue";
import dayjs from "dayjs";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";

import {
  getArticle,
  getArticleCategory,
  addArticle,
  updateArticle,
} from "@/api/article";
import { uploadImage } from "@/api/image";
const route = useRoute();
const router = useRouter();
// 获取文章id
const articleId = route.query.id;

// 分类数组
const classificationList = ref([]);

getArticleCategory().then((res) => {
  classificationList.value = res;
});

// 表单值
const formState = ref({
  // 文章标题
  title: "123",
  // 分类
  classification: 1,
  // 文章描述
  describe: "123",
  // 封面
  icon: "",
  // 文章内容
  content: "",
  // 发布日期
  releaseDate: dayjs("2003-06-04"),
  // 是否推荐文章
  Recommended: false,
  // 是否可见
  visibility: true,
});

// 判断是否有id,有就是修改，没有就是新增
if (articleId) {
  getArticle(articleId).then((res) => {
    console.log(res, 123123);
    formState.value = res;
    formState.value.classification = res.category;
    formState.value.describe = res.description;
    formState.value.icon = res.cover;
    formState.value.Recommended = res.nominate;
    formState.value.releaseDate = dayjs(res.date);
    fileList.push({
      uid: "1",
      name: "封面.png",
      status: "done",
      url: formState.value.icon,
      thumbUrl: formState.value.icon,
    });
  });
} else {
}

// 已经上传的封面列表
let fileList = reactive([]);
// 上传文件
const uploadIcon = (file, list) => {
  console.log(list);
  let form = new FormData();
  form.set("image", file);
  uploadImage(form).then((res) => {
  
    formState.value.icon = res.url;
  });

  return false;
};

// 保存html格式
const saveHtml = (h) => {
  // console.log(h);
};

// 表单规则
const formRules = {
  title: [{ required: true, message: "请输入文章标题" }],
  classification: [{ required: true, message: "文章分类" }],
  describe: [{ required: true, message: "请输入文章描述信息" }],
  icon: [{ required: false, message: "请上传封面" }],
  content: [{ required: true, message: "请输入网站 IPC 备案号" }],
};

const labelCol = {
  span: 2,
};

const wrapperCol = {
  span: 20,
};

const textareaRows = 4;

// 添加文章
const addNewArticle = (e) => {
  let params = {
    title: formState.value.title,
    description: formState.value.describe,
    cover: formState.value.icon,
    category: formState.value.classification,
    content: formState.value.content,
    // 处理过的日期
    date: dayjs(formState.value.releaseDate).format("YYYY-MM-DD"),
    nominate: formState.value.Recommended,
    visibility: formState.value.visibility,
  };
  if (articleId) {
    updateArticle(articleId,params).then(res => {
      message.success('修改文章成功!')
      router.push("/article/list")
      console.log(res);
    })
  } else {
    addArticle(params).then((res) => {
      message.success('新增文章成功!')
      router.push("/article/list")
      console.log(res);
    });
  }

  console.log(params);
};
</script>

<template>
  <a-form
    :model="formState"
    :rules="formRules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @finish="addNewArticle"
  >
    <a-form-item name="title" label="文章标题">
      <a-input v-model:value="formState.title" placeholder="文章标题"></a-input>
    </a-form-item>

    <a-form-item label="文章分类">
      <a-select
        style="width: 200px"
        v-model:value="formState.classification"
        placeholder="请选择文章分类"
      >
        <a-select-option v-for="item in classificationList" :value="item.id">{{
          item.name
        }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item name="describe" label="文章描述">
      <a-input
        v-model:value="formState.describe"
        placeholder="请输入文章描述"
      ></a-input>
    </a-form-item>

    <a-form-item label="发布时间">
      <a-space :size="12">
        <a-date-picker v-model:value="formState.releaseDate" />
      </a-space>
    </a-form-item>

    <a-form-item name="icon" label="封面">
      <a-upload
        v-model:file-list="fileList"
        action=""
        list-type="picture"
        :beforeUpload="uploadIcon"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          上传封面
        </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item name="Recommended" label="设为推荐文章">
      <a-switch v-model:checked="formState.Recommended" />
    </a-form-item>
    <a-form-item name="Recommended" label="是否可见">
      <a-switch v-model:checked="formState.visibility" />
    </a-form-item>

    <a-form-item>
      <MdEditorV3
        v-model="formState.content"
        @onHtmlChanged="saveHtml"
        @onUploadImg="onUploadImg"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: labelCol.span }">
      <a-button html-type="submit" type="primary">{{articleId ? "修改":"发布"}}文章</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
/deep/ .ant-form-item-control {
  margin-bottom: 10px;
}
</style>
