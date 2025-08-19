const next = require('next');

let app;
let handle;

// 为了避免每次请求都重新初始化，做成单例
async function getApp() {
  if (!app) {
    app = next({
      dev: false,
      dir: __dirname + '/../', // 项目根目录
    });
    handle = app.getRequestHandler();
    await app.prepare();
  }
  return { app, handle };
}

module.exports = async (req, res) => {
  const { handle } = await getApp();
  return handle(req, res);
};
