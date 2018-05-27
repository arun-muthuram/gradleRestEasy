<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="resteasySample.Contact"%>
<%
response.setHeader("Cache-Control","no-cache,no-store,must-revalidate"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
if((Contact)session.getAttribute("userInfo")!=null)
	response.sendRedirect("/Welcome.jsp");
 %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="content-type"
	content="application/xhtml+xml; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link href="style.css" rel="stylesheet">
<title>Login|Signup</title>
</head>

<body>
	<%String message="";
                if(request.getParameter("message")!=null)
                	message=(String)(request.getParameter("message"));
                	%>
	<div class="bg">
		<div class="container">
			<div class="alert">
				<p class="text-center text-light font-weight-bold h3" id="error"><%=message%></p>
			</div>
			<div class="row top-buffer"></div>
			<div
				class="col-xs-10 col-md-6 col-sm-8 col-lg-6 col-md-offset-3 col-sm-offset-2 col-xs-offset-1">
				<div class="panel panel-body">
					<ul id="rowtabs" class="nav nav-tabs">
						<li id="Signup" ><a data-toggle="tab"
							href="#signup">Signup</a></li>
						<li id="Login" class="active"><a data-toggle="tab" href="#login">Login</a></li>
					</ul>
					<div class="box-top-buffer"></div>
					<div class="tab-content">
						<div id="signup" class="tab-pane fade">
							<form>
								<div class="form-group">
									<label for="name">Name:</label> <input type="text"
										class="form-control" id="name" placeholder="Enter name*"
										name="name" required>
								</div>
								<div class="form-group">
									<label for="email">Email:</label> <input type="text"
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
										title="enter a valid email" class="form-control" id="email"
										placeholder="Enter email*" name="email" required>
								</div>
								<div class="form-group">
									<label for="pwd">Password:</label> <input type="password"
										class="form-control" id="pwd" placeholder="Enter password*"
										name="pwd" required>
								</div>

								<div class="form-group">
									<label for="phonenumber">PhoneNumber:</label> <input type="tel"
										pattern="[789][0-9]{9}" title="10 digit valid phonenumber"
										class="form-control" id="phonenumber"
										placeholder="Enter phonenumber" name="phonenumber" required>
								</div>
								<div class="buttons">
									<button id="signupb" type="button" class="btn-default btn-lg">Signup</button>
									<button id="reset" type="reset" class="btn-default btn-lg">Reset</button>
								</div>
							</form>
						</div>
						<div id="login" class="tab-pane fade in active">
							<form>
								<div class="form-group">
									<label for="email">Email:</label> <input type="email"
										class="form-control" id="emailL" placeholder="Enter email"
										name="email" required>
								</div>
								<div class="form-group">
									<label for="pwd">Password:</label> <input type="password"
										class="form-control" id="pwdL" placeholder="Enter password"
										name="pwd" required>
								</div>
								<a id="forgotpasswordB"
									style="margin-left: 197px; color: orangered; cursor: pointer;"
									data-toggle="modal" data-target="#forgotpasswordmodal">Forgot
									password?</a>

								<div class="buttons">
									<button id="signupl" type="button" class="btn-default btn-lg"
										style="margin-top: 9px;">Login</button>

								</div>

								<a id="gsignB" style="cursor: pointer;"><img
									src="http://images.sb.a-cti.com/images/Google signin_Red_Long.png"
									style="width: 156px; margin-left: 179px; height: 46px; border-radius: 44px; margin-top: 12px;"></a>
							</form>

						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<div class="modal" id="forgotpasswordmodal">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<p class="text-danger" id=modalpasswordError
						style="margin-left: 220px"></p>
					<button id="closemodalpass" style="float: right" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>
					</button>
				</div>
				<div class="modal-body">
					<label for="email">Enter your email:</label> <input type="email"
						class="form-control" id="emailP" placeholder="Enter email"
						name="email" required>
				</div>
				<div class="modal-footer">
					<button id="submitP" type="button" class="btn-default btn-lg"
						style="margin-right: 224px; margin-top: -19px;">Submit</button>
				</div>
			</div>
		</div>
	</div>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="/js/main.js"></script>
</body>
</html>