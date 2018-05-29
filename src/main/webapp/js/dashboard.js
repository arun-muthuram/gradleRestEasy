document.addEventListener("DOMContentLoaded", loadpage);
document.getElementById("profilepic").addEventListener("click", toggledetails);
document.getElementById("userid").addEventListener("click", toggledetails);
document.body
		.addEventListener(
				"click",
				function(event) {
					var eventid = event.target.id;
					if (!(eventid == "profiledetails"
							|| eventid == "profilepic" || eventid == "userid"))
						document.getElementById("profiledetails").style.display = "none";
				});
document.getElementById("editB").addEventListener("click", edit);
document.getElementById("cancelB").addEventListener("click", dashboard);
document.getElementById("updateB").addEventListener("click", update);
document.getElementById("logoutB").addEventListener("click", logout);
document.getElementById("deactivateB").addEventListener("click", deactivate);
document.getElementById("clkinB").addEventListener("click", timerEntry);
document.getElementById("clkoutB").addEventListener("click", stopTimerEntry);
document.getElementById("currentweekB").addEventListener("click",currentweek);
document.getElementById("sortentriessubmitB").addEventListener("click",getsortedentries);
document.getElementById("confirmdeleteentryB").addEventListener("click",deleteentry);
var running=false;
var runningEntryParentid;
var runningEntryid;
var totaltimeinms=0;
var deleteentryid;
var showentries;
function loadpage() {
	totaltimeinms=0;
	var userid = document.getElementById("userIdI").innerHTML;
	var xHttp = new XMLHttpRequest();
	var url = "/rest-api/v1/user/timerinfo/" + userid;
	xHttp.onload = function() {
		if (this.readyState == 4) {
			var result = xHttp.response;
			var parsedResult = JSON.parse(result);
			if (parsedResult.Success == true) {
			clearpanel();
			listdays();
			parsedResult.thisWeekEntries.sort(sortEntries("intime"));
			for(var i=0;i<parsedResult.thisWeekEntries.length;i++)
				{
				addEntries(parsedResult.thisWeekEntries[i].entryid,parsedResult.thisWeekEntries[i].intime,parsedResult.thisWeekEntries[i].outtime);
				}
				setDailyDuration();
				inittimer(running);
				entriesToggler();
				totaltimecalc();
				showEntries();
				}
             
			}
		
	};
	xHttp.open("GET", url, true);
	xHttp.send();

};

function clearpanel(){
	var myNode = document.getElementById("timerlist");
	var fc = myNode.firstChild;

	while( fc ) {
	    myNode.removeChild( fc );
	    fc = myNode.firstChild;
	    
	}
	
	
	
}
function sortEntries(intime) {  
    return function(a, b) {  
        if (a[intime] < b[intime]) {  
            return 1;  
        } else if (a[intime] > b[intime]) {  
            return -1;  
        }  
        return 0;  
    }  
}  

