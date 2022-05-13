$(function() {
    // 点击注册账号的连接
    $("#link-login").on("click",function() {
        $(".login-box").hide().siblings(".reg-box").show();
    });
   
    // 点击登录的连接
    $("#link-reg").on("click",function() {
        $(".reg-box").hide().siblings(".login-box").show();
    });

    // 从layui中获取form对象
     var form = layui.form;
     var layer = layui.layer;
     // 通过form.verify 来自定义校验规则
     form.verify({
         pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ],
          // 判断两次密码是否一致
          repwd:function(value) {
            var pwd = $(".reg-box [name=user-pwd]").val();
            if(pwd !== value) {
                return "两次密码不一致";
            }
          }
     });

     // 监听注册表填的提交事件
     $("#form-reg").on("submit",function(e) {
        e.preventDefault();
        var data = {
            username:$('#form-reg [name=user-name]').val(),
            password:$('#form-reg [name=user-pwd]').val()
        };
        $.post("/api/reguser",data,
        function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message);
            } 
           layer.msg("注册成功，请登录！");
           $("#link-reg").click();
        })
     });

     // 监听表单的提交事件
     $("#form-login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/api/login",
            data: $(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登陆成功！");
                // 将登录成功得到的token字符串保存到local本地
                 localStorage.setItem('token',res.token);
                location.href = 'index.html';
            }
        });
     });    
});