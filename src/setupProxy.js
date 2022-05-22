const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {  
      target: 'http://localhost:8080', 
      changeOrigin: true, 
      pathRewrite: {'^/api': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }) 	
  )
}
// const { createProxyMiddleware } = require("http-proxy-middleware")
// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware("/api1",{
//       target: "http://localhost:5000", //配置转发目标地址(能返回数据的服务器地址)
//       changeOrigin: true, //控制服务器接收到的请求头中host字段的值
//       pathRewrite: { "^/api1": "" }, 
//     }),
//     createProxyMiddleware("/api2",{
//       target: "http://localhost:5001", //配置转发目标地址(能返回数据的服务器地址)
//       changeOrigin: true, //控制服务器接收到的请求头中host字段的值
//       pathRewrite: { "^/api2": "" }, 
//     })
//   )
// }

