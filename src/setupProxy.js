const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy tất cả /api requests tới backend
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:7276',
      changeOrigin: true,
      secure: false, // Cho phép HTTPS không valid cert
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log(`🔄 Proxying ${req.method} ${req.url} to https://localhost:7276${req.url}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log(`✅ Proxy response: ${proxyRes.statusCode} for ${req.url}`);
      },
      onError: (err, req, res) => {
        console.error('❌ Proxy error:', err.message);
      }
    })
  );
};