<!doctype html>

<!--[if lt IE 7 ]><html xmlns:th="http://www.thymeleaf.org" lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]><html xmlns:th="http://www.thymeleaf.org" lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]><html xmlns:th="http://www.thymeleaf.org" lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]><html xmlns:th="http://www.thymeleaf.org" lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html xmlns:th="http://www.thymeleaf.org" lang="en" class="no-js" > <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, shrink-to-fit=no">
    <title>家庭反馈</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link href="https://cdn.bootcss.com/iCheck/1.0.2/skins/all.css" rel="stylesheet">
	<script src="../statics/libs/jquery.min.js"></script>
</head>

<body>
	<header class="navbar navbar-expand navbar-dark bg-dark flex-column flex-md-row">
		<span class="navbar-brand mb-0 h1">家庭反馈</span>
	</header>
<form class="container" action="saveans" method="post">
	<input type="hidden" name="userId" th:value="${userId}" class="form-control" />
     <div th:each="q : ${questions}">
		<h6 class="mt-3 mb-3" th:text="${q.title}"></h6>
		<div class="input-group">
			<input type="number" class="form-control" th:attr="name=${q.id}-ansNum" min="0" max="5" th:value="${q.questionAns}"/>
			<div class="input-group-append">
				<span class="input-group-text">次/周</span>
			</div>
		</div>
	</div>
<button type="submit" id="submit" class="btn btn-primary btn-block mt-3 mb-3">提交答卷</button>
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="https://cdn.bootcss.com/iCheck/1.0.2/icheck.min.js"></script>
	<script>
	$(document).ready(function(){
	  $('input[type="radio"]').iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue',
		increaseArea: '20%' // optional
	  });
	  
	   $("form").on("submit", function(ev) {  
		     $.ajax({
		    	    type: 'post',
		    	    url: 'saveans',
		    	    data: $("form").serialize(),
		    	    success: function(data) {
		    	        if("SUCCESS"==data){
		    	              alert("问卷保存成功！");
		    	        	  $("#submit").hide();
		    	              location.href='open?userId='+${userId};
		    	          }
		    	    	}
		    	     });

           //阻止submit表单提交  
           ev.preventDefault();  
       });   

	});
	</script>
</body>
</html>