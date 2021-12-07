<script setup>
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, reactive } from "vue";
import dayjs from "dayjs";
import { useRouter, useRoute } from "vue-router";
import { getArticle } from "@/api/article";
import { uploadImage } from "@/api/image";
const route = useRoute();
// 获取文章id
const articleId = route.query.id;

// 表单值
const formState = ref({
  // 文章标题
  title: "",
  // 分类
  classification: "",
  // 文章描述
  describe: "",
  // 封面
  icon: "",
  // 文章内容
  content: "",
  // 发布日期
  releaseDate: "",
  //发布时间
  releaseTime: "",
  // 标题seo
  titleSEO: "",
  // 描述seo
  describeSEO: "",
  // 是否推荐文章
  Recommended: false,
});

// 判断是否有id,有就是修改，没有就是新增
if (articleId) {
  getArticle(articleId).then((res) => {
    console.log(res,123123);
    formState.value = res;
    formState.value.classification = res.category;
    formState.value.describe = res.description;
    formState.value.icon = res.cover;
    formState.value.Recommended = res.nominate === 1;
  });
} else {
}

// 已经上传的封面列表
let fileList = reactive([]);
// 上传文件
const uploadIcon = (file, list) => {
  let form = new FormData()
  form.set("image", file)
  console.log(form);
  uploadImage(form).then(res => {
    console.log(res);
  })
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
  titleSEO: [{ required: false, message: "请输入网站公安备案信息" }],
  describeSEO: [{ required: false, message: "请输入网站公安备案信息" }],
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
  console.log(formState);
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
        style="width: 100px"
        v-model:value="formState.classification"
        placeholder="请选择文章分类"
      >
        <a-select-option value="jiuye">就业资讯</a-select-option>
        <a-select-option value="xinwen">新闻动态</a-select-option>
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
        <a-time-picker v-model:value="formState.releaseTime" />
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

    <a-form-item name="titleSEO" label="文章关键词">
      <a-input
        v-model:value="formState.titleSEO"
        placeholder="输入文章关键词"
      ></a-input>
    </a-form-item>

    <a-form-item name="describeSEO" label="描述关键词">
      <a-input
        v-model:value="formState.describeSEO"
        placeholder="输入文章描述关键词"
      ></a-input>
    </a-form-item>

    <a-form-item name="Recommended" label="设为推荐文章">
      <a-switch v-model:checked="formState.Recommended" />
    </a-form-item>

    <a-form-item>
      <MdEditorV3
        v-model="formState.content"
        @onHtmlChanged="saveHtml"
        @onUploadImg="onUploadImg"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: labelCol.span }">
      <a-button html-type="submit" type="primary">添加文章</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
/deep/ .ant-form-item-control {
  margin-bottom: 10px;
}
</style>
