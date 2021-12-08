<script setup>
defineProps({
    data: Array,
    renderKey: {
        type: Function,
        default: (item, index) => index,
    },
    isSelect: {
        default: false,
        type: Boolean,
    },
    column: {
        type: Object,
        default: () => ({
            default: 4,
            1400: 3,
            1200: 2,
            900: 1,
            all: null,
        })
    }
});
const emit = defineEmits(["select"])
</script>

<template>
    <div class="select-container">
        <div class="select-item" v-for="(item, index) in data" :key="renderKey(item, index)">
            <slot :data="item"></slot>
            <transition name="select-operation">
                <div class="select-operation isSelect" v-show="isSelect" @click="emit('select', item)">
                    <slot name="select-operation" :data="item"></slot>
                </div>
            </transition>
            <div class="select-operation" v-show="!isSelect">
                <slot name="operation" :data="item"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.select-container {
    column-count: v-bind('column.all || column.default');
    // break-inside: avoid-page;
    padding: 6px 0;
}

@media screen and (max-width: 1400px) {
    .select-container {
        column-count: v-bind('column.all || column["1400"]');
    }
}

@media screen and (max-width: 1200px) {
    .select-container {
        column-count: v-bind('column.all || column["1200"]');
    }
}

@media screen and (max-width: 900px) {
    .select-container {
        column-count: v-bind('column.all || column["900"]');
    }
}

.select-item {
    position: relative;
    margin-bottom: 10px;
    cursor: zoom-in;
    &:hover {
        .select-operation {
            opacity: 1;
        }
    }
}

.select-operation {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    opacity: 0;
    transition: opacity .3s;
    background-color: rgba(0, 0, 0, 30%);
    pointer-events: none;
    & > * {
        cursor: pointer;
        pointer-events: auto;
        color: #fff;
        transition: color .3s;

        &:hover {
            color: #1890ff;
        }
    }

    &.isSelect {
        opacity: 1;
    }
}

.select-operation-enter-from, .select-operation-leave-active {
    opacity: 0!important;
}

</style>