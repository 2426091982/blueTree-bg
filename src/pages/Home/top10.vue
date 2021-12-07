<script setup>
import { Chart } from "@antv/g2";
import { onMounted } from "vue";

const data = [
    {
        type: "百度搜索",
        value: 6,
    },
    {
        type: "百度搜索2",
        value: 6,
    },
    {
        type: "百度搜索3",
        value: 6,
    },
    {
        type: "百度搜索4",
        value: 6,
    },
    {
        type: "百度搜索4",
        value: 6,
    },
    {
        type: "百度搜索5",
        value: 6,
    },
    {
        type: "百度搜索6",
        value: 6,
    },
    {
        type: "百度搜索7",
        value: 6,
    },
    {
        type: "百度搜索8",
        value: 6,
    },
    {
        type: "直接访问",
        value: 10
    },
]

onMounted(() => {
    const chart = new Chart({
        container: "home-top10",
        autoFit: true,
        height: 460,
    });
    chart.data(data);
    chart.legend(false);
    chart.interaction('tooltip');
    chart.axis('type', {
        title: null,
        tickLine: null,
        line: null,
        label: {
            style: {
                fontSize: 16,
                fontWeight: 300,
                fill: "#111",
            },
        }
    });
    chart.axis('value', {
        label: null,
        title: {
            offset: 20,
            style: {
                fontSize: 14,
                fontWeight: 300,
                fill: "#111",
            },
        },
    });
    chart.scale({
        value: {
            alias: "访问次数",
            min: 0,
            max: 12
        }
    });
    chart.coordinate().transpose();
    chart.interval().position("type*value").label("value", {
        style: {
            fill: '#111',
            fontSize: 16,
        },
        offset: 10,
    })
    chart.render();
})
</script>

<template>
    <a-card title="页面访问Top10" hoverable>
        <div id="home-top10"></div>
    </a-card>
</template>