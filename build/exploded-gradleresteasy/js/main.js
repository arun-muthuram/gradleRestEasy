document.getElementById("signupb").addEventListener("click", register);
document.getElementById("signupl").addEventListener("click", login);
document.getElementById("gsignB").addEventListener("click", oauth);
document.addEventListener("DOMContentLoaded", function(){
	var errormessage=document.getElementById("error").innerHTML;
	if(errormessage!="")
		{
		setTimeout(function() {
			location.replace("/")
		},1000);
		}
});
document.getElementById("submitP").addEventListener("click",forgotpassword);
function register() {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("pwd").value;
	var phoneNumber = document.getElementById("phonenumber").value;
	if (validate(name, email, password, phoneNumber)) {
		var xHttp = new XMLHttpRequest();
		var url = "/rest-api/v1/user/create";
		xHttp.onload = function() {
			if (this.readyState == 4) {
				var result = xHttp.response;
				var parsedResult = JSON.parse(result);
				if (parsedResult.Success == true)
					window.location.replace("/Welcome.jsp");
				else {
					document.getElementById("error").innerHTML = parsedResult.message;
					setTimeout(function() {
						document.getElementById("error").innerHTML = ""
					}, 3000);
				}
			}
		};
		xHttp.open("POST", url, true);
		xHttp.setRequestHeader("Content-type", "application/json");
		xHttp.send(JSON.stringify({name:name,email:email,password:password,phoneNumber:phoneNumber}));
	}
}
function login() {

	var email = document.getElementById("emailL").value;
	var password = document.getElementById("pwdL").value;
	var xHttp = new XMLHttpRequest();
	var url = "/rest-api/v1/user/session";
	xHttp.onload = function() {
		if (this.readyState == 4 ) {
			var result = xHttp.response;
			var parsedResult = JSON.parse(result);
			if (parsedResult.Success == true)
				window.location.replace("/Welcome.jsp");
			else {
				document.getElementById("error").innerHTML = parsedResult.message;
				setTimeout(function() {
					document.getElementById("error").innerHTML = ""
				}, 3000);
			}
		}
	};
	xHttp.open("POST", url, true);
	xHttp.setRequestHeader("Content-type", "application/json");
	xHttp.send(JSON.stringify({email:email,password:password}));

}
function validate(name, email, password, phonenumber) {
	var nameregex = new RegExp('^[a-zA-Z][a-zA-Z\\s]*$');
	var emailregex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$');
	var phoneregex = new RegExp('^[789][0-9]{9}$');
	var passregex = new RegExp('^[^\\s]{6}$');
	if (!nameregex.test(name)) {
		document.getElementById("error").innerHTML = "Enter a valid name";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 3000);
		return false;
	}
	if (!emailregex.test(email)) {
		document.getElementById("error").innerHTML = "Enter a valid email";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 3000);
		return false;
	}
	if (!passregex.test(password)) {
		document.getElementById("error").innerHTML = "Enter a valid password- minimum 6 characters, no spaces";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 3000);
		return false;
	}
	if (phonenumber!=""&&!phoneregex.test(phonenumber)) {
		document.getElementById("error").innerHTML = "Enter a valid 10 digit phonenumber";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 3000);
		return false;
	}
	return true;

}
function oauth()
{
	var url="https://accounts.google.com/o/oauth2/v2/auth?"
		 +"scope=https://www.googleapis.com/auth/userinfo.email&"
		 +"redirect_uri=https://login-signup-ui.appspot.com/oauth/callback&"
		 +"response_type=code&"+
		 "client_id=1062085927305-i99h2o72tn8ptdh8ft7kne26pkosbtni.apps.googleusercontent.com";
	window.location=url;


}
function forgotpassword()
{
	var email=document.getElementById("emailP").value;
	var emailregex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$');
	if (!emailregex.test(email)) {
		document.getElementById("modalpasswordError").innerHTML = "Enter a valid email";
		setTimeout(function() {
			document.getElementById("modalpasswordError").innerHTML = ""
		}, 3000);
	}
	else
		{
		var xHttp = new XMLHttpRequest();
		var url = "/rest-api/v1/user/password/token/create";
		xHttp.onload = function() {
			if (this.readyState == 4) {
				var result = xHttp.response;
				var parsedResult = JSON.parse(result);
				
				 document.getElementById("error").innerHTML = "Please wait";
				
				if (parsedResult.Success == true)
					{
					document.getElementById("closemodalpass").click();
					 document.getElementById("error").innerHTML = "Password reset link has been sent. Please visit your email.";
						setTimeout(function() {
							document.getElementById("error").innerHTML = ""
						}, 3000);
					 
					}
				else {
					document.getElementById("modalpasswordError").innerHTML = parsedResult.message;
					setTimeout(function() {
						document.getElementById("modalpasswordError").innerHTML = ""
					}, 3000);
					document.getElementById("error").innerHTML = "Please wait";
				}
			}
		};
		xHttp.open("PATCH", url, true);
		xHttp.setRequestHeader("Content-type", "application/json");
		xHttp.send(JSON.stringify({email:email}));
		
		
		
		
		}


}