<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs, computed } from "vue";
import { message } from "ant-design-vue";
import {
  getArticleCategory,
  addArticleCategory,
  updateArticleCategory,
  removeArticleCategory,
} from "@/api/article";

const inputValue = ref();
const updateId = ref();
// 数据
const data = ref([
  {
    name: "ssss",
    id: 1,
  },
]);

// 初始化
const init = () => {
  getArticleCategory().then((res) => {
    console.log(res);
    data.value = res;
    data.value.map((item) => {
      item.key = item.id;
    });
    inputValue.value = "";
    updateId.value = "";
    state.selectedRowKeys = [];
  });
};
init();

const visible = ref(false);

// 模态框
const showModal = (record) => {
  if (record) {
    inputValue.value = record.name;
    updateId.value = record.id;
  }
  visible.value = true;
};

const handleOk = (e) => {
  if (inputValue.value && updateId.value) {
    // 修改分类
    updateArticleCategory(updateId.value, inputValue.value).then((res) => {
      message.success("修改分类成功!");

      init();
    });
  } else if (inputValue.value) {
    // 添加分类
    addArticleCategory(inputValue.value).then((res) => {
      message.success("新增分类成功!");

      init();
    });
  }
  visible.value = false;
};

// 保存的状态
const state = reactive({
  searchText: "",
  searchedColumn: "",
  selectedRowKeys: [],
  // Check here to configure the default column
  loading: false,
});
// 结构暴露
const { searchText, searchedColumn, selectedRowKeys, loading } = toRefs(state);
const searchInput = ref();
// 是否全选
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

// 删除分类
const removeCategory = () => {
  state.loading = true; // ajax request after empty completing
  console.log(state.selectedRowKeys);
  state.selectedRowKeys.forEach((item) => {
    removeArticleCategory(item).then((res) => {
      console.log(res);
      state.loading = false;
      message.success("删除分类成功!");
      init();
    });
  });
};

const onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
const columns = [
  {
    title: "文章分类",
    dataIndex: "classificationId",
    key: "classificationId",
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters) => {
  clearFilters();
  state.searchText = "";
};
</script>
<template>
  <div style="margin-bottom: 16px">
    <a-space :size="10">
      <a-button type="primary" @click="showModal"> 新增 </a-button>
      <a-button
        type="danger"
        :disabled="!hasSelected"
        :loading="loading"
        @click="removeCategory"
      >
        删除
      </a-button>
    </a-space>
    <span style="margin-left: 8px">
      <template v-if="hasSelected">
        {{ `已经选择 ${selectedRowKeys.length} 项` }}
      </template>
    </span>
  </div>
  <a-table
    :data-source="data"
    :columns="columns"
    :row-selection="{
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
    }"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'title'">
        <span style="color: #1890ff">文章标题</span>
      </template>
    </template>
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`搜索 ${column.title}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          查找
        </a-button>
        <a-button style="width: 90px" @click="handleReset(clearFilters)"
          >重置
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ text, column, record }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>

      <template v-if="column.key === 'classificationId'">
        <div>
          <a-tag color="pink">{{ record.name }}</a-tag>
        </div>
      </template>
      <template v-if="column.key === 'operation'">
        <a @click="showModal(record)">修改分类名称</a>
      </template> </template
    >+
  </a-table>
  <a-modal v-model:visible="visible" title="设置分类名称" @ok="handleOk">
    <a-input v-model:value="inputValue"></a-input>
  </a-modal>
</template>
