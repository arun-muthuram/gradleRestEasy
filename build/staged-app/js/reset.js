document.getElementById("submitpass").addEventListener("click",resetuserpassword);
function resetuserpassword()
{   var userid=document.getElementById("user").innerHTML;
	var password=document.getElementById("newpass").value;
	var repass=document.getElementById("newpassc").value;
	var passregex = new RegExp('^[^\\s]{6,}$');
	if (!passregex.test(password)) {
		document.getElementById("error").innerHTML = "Enter a valid password - minimum 6 characters, no spaces";
		setTimeout(function() {
			document.getElementById("error").innerHTML = "       \xa0         \xa0";
		}, 3000);}
		else if(repass!=password)
			{
			document.getElementById("error").innerHTML = "Both passwords should match";
			setTimeout(function() {
				document.getElementById("error").innerHTML = "       \xa0         \xa0";
			}, 3000);}
		else
			{
			var xHttp = new XMLHttpRequest();
			var url = "/rest-api/v1/user/password/reset";
			xHttp.onload = function() {
				if (this.readyState == 4) {
					var result = xHttp.response;
					var parsedResult = JSON.parse(result);
					
					if (parsedResult.Success == true)
						{
						location.replace("/Welcome.jsp")
						}
					else {
						document.getElementById("error").innerHTML = parsedResult.message;
						setTimeout(function() {
							document.getElementById("error").innerHTML = "       \xa0         \xa0";
						}, 3000);
					}
				}
			};
			xHttp.open("PATCH", url, true);
			xHttp.setRequestHeader("Content-type", "application/json");
			xHttp.send(JSON.stringify({userid:userid,password:password}));
			}

}