$(function() {
    var layer = layui.layer;
    var form  = layui.form;
    function initCate() {
        $.ajax({
            type:"GET",
            url:"/my/article/cates",
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg("获取失败！");
                }

                layer.msg("获取成功！");
                var htmlStr = template("tpl-cate",res); 
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    };

    initCate();
    initEditor();

    var $image = $("#image");
    var options = {
        aspectRatio:400/280,
        preview:'.img-preview'
    };

    $image.cropper(options);

    $("#btnChooseImage").on("click",function() {
        $("#coverFile").click();
    });

    $("#coverFile").on("change",function(e) {
        var files = e.target.files;
        if(files.length === 0 ) {
            return layer.msg("请选择文件！");
        }

        var newimgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy')
            .attr("src",newimgURL)
            .cropper(options);
    });

    var art_state = '已发布';
    $("#btnSave2").on("click",function() {
        art_state = "草稿";
    });

    $("#form-pub").on("submit",function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state',art_state);

        //  把裁剪的图片转化为文件
        $image
            .cropper('getCroppedCanvas',{
                width:400,
                height:280
            })
            .toBlob(function(blob) {
                //  把文件对象存储到fd中
                fd.append('cover_img',blob);

              publishArticle(fd);
            })
    });

    function publishArticle(fd) {
        $.ajax({
            type:"POST",
            url:"/my/article/add",
            //  如果向服务器提交的是formdate格式数据，需要两个配置项
            data:fd,
            contentType:false,
            processData:false,
            success:function(res) {
                if(res.status !== 0 ) {
                    return layer.msg("发表失败！");
                }

                layer.msg("发表成功！");
                location.href = '../article/article-list.html';
            }
        })
    }
})