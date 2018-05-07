<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>  
<!DOCTYPE html>
<html lang="zh"
      xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, shrink-to-fit=no">
    <title>问卷调查</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link href="https://cdn.bootcss.com/iCheck/1.0.2/skins/all.css" rel="stylesheet">
</head>
<body>
	<header class="navbar navbar-expand navbar-dark bg-dark flex-column flex-md-row">
		<span class="navbar-brand mb-0 h1">问卷调查</span>
	</header>
	<%  
            List list = new ArrayList();  
            List list1 = new ArrayList();  
            List list2 = new ArrayList();  
            list1.add("1-a");  
            list1.add("1-b");  
            list2.add("2-d");  
            list2.add("2-c");  
            list.add(list1);  
            list.add(list2);  
            request.setAttribute("list1", list1);  
            request.setAttribute("list", list);  
        %>  
        <c:forEach items="${list }" var="item">  
            <c:forEach items="${item }" var="item2">  
                <tr>  
                    <td>${item2 }</td>  
                </tr>  
        </c:forEach>  
	<form class="container">
		   <c:forEach items="${requestScope.questions}" var="keyword" varStatus="id" begin="1">  
		        ${id.index} ${keyword}<br>  
		   </c:forEach> 
	
	
	
		<h5 class="mt-3"><strong>一、关于财商的兴趣</strong></h5>
		<h6 class="mt-3 mb-3">1.孩子每周谈论财商相关话题的频次</h6>
		<div class="input-group">
			<input type="number" class="form-control" min="0" max="5"/>
			<div class="input-group-append">
				<span class="input-group-text">次/周</span>
			</div>
		</div>
		<h6 class="mt-3 mb-3">2.孩子每周进行财商相关游戏或书籍阅读的频次</h6>
		<div class="input-group">
			<input type="number" class="form-control" min="0" max="5"/>
			<div class="input-group-append">
				<span class="input-group-text">次/周</span>
			</div>
		</div>
		<h5 class="mt-3"><strong>二、关于财商的意识</strong></h5>
		<h6 class="mt-3 mb-3">1.孩子是否能理解自己和同伴的兴趣及需要是不一样的</h6>
		<div class="card">
			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					<label class="form-check-label">
						<input class="form-check-input" type="radio" name="topic1" value="0"> 是
					</label>
				</li>
				<li class="list-group-item">
					<label class="form-check-label">
						<input class="form-check-input" type="radio" name="topic1" value="1" checked> 否
					</label>
				</li>
			</ul>
		</div>
		<h6 class="mt-3 mb-3">2.孩子是否能理解鱼和熊掌不可兼得</h6>
		<div class="card">
			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					<label class="form-check-label">
						<input class="form-check-input" type="radio" name="topic2" value="0"> 是
					</label>
				</li>
				<li class="list-group-item">
					<label class="form-check-label">
						<input class="form-check-input" type="radio" name="topic2" value="1" checked> 否
					</label>
				</li>
			</ul>
		</div>
		<button type="button" class="btn btn-primary btn-block mt-3 mb-3">提交答卷</button>
		
	</form>
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
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
	});
	</script>
</body>
</html>