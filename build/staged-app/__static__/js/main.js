document.getElementById("signupb").addEventListener("click", register);
document.getElementById("signupl").addEventListener("click", login);

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
					}, 800);
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
				}, 800);
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
	var passregex = new RegExp('^$');
	if (!nameregex.test(name)) {
		document.getElementById("error").innerHTML = "Enter a valid name";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 800);
		return false;
	}
	if (!emailregex.test(email)) {
		document.getElementById("error").innerHTML = "Enter a valid email";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 800);
		return false;
	}
	if (passregex.test(password)) {
		document.getElementById("error").innerHTML = "Enter a valid password";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 800);
		return false;
	}
	if (!phoneregex.test(phonenumber)) {
		document.getElementById("error").innerHTML = "Enter a valid 10 digit phonenumber";
		setTimeout(function() {
			document.getElementById("error").innerHTML = ""
		}, 800);
		return false;
	}
	return true;

}