function listdays(){
	var parent = document.getElementById("timerlist");
	var dayFactor=0;
	var d = new Date();
    var n = d.getDay();
    for(var i=n; i>=0;i--)
    {	
    d = new Date();	
	var child = document.createElement("div");
	child.setAttribute("class","addtimerentry");
	//child.addEventListener("click",toggleEntries);
	var day=document.createElement("span");
	day.setAttribute("class","timerentry");
	
	var entrydate=d.getDate()-(dayFactor++);
	d.setDate(entrydate);
	day.innerHTML=toDay(d);
	child.appendChild(day);
	child.setAttribute("id",toDay(d));
	var dailyTime=document.createElement("span");
	dailyTime.setAttribute("id",'DT'+toDay(d));
	dailyTime.setAttribute("style","display:none");
	dailyTime.innerHTML=0;
	child.appendChild(dailyTime);
	var dailyDuration=document.createElement("span");
	dailyDuration.setAttribute("id",'DD'+toDay(d));
	dailyDuration.setAttribute("class","timerentry");
	dailyDuration.setAttribute("style","margin-left:120px")
	child.appendChild(dailyDuration);
	var dropdownB=document.createElement("button");
	var dropdownIcon=document.createElement("span");
	dropdownIcon.setAttribute("class","caret");
	dropdownB.appendChild(dropdownIcon);
	dropdownB.addEventListener("click",toggleEntries);
	child.appendChild(dropdownB);
	parent.appendChild(child);	
    }
	
}
function setDailyDuration()
{
	var list = document.getElementsByClassName("addtimerentry");
	for (var i = 0; i < list.length; i++) {
	    var id = list[i].id;
		document.getElementById('DD'+id).innerHTML=durationCalc(parseFloat(document.getElementById('DT'+id).innerHTML));
		totaltimeinms=parseFloat(totaltimeinms)+parseFloat(document.getElementById('DT'+id).innerHTML);
	}

}
function toDay(date)
{
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	 var day =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	return  day[date.getDay()]+',  '+months[date.getMonth()]+' '+date.getDate();	


}
function addEntries(entryid,intime,outtime)
{
	var parent = document.getElementById(toDay(new Date(intime)));
	var entrychild=document.createElement("div");
	entrychild.setAttribute("id",entryid);
	entrychild.setAttribute("class","addentry");
	if(outtime==0)
		{
		entrychild.innerHTML=entryTime(new Date(intime))+' - Ongoing....'+' \xa0\xa0'+durationCalc(new Date().getTime()-intime);
	    running=true;
	    document.getElementById("DT"+toDay(new Date(intime))).innerHTML=parseFloat(document.getElementById("DT"+toDay(new Date(intime))).innerHTML) + parseFloat(new Date().getTime()-intime);
	    runningEntryParentid=parent.id;
	    runningEntryid=entryid;
		}
	else
	    {
		entrychild.innerHTML=entryTime(new Date(intime))+' - '+entryTime(new Date(outtime))+'. \xa0'+durationCalc(outtime-intime);
	    document.getElementById("DT"+toDay(new Date(intime))).innerHTML=parseFloat(document.getElementById("DT"+toDay(new Date(intime))).innerHTML) + parseFloat(outtime-intime);
	    var deleteentryB=document.createElement("button");
		var deleteicon=document.createElement("span");
		deleteicon.setAttribute("class","glyphicon glyphicon-trash");
		deleteentryB.setAttribute("data-toggle","modal");
		deleteentryB.setAttribute("data-target","#deleteentrymodal");
		deleteentryB.appendChild(deleteicon);
		deleteentryB.addEventListener("click",setdeleteentryid);
		entrychild.appendChild(deleteentryB);
	    }
	
	
    parent.appendChild(entrychild);
    
    
}
function entryTime(date)
{
	if(date.getHours()<12)
		{
		return padHours(date.getHours())+':'+pad(date.getMinutes())+':'+pad(date.getSeconds())+' AM';
		}
	else
		{
		return padHours(date.getHours())+':'+pad(date.getMinutes())+':'+pad(date.getSeconds())+' PM';
		}

}
function durationCalc(milli)
{
	
	return pad(Math.floor(milli / 3600000))+'h, '+pad(Math.floor((milli % 3600000) / 60000))+'m, '+pad(Math.floor(((milli% 3600000) % 60000) / 1000))+'s. ';
	

}

var start;

function toggledetails() {
	var x = document.getElementById("profiledetails");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
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
						document.getElementById("werror").innerHTML = "       \xa0         \xa0";
					}, 3000);

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
			document.getElementById("werror").innerHTML = "       \xa0         \xa0";
		}, 3000);
		return false;
	}
	if (!emailregex.test(email)) {
		document.getElementById("werror").innerHTML = "Enter a valid email";
		setTimeout(function() {
			document.getElementById("werror").innerHTML = "       \xa0         \xa0";
		}, 3000);
		return false;
	}
	if (!phoneregex.test(phonenumber)) {
		document.getElementById("werror").innerHTML = "Enter a valid 10 digit phonenumber";
		setTimeout(function() {
			document.getElementById("werror").innerHTML = "       \xa0         \xa0";
		}, 3000);
		return false;
	}
	return true;

}
function timerEntry() {
	var userid = document.getElementById("userIdI").innerHTML;
	document.getElementById("clkinB").disabled = true;
	document.getElementById("clkinB").style.opacity = "0.3";
	document.getElementById("clkinB").style.cursor = "not-allowed";
	var xHttp = new XMLHttpRequest();
	var url = "/rest-api/v1/user/clockin/" + userid;
	xHttp.onload = function() {
		if (this.readyState == 4) {
			var result = xHttp.response;
			var parsedResult = JSON.parse(result);
			if (parsedResult.Success == true) {
				loadpage();
			}
		}
	};
	xHttp.open("POST", url, true);
	xHttp.send();
}
function inittimer(running){
	if(running)
		{
		var milli=document.getElementById('DT'+runningEntryParentid).innerHTML;	
		}
	else
		{
		var list= document.getElementsByClassName("addtimerentry");
		var milli=document.getElementById('DT'+list[0].id).innerHTML;
		}
	document.getElementById("hh").innerHTML = pad(Math.floor(milli / 3600000));
	document.getElementById("mm").innerHTML = pad(Math.floor((milli % 3600000) / 60000));
	document.getElementById("ss").innerHTML = pad(Math.floor(((milli% 3600000) % 60000) / 1000));
	if(running)
	{start = setInterval(starttimer, 1000);
	document.getElementById("clkinB").disabled = true;
	document.getElementById("clkinB").style.opacity = "0.3";
	document.getElementById("clkinB").style.cursor = "not-allowed";
	}
	
	
	
}

