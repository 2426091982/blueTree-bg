<script setup>

</script>
<template>
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{item.meta.title}}
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>