$(function() {
    var form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须是6-12位的非空字符"],
        samePwd : function(value) {
            if(value === $('[name=oldPwd]').val()) {
                return "新密码不能与原密码相同！";
            }
        },
        rePwd:function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致！';
            }
        }
    });

    $('.layui-form').on("submit",function(e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/my/updatepwd",
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layui.layer.msg("更新密码失败！");
                }
                layui.layer.msg("跟新密码成功！");
                $(".layui-form")[0].reset();
            }
        })
    })
})