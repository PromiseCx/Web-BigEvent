$(function() {
    var form = layui.form;
    var layer  = layui.layer;
    form.verify({
        nickname:function(value) {
            if(value.length > 6) {
                return "昵称长度必须在 1-6个字符内!";
            }
        }      
    })
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            typr:"GET",
            url:"/my/userinfo",
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg("获取用户信息失败!");
                }
                form.val("formUserInfo",res.data);
            }
        })
    };

    $("#btnRest").on("click",function(e) {
        e.preventDefault();
        initUserInfo();
    });

    $(".layui-form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg("更新用户信息失败!");
                }
                layer.msg("更新用户信息成功!");
                // 调用父页面的方法更新用户的信息
                window.parent.getUserInfo();
            }
        })
    });


})