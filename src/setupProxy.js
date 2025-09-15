const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy tất cả /api requests tới backend
  // CHỈ dùng trong development mode
  const target = process.env.REACT_APP_PROXY_TARGET || 'https://localhost:7276';
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      secure: false, // Cho phép HTTPS không valid cert
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {},
      onProxyRes: (proxyRes, req, res) => {},
      onError: (err, req, res) => {}
    })
  );

  // Proxy uploads/static files 
  app.use(
    '/uploads',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {},
      onError: (err, req, res) => {}
    })
  );

  // NOTE: Không proxy /static vì conflict với React's static assets
};