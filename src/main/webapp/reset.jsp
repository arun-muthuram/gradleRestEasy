<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="resteasySample.Contact"%>
<%
response.setHeader("Cache-Control","no-cache,no-store,must-revalidate"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0);%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="content-type"
	content="application/xhtml+xml; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link href="style.css" rel="stylesheet">
<title>ResetPassword</title>
</head>

<body>
	<div class="bg">
		<div class="alert">
			<p class="text-center text-light font-weight-bold h3" id="error"
				style="margin-left: -60px;"></p>
		</div>
         <p id="user" style="display:none"><%=request.getParameter("user")%> </p>
		<div class="panel panel-body"
			style="width: 362px; margin-left: 489px; margin-top: 176px;">
			<label>Enter new password:</label> <input type="password"
				id="newpass" class="form-control"> <label>Retype
				password:</label> <input type="password" id="newpassc" class="form-control">
			<button id="submitpass" type="button" class="btn-default btn-lg"
				style="margin-left: 82px; m; margin-top: 14px;">Submit</button>
		</div>


	</div>
	<script src="/js/reset.js"></script>
</body>
