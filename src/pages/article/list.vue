<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs, computed } from "vue";
// 数据
const data = [
  {
    key: "1",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "2",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
  {
    key: "3",
    title: "红树林入职到挨叼",
    classification: "资讯文章",
    date: "2021/11/28",
    recommended: true,
  },
];

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

// 取消全选
const start = () => {
  state.loading = true; // ajax request after empty completing

  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};

const onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
const columns = [
  {
    title: "文章标题",
    dataIndex: "title",
    key: "title",
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
    title: "文章分类",
    dataIndex: "classification",
    key: "classification",
  },
  {
    title: "是否推荐",
    dataIndex: "recommended",
    key: "recommended",
  },
  {
    title: "更新日期",
    dataIndex: "date",
    key: "date",
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.address.toString().toLowerCase().includes(value.toLowerCase()),
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
    <!-- <div class="article-list"> -->
        <div style="margin-bottom: 16px">
            <a-space :size="10">
                <a-button
                    type="primary"
                    :disabled="!hasSelected"
                    :loading="loading"
                    @click="start"
                >
                    新增
                </a-button>
                <a-button
                    type="primary"
                    :disabled="!hasSelected"
                    :loading="loading"
                    @click="start"
                    danger
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
            <template #headerCell="{ column, record }">
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
                    :placeholder="`搜索 ${column.dataIndex}`"
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
                    <template #icon>
                        <SearchOutlined />
                    </template>
                    查找
                </a-button>
                <a-button
                    style="width: 90px"
                    @click="handleReset(clearFilters)"
                >
                    重置
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

                <template v-if="column.key === 'recommended'">
                    <span style="color: #1890ff">
                    {{ record.recommended ? "是" : "否" }}
                    </span>
                </template>

                <template v-if="column.key === 'operation'">
                    <a>编辑文章</a>
                </template>
            </template>
        </a-table>
    <!-- </div> -->
</template>
