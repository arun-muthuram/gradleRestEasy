document.getElementById("editB").addEventListener("click", edit);
document.getElementById("cancelB").addEventListener("click", dashboard);
document.getElementById("updateB").addEventListener("click", update);
document.getElementById("logoutB").addEventListener("click", logout);
document.getElementById("deactivateB").addEventListener("click", deactivate);
function edit() {
	var hide = document.getElementsByClassName("editclassB");
	var show = document.getElementsByClassName("editclassA");
	for (var i = 0; i < hide.length; i++)
		hide[i].style.display = "none";
	for (var i = 0; i < show.length; i++)
		show[i].style.display = "inline-block";
	document.getElementById("updateName").value = document
			.getElementById("usernameI").innerHTML;
	document.getElementById("updateEmail").value = document
			.getElementById("emailI").innerHTML;
	document.getElementById("updateNumber").value = document
			.getElementById("phoneI").innerHTML;
}
function dashboard() {
	var hide = document.getElementsByClassName("editclassA");
	var show = document.getElementsByClassName("editclassB");
	for (var i = 0; i < hide.length; i++)
		hide[i].style.display = "none";
	for (var i = 0; i < show.length; i++)
		show[i].style.display = "inline-block";

}
function update() {
	var updateName = document.getElementById("updateName").value;
	var updateEmail = document.getElementById("updateEmail").value;
	var updateNumber = document.getElementById("updateNumber").value;
	var id = document.getElementById("userIdI").innerHTML;
	if (validate(updateName, updateEmail, updateNumber)) {
		var xHttp = new XMLHttpRequest();
		var url = "rest-api/v1/user/update/" + id;
		xHttp.onload = function() {
			if (this.readyState == 4) {
				var result = xHttp.response;
				var parsedResult = JSON.parse(result);
				if (parsedResult.Success == false) {
					dashboard();
					document.getElementById("werror").innerHTML = parsedResult.message;
					setTimeout(function() {
						document.getElementById("werror").innerHTML = ""
					}, 800);

				} else {
					document.location.reload(true);

				}

			}
		};
		xHttp.open("PATCH", url, true);
		xHttp.setRequestHeader("Content-type", "application/json");
		xHttp.send(JSON.stringify({
			name : updateName,
			email : updateEmail,
			phoneNumber : updateNumber
		}));
		

	}
}
function logout() {
	var xHttp = new XMLHttpRequest();
	var url = "/rest-api/v1/user/session/logout";
	xHttp.onload = function() {
		if (this.readyState == 4) {
			var result = xHttp.response;
			var parsedResult = JSON.parse(result);
			location.replace("/");
		}
	};
	xHttp.open("GET", url, true);
	xHttp.send();
}
function deactivate() {
	var id = document.getElementById("userIdI").innerHTML;
	var xHttp = new XMLHttpRequest();
	var url = "rest-api/v1/user/deactivate/" + id;
	xHttp.onload = function() {
		if (this.readyState == 4) {
			var result = xHttp.response;
			var parsedResult = JSON.parse(result);
			location.replace("/");
		}
	};
	xHttp.open("PATCH", url, true);
	xHttp.send();
}

function validate(name, email, phonenumber) {
	var nameregex = new RegExp('^[a-zA-Z][a-zA-Z\\s]*$');
	var emailregex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$');
	var phoneregex = new RegExp('^[789][0-9]{9}$');
	if (!nameregex.test(name)) {
		document.getElementById("werror").innerHTML = "Enter a valid name";
		setTimeout(function() {
			document.getElementById("werror").innerHTML = ""
		}, 800);
		return false;
	}
	if (!emailregex.test(email)) {
		document.getElementById("werror").innerHTML = "Enter a valid email";
		setTimeout(function() {
			document.getElementById("werror").innerHTML = ""
		}, 800);
		return false;
	}
	if (!phoneregex.test(phonenumber)) {
		document.getElementById("werror").innerHTML = "Enter a valid 10 digit phonenumber";
		setTimeout(function() {
			document.getElementById("werror").innerHTML = ""
		}, 800);
		return false;
	}
	return true;

}
