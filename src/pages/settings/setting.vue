<script setup>
import store from '@/store';

store.dispatch("settings/getSettings");
</script>


<template>
    <router-view />
</template>