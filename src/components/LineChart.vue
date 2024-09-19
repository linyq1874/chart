<template>
    <div ref="chartRef" style="width: 100%; height: 600px"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const chartRef = ref(null);

const fetchData = async () => {
    const response = await axios.get('/api/data');
    return response.data;
};

const renderChart = (data) => {
    const chart = echarts.init(chartRef.value);
    const START = 0;
    const END = 0.1;

    const option = {
        title: {
            text: '多折线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['动态列表', '多折线图']
        },
        xAxis: {
            type: 'category',
            data: data.map((item) => item.timestamp)
        },
        yAxis: {
            type: 'value'
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                start: START,
                end: END,
                xAxisIndex: [0]
            },
            {
                type: 'inside',
                start: START,
                end: END,
                xAxisIndex: [0]
            }
        ],
        series: [
            {
                name: '动态列表',
                type: 'line',
                data: data.map((item) => item.value1)
            },
            {
                name: '多折线图',
                type: 'line',
                data: data.map((item) => item.value2)
            }
        ]
    };

    chart.setOption(option);
};

onMounted(async () => {
    const data = await fetchData();
    // 排序
    data.sort((a, b) => {
        if (a.timestamp > b.timestamp) return 1;
        else if (a.timestamp < b.timestamp) return -1;
        else return 0;
    });

    renderChart(data);
});
</script>
