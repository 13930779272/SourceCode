xhr.onreadyststechange:监控发送请求状态
0-4:0监控不到
0：请求未初始化
1：服务器连接已建立
2：请求已接收
3：请求处理中
4：请求处理完毕，且响应已就绪

ajax交互模型
创建一个XMLHttpRequest对象
填写请求方式，请求地址，是否异步
发送请求
监控响应数据
接受响应数据

uri编码转中文
 decodeURI() | decodeURIComponent

中文转URI码
 encodeURI | encodeURIComponent