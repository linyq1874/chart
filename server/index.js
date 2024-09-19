/* eslint-disable no-undef */
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const COUNT = 10 * 10000;

function getRandomDate(start, end) {
    // 将日期字符串转换为Date对象
    const startDate = new Date(start);
    const endDate = new Date(end);

    // 获取时间差
    const timeDiff = endDate.getTime() - startDate.getTime();

    // 生成一个0到1之间的随机数，然后乘以时间差
    const randomTime = Math.random() * timeDiff;

    // 将随机时间加到开始时间
    const randomDate = new Date(startDate.getTime() + randomTime);

    // 返回格式化的日期字符串，这里以YYYY-MM-DD为例
    return (
        randomDate.getFullYear() +
        '-' +
        ('0' + (randomDate.getMonth() + 1)).slice(-2) +
        '-' + // 月份是从0开始的
        ('0' + randomDate.getDate()).slice(-2)
    );
}

// 路由处理函数
router.get('/api/data', async (ctx) => {
    ctx.body = Array.from({ length: COUNT }, () => ({
        timestamp: getRandomDate('2013-01-01', '2024-12-31'),
        value1: (Math.random() * 100) >> 0,
        value2: (Math.random() * 100) >> 0
    }));
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
