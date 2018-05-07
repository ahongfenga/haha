<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html lang="zh"
      xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, shrink-to-fit=no">
    <title>问卷调查</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link href="https://cdn.bootcss.com/iCheck/1.0.2/skins/all.css" rel="stylesheet">
	<script src="./statics/libs/jquery.min.js"></script>
</head>
<body>
	<header class="navbar navbar-expand navbar-dark bg-dark flex-column flex-md-row">
		<span class="navbar-brand mb-0 h1">问卷调查</span>
	    <c:if test="${openType ne 1}">
	    		<span class="navbar-brand mb-0 h2">(保存时间:<fmt:formatDate value="${saveDate}" pattern="yyyy-MM-dd"/>)</span>
				
		</c:if> 
	</header>
	<form class="container" action="saveans" method="post">
		<input type="hidden" name="userId" value="${userId}" class="form-control" />
		<c:forEach items="${questions }" var="q"  varStatus="id" begin="0">  
		 <c:if test="${id.index+1 eq q.orderTitle}">
		    		<h5 class="mt-3"><strong>${q.title}</strong></h5>
		 </c:if> 
		<h6 class="mt-3 mb-3">${id.index+1}.${q.name }</h6>
		 <c:choose>
		    <c:when test="${q.type==1}">
		    <div class="input-group">
				<input type="number" name="${q.id}-ansNum" class="form-control" required="required" min="0" max="5" value="${q.questionAns}"/>
				<div class="input-group-append">
					<span class="input-group-text">次/周</span>
				</div>
			</div>
		    </c:when>
		    <c:when test="${q.type==2}">
		        <div class="card">
					<ul class="list-group list-group-flush">
						<li class="list-group-item">
							<label class="form-check-label">
								<input class="form-check-input" type="radio" required="required" name="${q.id}-ansNum" value="0" 
								<c:if test="${q.questionAns eq 0}">
								     checked
								</c:if>
								> 是
							</label>
						</li>
						<li class="list-group-item">
							<label class="form-check-label">
								<input class="form-check-input" type="radio" required="required" name="${q.id}-ansNum" value="1"
								<c:if test="${q.questionAns eq 1}">
								     checked
								</c:if>
								> 否
							</label>
						</li>
					</ul>
				</div>
		    </c:when>
		    <c:otherwise>
		       	待续。。。。。
		    </c:otherwise>
		</c:choose>
        </c:forEach>  
        <c:if test="${openType eq 1}">
				<button type="submit" id="submit" class="btn btn-primary btn-block mt-3 mb-3">提交答卷</button>
		</c:if>
		
	</form>
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