function starttimer() {
    
	
	
	if (parseFloat(document.getElementById("ss").innerHTML) === 59) {
		document.getElementById("ss").innerHTML = pad(00);
		if (parseFloat(document.getElementById("mm").innerHTML) === 59) {
			document.getElementById("mm").innerHTML = pad(00);
			document.getElementById("hh").innerHTML = pad(parseFloat(document
					.getElementById("hh").innerHTML) + 1);

		}
		else
			{
		document.getElementById("mm").innerHTML = pad(parseFloat(document
				.getElementById("mm").innerHTML) + 1);
			}
	} else {

		document.getElementById("ss").innerHTML = pad(parseFloat(document
				.getElementById("ss").innerHTML) + 1);
	}

}
function stopTimerEntry() {
	if (document.getElementById("clkinB").disabled == true) {
		var entryid = runningEntryid;
		var xHttp = new XMLHttpRequest();
		var url = "/rest-api/v1/user/clockout/" + entryid;
		xHttp.onload = function() {
			if (this.readyState == 4) {
				var result = xHttp.response;
				var parsedResult = JSON.parse(result);
				if (parsedResult.Success == true) {
					clearInterval(start);
					document.getElementById("clkinB").disabled = false;
					document.getElementById("clkinB").style.opacity = "1";
					document.getElementById("clkinB").style.cursor = "pointer";
					running=false;
                    loadpage();
				}
			}
		};
		xHttp.open("PATCH", url, true);
		xHttp.send();
	}
}

function pad(d)
{
	if(d<0)
		d=0;
	return (d < 10) ? '0' + d.toString() : d.toString();
}
function padHours(d) {
	
	if(d>12)
		d-=12;
	if(d==0)
		return '12';
	if(d<10)
	return '0' + d.toString();
	else 
		return d;
		
}
function toggleEntries(event)
{
	var parent;
	if(event.target.parentNode.id=="")
		parent=document.getElementById(event.target.parentNode.parentNode.id);
	else
	parent= document.getElementById(event.target.parentNode.id);
	var children =parent.childNodes;
	if(children.length>4)
     {if(children[4].style.display=="none")
		{
		for(var i=4;i<children.length;i++)
			children[i].style.display="block";
		}
     else
    	 {
    	 for(var i=4;i<children.length;i++)
 			children[i].style.display="none";
    	 }
     }


}
function entriesToggler()
{
var entries=document.getElementsByClassName("addtimerentry");
if(entries.length>1)
	{
	for(var i=1;i<entries.length;i++)
     {
		if(entries[i].childNodes.length>4)
		{  	var children=entries[i].childNodes;
		for(var j=4;j<children.length;j++)
 			children[j].style.display="none";
	    	 }	
		
     }
	}
}
function totaltimecalc()
{
	
	document.getElementById("totaltime").innerHTML=durationCalc((parseFloat(totaltimeinms)));

}
function currentweek()
{
document.getElementById("closemodal").click();
clearInterval(start);
loadpage();
}
function getsortedentries()
{
if(validatedates())
	{
	var startdate=new Date(document.getElementById("fromdate").value).getTime();
	var enddate=new Date(document.getElementById("todate").value).getTime();
	var xHttp=new XMLHttpRequest();
	var url="";
	
	}

}
function validatedates()
{
	
var fromdate=document.getElementById("fromdate").value;
var todate = document.getElementById("todate").value;
if(fromdate=="")
	{
	document.getElementById("sortentryError").innerHTML = "Enter a start date";
	setTimeout(function() {
		document.getElementById("sortentryError").innerHTML = "       \xa0         \xa0";
	}, 3000);
	return false;
	}
if(todate=="")
	{
	document.getElementById("sortentryError").innerHTML = "Enter a end date";
	setTimeout(function() {
		document.getElementById("sortentryError").innerHTML = "       \xa0         \xa0";
	}, 3000);
	return false;
	}
    if(todate<fromdate)
    	{
    	document.getElementById("sortentryError").innerHTML = "End date must be larger than start date";
    	setTimeout(function() {
    		document.getElementById("sortentryError").innerHTML = "       \xa0         \xa0";
    	}, 3000);
    	return false;
    	}
    return true;
}
function setdeleteentryid(event)
{
	if(event.target.tagName=="SPAN")
		{
		deleteentryid=event.target.parentNode.parentNode.id;
		}
	else
	deleteentryid=event.target.parentNode.id;
	
}
function deleteentry()
{
var xHttp=new XMLHttpRequest();
var url="/rest-api/v1/user/delete/entry/"+deleteentryid;
xHttp.onload = function() {
	if (this.readyState == 4) {
		var result = xHttp.response;
		var parsedResult = JSON.parse(result);
		if (parsedResult.Success == true) {
		clearInterval(start);
		showentries=document.getElementById(deleteentryid).parentNode.id;
		deleteentryid=null;
		document.getElementById("closedeleteentrymodalB").click();
		loadpage();
		
		}
		}
};
    xHttp.open("DELETE",url,true);
    xHttp.send();
}
function showEntries()
{
	if(showentries!=null){var childnodes=document.getElementById(showentries).childNodes;
	for(var i=4;i<childnodes.length;i++)
		{
		childnodes[i].style.display="block";
		
		}
    showentries=null;}

}
