$(function() {
    var layer = layui.layer;
    var form = layui.form;

    function initArtCateList() {
        $.ajax({
            type:"GET",
            url:"/my/article/cates",
            success:function(res) {
                var htmlStr = template("tpl-table",res);
                $("tbody").html(htmlStr);
            }
        });
    };
    initArtCateList();

    var index = null;

    $("#btnAddCate").on("click",function() {
        index=layer.open({
            title:"添加文章分类",
            type:1,
            area:["500px","250px"],
            content:$("#dialog-add").html()
        })
    });

    /*
        给表单form-add绑定事件的时候，
        不能直接给其添加，要通过事件代理的方式
    */

    $("body").on("submit","#form-add",function(e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg("新增失败！");
                }
                initArtCateList();
                layer.msg("新增成功！");
                layer.close(index);
            }
        })
    });

    var indexEdit = null;
    $("tbody").on("click",".btn-edit",function(e) {
        indexEdit=layer.open({
            title:"修改文章分类",
            type:1,
            area:["500px","250px"],
            content:$("#dialog-edit").html()
        })

        var id = $(this).attr("data-Id");
        $.ajax({
            type:"GET",
            url:"/my/article/cates/"+id,
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg("获取失败！");
                }
                // 快速填充表单的值，layui要给表单添加lay-filter的属性val（）进行快速填充值
                form.val("form-edit",res.data);

            }
        });
    });

    $("body").on("submit","#form-edit",function(e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg("更新数据失败！");
                }

                layer.msg("更新数据成功！");
                layer.close(indexEdit);
                initArtCateList();
            }
        });
    });

    $("tbody").on("click",".btn-delete",function() {
       var id = $(this).attr("data-id");
       layer.confirm('确认删除?', 
        {icon: 3, title:'提示'}, function(index){
           $.ajax({
               type:"GET",
               url:"/my/article/deletecate/"+id,
               success : function(res) {
                   if(res.status !==0 ) {
                       return layer.msg("删除失败！");
                   }

                   layer.msg("删除成功！");
                   layer.close(index);
                   initArtCateList();
               }
           })
      }); 
    });

})