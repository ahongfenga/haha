$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tstudent/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'ID', width: 0, key: true },
        	{ label: '学号', name: 'studentId', index: 'STUDENT_ID', width: 80 }, 			
			{ label: '姓名', name: 'name', index: 'NAME', width: 80 }, 			
			//{ label: '昵称', name: 'nickName', index: 'NICK_NAME', width: 80 }, 			
			//{ label: '', name: 'photo', index: 'PHOTO', width: 80 }, 			
			{ label: '性别 ', name: 'sex', index: 'SEX', width: 80 , formatter: function(value, options, row){
				return value === 0 ? 
						'男' : 
						'女';
				}}, 			
			{ label: '年龄', name: 'age', index: 'AGE', width: 80 }, 			
			{ label: '出生日期', name: 'dateBirth', index: 'DATE_BIRTH', width: 80 }, 			
			{ label: '班级', name: 'stclass', index: 'STCLASS', width: 80 }, 			
			//{ label: '学校', name: 'school', index: 'SCHOOL', width: 80 }, 			
			{ label: '状态', name: 'status', index: 'STATUS', width: 80, formatter: function(value, options, row){
			return value === 0 ? 
					'<span class="label label-danger">禁用</span>' : 
					'<span class="label label-success">正常</span>';
			}}
			//, 			 			
			//{ label: '问卷', name: 'id', index: 'ID', width: 80, formatter: function(value, options, row){
			//	return 	'<span class="btn btn-primary"  onclick="btn_detail('+row.id+')">家庭反馈</span>';
			//}}, 			 			
			//{ label: '', name: 'dtInsert', index: 'DT_INSERT', width: 80 }, 			
			//{ label: '排序', name: 'orderNum', index: 'ORDER_NUM', width: 80 }, 			
			//{ label: '', name: 'delFlag', index: 'DEL_FLAG', width: 80 }			
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
//问卷明细
function btn_detail(id) {
	window.open(baseURL+"questionnaire/open?userId="+id);
}

var vm = new Vue({
	el:'#rrapp',
	data:{
		 q:{
	            name: null
	        },
		showList: true,
		title: null,
		tStudent: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tStudent = {};
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
			var url = vm.tStudent.id == null ? "sys/tstudent/save" : "sys/tstudent/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tStudent),
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
				    url: baseURL + "sys/tstudent/delete",
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
			$.get(baseURL + "sys/tstudent/info/"+id, function(r){
                vm.tStudent = r.tStudent;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'name': vm.q.name},
                page:page
            }).trigger("reloadGrid");
		}
	}
});