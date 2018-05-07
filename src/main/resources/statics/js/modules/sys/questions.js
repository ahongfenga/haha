$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/questions/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			//{ label: '问题类型', name: 'type', index: 'TYPE', width: 80 }, 			
			{ label: '问题名', name: 'name', index: 'NAME', width: 80 }, 			
			{ label: '所属问卷', name: 'questionCode', index: 'QUESTION_CODE', width: 80 }, 			
			{ label: '问题分值', name: 'score', index: 'SCORE', width: 80 }, 			
			//{ label: '问题排序', name: 'orderNum', index: 'ORDER_NUM', width: 80 }, 			
			//{ label: '收录时间', name: 'dtInsert', index: 'DT_INSERT', width: 80 }, 			
			//{ label: '状态  0：禁用   1：正常', name: 'status', index: 'STATUS', width: 80 }, 			
			//{ label: '问题描述', name: 'describ', index: 'DESCRIB', width: 80 }, 			
			//{ label: '', name: 'userId', index: 'USER_ID', width: 80 }, 			
			//{ label: '问题答案', name: 'questionAns', index: 'QUESTION_ANS', width: 80 }, 			
			//{ label: '类型排序', name: 'orderTitle', index: 'ORDER_TITLE', width: 80 }, 			
			{ label: '问题标题', name: 'title', index: 'TITLE', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		 q:{
				questionCode: null
		    },
		showList: true,
		title: null,
		questions: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.questions = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.questions.id == null ? "sys/questions/save" : "sys/questions/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.questions),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/questions/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "sys/questions/info/"+id, function(r){
                vm.questions = r.questions;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'questionCode': vm.q.questionCode},
                page:page
            }).trigger("reloadGrid");
		}
	}
});