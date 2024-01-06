const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
/**
 * 프록시는 클라이언트와 서버 간의 포트 번호가 일치하지 않더라도,
 * 임의로 일치하게 만드는 기능을 함
 * 
 * 프록시 서버: 방화벽, 앱 필터, 캐쉬 데이터, 공유 데이터 제공 기능을 제공함
 */