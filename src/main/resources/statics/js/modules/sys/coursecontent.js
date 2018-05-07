$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/coursecontent/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '课程名称', name: 'courseName', index: 'COURSE_NAME', width: 80 }, 			
			{ label: '针对年龄', name: 'ageRange', index: 'AGE_RANGE', width: 80 }, 			
			{ label: '课程主题', name: 'courseTheme', index: 'COURSE_THEME', width: 80 }, 			
			//{ label: '课程特色', name: 'courseFeature', index: 'COURSE_FEATURE', width: 80 }, 			
			{ label: '课程内容及描述', name: 'courseDes', index: 'COURSE_DES', width: 80 }, 			
			//{ label: '课程目标', name: 'courseTarget', index: 'COURSE_TARGET', width: 80 }, 			
			//{ label: '能力培养', name: 'train', index: 'TRAIN', width: 80 }, 			
			//{ label: '培训方法', name: 'mode', index: 'MODE', width: 80 }, 			
			//{ label: '', name: 'dtInsert', index: 'DT_INSERT', width: 80 }, 			
			//{ label: '状态  0：禁用   1：正常', name: 'status', index: 'STATUS', width: 80 }, 			
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

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		courseContent: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.courseContent = {};
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
			var url = vm.courseContent.id == null ? "sys/coursecontent/save" : "sys/coursecontent/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.courseContent),
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
				    url: baseURL + "sys/coursecontent/delete",
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
			$.get(baseURL + "sys/coursecontent/info/"+id, function(r){
                vm.courseContent = r.courseContent;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});