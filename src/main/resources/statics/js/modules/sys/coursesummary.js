$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/coursesummary/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			//{ label: '', name: 'studentId', index: 'STUDENT_ID', width: 80 }, 			
			{ label: '学生姓名', name: 'studentName', index: 'STUDENT_NAME', width: 80 }, 			
			{ label: '课程名', name: 'courseName', index: 'COURSE_NAME', width: 80 }, 			
			{ label: '出勤率', name: 'attendance', index: 'ATTENDANCE', width: 80, formatter: getStart},			
			{ label: '团队协作能力', name: 'teamworkAbility', index: 'TEAMWORK_ABILITY', formatter: getStart},	 			
			{ label: '自主完成作业能力', name: 'taskAbility', index: 'TASK_ABILITY', width: 80, formatter:getStart }, 			
			{ label: '表达能力', name: 'expressAbility', index: 'EXPRESS_ABILITY', width: 80 , formatter: getStart}, 			
			{ label: '课程掌握水平', name: 'courseLevel', index: 'COURSE_LEVEL', width: 80, formatter: getStart },
			{ label: '问卷', name: 'id', index: 'ID', width: 80, formatter: function(value, options, row){
				return 	'<span class="btn btn-primary"  onclick="btn_detail('+row.id+')">家庭反馈</span>';
			}}
			//{ label: '', name: 'dtInsert', index: 'DT_INSERT', width: 80 }, 			
			//{ label: '状态  0：禁用   1：正常', name: 'status', index: 'STATUS', width: 80 }, 			
			//{ label: '课程排序', name: 'orderNum', index: 'ORDER_NUM', width: 80 }, 			
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

var courseId=null;
var studentId=null;
//初始化学生和课程
initDic();
var vm = new Vue({
	el:'#rrapp',
	data:{
		 q:{
			 studentName: null
	        },
		showList: true,
		title: null,
		courseSummary: {},
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.courseSummary = {};
			vm.getCourse();
	        vm.getStudents();
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getCourse();
            vm.getStudents();
            vm.getInfo(id);
		},
		saveOrUpdate: function (event) {
			var url = vm.courseSummary.id == null ? "sys/coursesummary/save" : "sys/coursesummary/update";
			vm.courseSummary.studentName=$("#studentId").find("option:selected").text();
			vm.courseSummary.courseName=$("#courseId").find("option:selected").text();
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.courseSummary),
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
				    url: baseURL + "sys/coursesummary/delete",
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
			$.get(baseURL + "sys/coursesummary/info/"+id, function(r){
                vm.courseSummary = r.courseSummary;
            });
		},
		getCourse: function(){
				vm.courseId = courseId;
		},
		getStudents: function(){
				vm.studentId = studentId;
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'studentName': vm.q.studentName},
                page:page
            }).trigger("reloadGrid");
		}
	}
});


function initDic(){
	if(!window.localStorage){
		var storage=window.localStorage;
		if(window.localStorage.studentId&&window.localStorage.courseId){
			studentId=storage.studentId;
			courseId=storage.courseId;
		}else{
			if(studentId==null){
				$.get(baseURL + "sys/tstudent/list", function(r){
					storage.studentId=r.page.list;
					studentId=storage.studentId;
				});
			}
			if(courseId==null){
				$.get(baseURL + "sys/coursecontent/list", function(r){
					storage.courseId=r.page.list;
					courseId=storage.courseId;
				});
			}
		}
	}else{
		if(studentId==null){
			$.get(baseURL + "sys/tstudent/list", function(r){
				studentId = r.page.list;
			});
		}
		if(courseId==null){
			$.get(baseURL + "sys/coursecontent/list", function(r){
				courseId = r.page.list;
			});
		}
	}
}

//问卷明细
function btn_detail(id) {
	window.open(baseURL+"questionnaire/open?userId="+id);
}
//格式化星级
function getStart(value, options, row){
	switch(value)
	{
	case 1:
	  return '一星';
	  break;
	case 2:
	  return '二星';
	  break;
	case 3:
	  return '三星';
	  break;
	case 4:
	  return '四星';
	  break;
	case 5:
	  return '五星';
	  break;
	default:
	  return value;
	}
	};