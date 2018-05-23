<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page
	import="java.io.*,java.util.*,resteasySample.Contact,java.text.SimpleDateFormat"%>
<%@ page
	import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"%>
<%@ page
	import="com.google.appengine.api.blobstore.BlobstoreService,com.google.appengine.api.blobstore.UploadOptions.Builder,com.google.appengine.api.blobstore.UploadOptions"%>
<%
response.setHeader("Cache-Control","no-store"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
String profilepicurl="";
Contact sessionuser=(Contact)session.getAttribute("userInfo");
if(sessionuser==null)
	{response.sendRedirect("/");}   
else
{
if(sessionuser.getProfilePicUrl()==null)
	{profilepicurl="user.png";}
else
	{profilepicurl=sessionuser.getProfilePicUrl();}}
BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
UploadOptions uploadOptions=Builder.withGoogleStorageBucketName("login-signup-ui.appspot.com");

 %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link href="dashboard.css" rel="stylesheet">
<title>Dashboard</title>
</head>
<body>

	<div id="profiledetailsmodal" class="modal" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-body">

					<table class="table table-striped">
						<thead>
							<button type="button" class="editclassB"
								style="margin-left: 520px" data-dismiss="modal">
								<span class="glyphicon glyphicon-remove editclassB"></span>
							</button>
							<tr>

								<th class=" editclassB"><img id="editprofilepic"
									src="<%=profilepicurl%>" alt="profile-pic"
									class="img-profile editpic">

									<form
										action="<%=blobstoreService.createUploadUrl("/uploadhandler", uploadOptions)%>"
										method="POST" enctype="multipart/form-data">
										<label style="cursor: pointer"
											class="glyphicon glyphicon-upload"> <input
											type="file" name="profilepic" accept=".jpg, .jpeg, .png"
											onchange="form.submit()">
										</label>
									</form></th>

								<th>
									<div class="alert editclassA">
										<p class="text-danger" id="werror"></p>
									</div>
								</th>

							</tr>
						</thead>
						<tbody>

							<p style="display: none;" id="userIdI">${sessionScope.userInfo.id}</p>
							<p style="display: none;" id="entryIdI"></p>
							<tr>
								<td class="text-info font-weight-bold">Name</td>
								<td class="editclassB"><p id="usernameI">${sessionScope.userInfo.name}</p></td>
								<td class="editclassA"><input type="text" id="updateName"
									value="${sessionScope.userInfo.name}"></td>
							</tr>
							<tr>
								<td class="text-info font-weight-bold">Email</td>
								<td class=editclassB><p id="emailI">${sessionScope.userInfo.email}</p></td>
								<td class="editclassA"><input type="text" id="updateEmail"
									value="${sessionScope.userInfo.email}"></td>
							</tr>
							<tr>
								<td class="text-info font-weight-bold">PhoneNumber</td>
								<td class=editclassB><p id="phoneI">${sessionScope.userInfo.phoneNumber}</p></td>
								<td class="editclassA"><input type="text" id="updateNumber"
									value="${sessionScope.userInfo.phoneNumber}"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button style="margin-left: 200px" type="button" id="editB"
						class="btn btn-sm editclassB">
						<span class="glyphicon glyphicon-pencil editclassB"></span> Edit
					</button>
					<button type="button" data-toggle="modal"
						data-target="#confirmDelete"
						class="btn btn-danger btn-sm editclassB">
						<span class="glyphicon glyphicon-trash editclassB"></span> Delete
					</button>
					<button type="button" id="updateB" class="btn editclassA">Update</button>
					<button type="button" id="cancelB" class="btn editclassA">Cancel</button>
				</div>
			</div>
		</div>
	</div>
	<div id="confirmDelete" class="modal" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-body">
					<p>Confirm account deletion.</p>
				</div>
				<div class="modal-footer">
					<button type="button" id="deactivateB" class="btn">Delete</button>
					<button type="button" class="btn" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
	</div>
	<div id="deleteentrymodal" class="modal" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-body">
					<p>Confirm entry deletion.</p>
				</div>
				<div class="modal-footer">
					<button type="button" id="confirmdeleteentryB" class="btn">Delete</button>
					<button id="closedeleteentrymodalB" type="button" class="btn" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
	<button disabled="" id="entriestitle" class="sortentries">
		Current Week<span id="totaltime" style="margin-left: 79px">00h,
			00m, 00s. </span>
	</button>
	<button id="sortEntryB" class="sortentryB" data-toggle="modal"
		data-target="#sortentriesmodal">
		<span class="glyphicon glyphicon-calendar"></span>
	</button>
	<div id="sortentriesmodal" class="modal" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<p class="text-danger" id=sortentryError></p>
					<button id="closemodal" style="float: right" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>
					</button>
				</div>
				<div class="modal-body">
					<% Date today= new Date();
				   String date=new SimpleDateFormat("yyyy-MM-dd").format(today);%>
					<input type="date" id="fromdate" min="2018-03-01" max=<%=date%>>
					<input type="date" id="todate" min="2018-03-01" max=<%=date%>>
					<button style="border-radius: 5px" type="button"
						id="sortentriessubmitB">Submit</button>
					<button style="border-radius: 5px" type="button" id="currentweekB">Current
						Week</button>

				</div>
			</div>
		</div>
	</div>
	<div class="top-panel text-right">
		<p>
			<span class="username" id="userid">${sessionScope.userInfo.name}</span>
			<img id="profilepic" src="<%=profilepicurl%>" alt="profile-pic"
				class="img-profile">
		</p>
	</div>
	<div id="profiledetails" class="profilePanel text-center"
		style="display: none;">
		<br>
		<button id="profiledetailsB" data-toggle="modal"
			data-target="#profiledetailsmodal" class="btn btn-default signoutB">My
			profile</button>
		<br>
		<button id="logoutB" class="btn btn-default signoutB">Signout</button>
	</div>
	<div class="row timer">
		<div id="timerlist"
			class="col-lg-4 col-md-4 col-sm-4 col-xs-4 timerlist">

			<!-- <button id="addtimerB" type="button"
				class="btn btn-default btn-lg addTB">
				<span class="glyphicon glyphicon-plus"></span>Add timer
			</button> -->
		</div>
		<div
			class="col-lg-offset-4 col-md-offset-4 
col-sm-offset-4 
col-xs-offset-4 col-lg-8 col-md-8 col-sm-8 col-xs-8 timerpanel">
			<div class="timerdata">
				<span id="hh">00</span><span>:</span><span id="mm">00</span><span>:</span><span
					id="ss">00</span>
			</div>
			<div class="clkB">
				<button id="clkinB">Clock-in</button>
				<button id="clkoutB">Clock-out</button>
			</div>
		</div>
	</div>


	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="/js/dashboard.js"></script>
</body>
</html>