<script setup>
import { Chart } from "@antv/g2";
import { onMounted } from "vue";

const data = [
    {
        type: "新闻中心",
        value: 20,
    },
    {
        type: "业务中心",
        value: 20,
    },
    {
        type: "关于我们",
        value: 20,
    },
    {
        type: "关于我们",
        value: 20,
    },
    {
        type: "详情",
        value: 20,
    },
    {
        type: "详情2",
        value: 20,
    },
    {
        type: "详情3",
        value: 20,
    },
    {
        type: "首页",
        value: 30,
    },
]

onMounted(() => {
    const chart = new Chart({
        container: "home-average-time",
        autoFit: true,
        height: 460,
    });
    chart.axis("type", {
        title: null,
        line: null,
        tickLine: null,
        label: {
            style: {
                fontSize: 16
            }
        }
    });
    chart.axis("value", {
        label: null,
        title: {
            offset: 20,
        }
    });
    chart.scale({
        value: {
            alias: "页面访问时长",
            min: 0,
            max: 120
        }
    })
    chart.data(data);
    chart.interval().position("type*value").label("value", {
        offset: 10,
        style: {
            fontSize: 16,
        }
    })
    chart.coordinate().transpose();
    chart.render();
});
</script>

<template>
    <a-card hoverable title="平均访问时长">
        <div id="home-average-time">

        </div>
    </a-card>
</template>