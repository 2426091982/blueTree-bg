<script setup>
import { Chart } from "@antv/g2";
import { onMounted } from "vue";

const data = [
    {
        type: "第一周",
        value: 50,
    },
    {
        type: "第二周",
        value: 20,
    },
    {
        type: "第三周",
        value: 60,
    },
    {
        type: "第四周",
        value: 50,
    }
]

onMounted(() => {
    const chart = new Chart({
        container: "weekly-visit",
        autoFit: true,
        height: 460,
    });
    chart.data(data);
    chart.scale({
        value: {
            min: 0,
            max: 70,
            alias: "浏览量"
        }
    });
    chart.axis("type", {
        label: {
            offset: 20,
            style: {
                fontSize: 16
            }
        }
    });
    chart.line().position("type*value");
    chart.point().position("type*value").label("value", {
        offset: 20,
        style: {
            fontSize: 16
        }
    });
    chart.render();
})
</script>

<template>
    <a-card hoverable title="每周浏览量">
        <div id="weekly-visit"></div>
    </a-card>
</template>