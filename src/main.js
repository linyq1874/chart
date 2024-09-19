/**
 * 2、实现在页面渲染一个echarts多折线图。
需求要点：后端接口一次性返回不分页的10万条数据，
前端该如何处理，从而优雅显示并保证页面性能？请写出您的思路及代码。

思路：使用ECharts的dataZoom组件
ECharts的dataZoom组件允许用户对图表进行缩放和滑动，这可以配合动态加载使用，只渲染可视区域内的数据。
 */

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
