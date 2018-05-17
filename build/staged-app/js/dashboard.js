document.addEventListener("DOMContentLoaded", loadpage);
document.getElementById("profilepic").addEventListener("click",toggledetails);
document.getElementById("userid").addEventListener("click",toggledetails);
/*document.getElementById("addtimerB").addEventListener("click",addtimer);*/
document.body.addEventListener("click",function(event){var eventid=event.target.id;
if(!(eventid=="profiledetails"||eventid=="profilepic"||eventid=="userid"))
	document.getElementById("profiledetails").style.display="none";
});
document.getElementById("editB").addEventListener("click", edit);
document.getElementById("cancelB").addEventListener("click", dashboard);
document.getElementById("updateB").addEventListener("click", update);
document.getElementById("logoutB").addEventListener("click", logout);
document.getElementById("deactivateB").addEventListener("click", deactivate);
document.getElementById("clkinB").addEventListener("click",timerEntry);
document.getElementById("clkoutB").addEventListener("click",stopTimerEntry);

function loadpage(){
	 var userid=document.getElementById("userIdI").innerHTML;
	 var xHttp = new XMLHttpRequest();
	    var url="/rest-api/v1/user/timerinfo/"+userid;
	    xHttp.onload = function() {
			if (this.readyState == 4) {
				var result = xHttp.response;
				var parsedResult = JSON.parse(result);
				if(parsedResult.Success==true)
				{   
					document.getElementById("entryIdI").innerHTML=parsedResult.runningentryid;
					for(i=0;i<parsedResult.timerentrylist.length;i++)
					{
						addInTimerEntry(parsedResult.timerentrylist[i].day,parsedResult.timerentrylist[i].intime,parsedResult.timerentrylist[i].entryid);
						addOutTimerEntry(parsedResult.timerentrylist[i].day,parsedResult.timerentrylist[i].outtime,parsedResult.timerentrylist[i].entryid);
					}
					document.getElementById("hh").innerHTML=pad(parseFloat(parsedResult.hh));
					document.getElementById("mm").innerHTML=pad(parseFloat(parsedResult.mm));
					document.getElementById("ss").innerHTML=pad(parseFloat(parsedResult.ss));
					if(parsedResult.running==true)
						{
						start = setInterval(timer,1000);
						document.getElementById("clkinB").disabled=true;
					    document.getElementById("clkinB").style.opacity = "0.3";
					    document.getElementById("clkinB").style.cursor = "not-allowed";
						
						
						}
	
					
				}
			}
		};
		xHttp.open("GET", url, true);
		xHttp.send();
	
	
	
};
var start;

function toggledetails()
{
	var x = document.getElementById("profiledetails");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }	
}
function addInTimerEntry(day,intime,entryid)
{
	var parent = document.getElementById("timerlist");
    var child=document.createElement("div");
    child.setAttribute("class","addtimerentry");
    child.setAttribute("id",entryid);
    var intimeentry=document.createElement("span");
    intimeentry.setAttribute("class","timerentry");
    intimeentry.innerHTML=day+' '+intime+' - ';
    child.appendChild(intimeentry);
	parent.appendChild(child);	

}
function addOutTimerEntry(day,outtime,entryid)
{
	var entry = document.getElementById(entryid);
	var outtimeentry=document.createElement("span");
    outtimeentry.setAttribute("class","timerentry");
    if(outtime===' ')
    	{
    	outtimeentry.innerHTML=' ';
    	}
    else
    {outtimeentry.innerHTML=day+' '+outtime;}
    entry.appendChild(outtimeentry);


}

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
function timerEntry()
{
	var userid = document.getElementById("userIdI").innerHTML;
    document.getElementById("clkinB").disabled=true;
    document.getElementById("clkinB").style.opacity = "0.3";
    document.getElementById("clkinB").style.cursor = "not-allowed";
    var xHttp = new XMLHttpRequest();
    var url="/rest-api/v1/user/clockin/"+userid;
    xHttp.onload = function() {
		if (this.readyState == 4) {
			var result = xHttp.response;
			var parsedResult = JSON.parse(result);
			if(parsedResult.Success==true)
			{start = setInterval(timer,1000);	
			 document.getElementById("entryIdI").innerHTML=parsedResult.entryid;
			 addInTimerEntry(parsedResult.day,parsedResult.intime,parsedResult.entryid);
			}
		}
	};
	xHttp.open("POST", url, true);
	xHttp.send();
}

function timer() {

	if (parseFloat(document.getElementById("ss").innerHTML) === 59) {
		document.getElementById("ss").innerHTML = pad(00);
			document.getElementById("mm").innerHTML = pad(parseFloat(document
					.getElementById("mm").innerHTML) + 1);
		if (parseFloat(document.getElementById("mm").innerHTML) === 59) {
			document.getElementById("mm").innerHTML = pad(00);
				document.getElementById("hh").innerHTML = pad(parseFloat(document
						.getElementById("hh").innerHTML) + 1);

		}
	} else {

		
		
			document.getElementById("ss").innerHTML = pad(parseFloat(document
					.getElementById("ss").innerHTML) + 1);
	}

}
function stopTimerEntry()
{
	if(document.getElementById("clkinB").disabled==true)
	{var entryid=document.getElementById("entryIdI").innerHTML;
	var xHttp = new XMLHttpRequest();
    var url="/rest-api/v1/user/clockout/"+entryid;
    xHttp.onload = function() {
		if (this.readyState == 4) {
			var result = xHttp.response;
			var parsedResult = JSON.parse(result);
			if(parsedResult.Success==true)
			{
			 addOutTimerEntry(parsedResult.day,parsedResult.outtime,parsedResult.entryid);	
			 clearInterval(start);
			 document.getElementById("clkinB").disabled=false;
			 document.getElementById("clkinB").style.opacity="1";
			 document.getElementById("clkinB").style.cursor = "pointer";
			 
			}
		}
	};
	xHttp.open("PATCH", url, true);
	xHttp.send();}
}
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

