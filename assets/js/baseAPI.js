/*

每次使用jquery发起请求的时候，
会先调用这个函数，可以拿到请求中的配置对象

*/ 
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' +options.url;
})
