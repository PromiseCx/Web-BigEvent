$(function() {

    // 获取用户基本的信息
    getUserInfo();

    var layer = layui.layer;
    $("#btn-logout").on("click",function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem("token");
            location.href = './login.html';
            layer.close(index);
          });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // 请求头
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！");
            }

            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
     var name = user.nickname || user.username;
     $("#welcome").html("欢迎&nbsp;&nbsp;"+name);
     if(user.user_pic !== null) {
        $(".layui-nav-img").attr("src",user.user_pic).show();
        $(".text-avatar").hide();
     }else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
     }   
}