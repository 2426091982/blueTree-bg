<script setup>
import { getSettings } from '@/api/settings';

getSettings().then(res => {
    console.log(res);
})

console.log(123);
</script>


<template>
    <router-view />
</template>