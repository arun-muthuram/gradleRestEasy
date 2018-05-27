package resteasySample;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import java.util.logging.*;
import javax.ws.rs.Path;
import resteasySample.PATCH;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Context;
import java.util.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import resteasySample.Contact;
import static resteasySample.StartObjectify.ofy;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.Properties;
import com.google.appengine.api.mail.MailService.Message;
import com.google.appengine.api.mail.MailServiceFactory;


@Path("/rest-api/v1")
public class RESTEasyHelloWorldService {

	@GET
	@Path("/")
	@Produces("text/plain")
	public Response getIndex() {
		String documentation = "*URL    -   \"/RestAPI/v1\"\r\n" + " Method -   GET\r\n"
				+ " Description - Provides API v1 documentation.\r\n" + " Response  - text/plain;SC-200\r\n" + "\r\n"
				+ "*URL         -  \"/RestAPI/v1/user/create\"\r\n" + " Method      -  POST\r\n"
				+ " RequestBody - {\"name\":String, \"email\":String, \"password\":String, \"phoneNumber\":String}\r\n"
				+ " Description         - Registers the user.\r\n"
				+ " Success Response    - application/json;SC-201      \r\n"
				+ "                       {\"Success\": true,\r\n"
				+ "			             \"message\": \"contact created\"}\r\n"
				+ " Error Response      - application/json;SC-409      \r\n"
				+ "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"Email already registered\"}			             \r\n"
				+ "			  \r\n" + "            \r\n" + "*URL     -  \"/RestAPI/v1/user/session\"\r\n"
				+ " Method  -  POST\r\n" + " RequestBody - {\"email\":String, \"password\":String}\r\n"
				+ " Description - Creates a login session.\r\n"
				+ " Success Response    - application/json;SC-200      \r\n"
				+ "                       {\"Success\": true,\r\n"
				+ "			            \"message\": \"Successfully loggedin\",\r\n"
				+ "			            \"profileDetails\":\r\n" + "			                { \"id\":String,\r\n"
				+ "			                  \"name\":String,\r\n" + "			                  \"email\",String,\r\n"
				+ "			                  \"PhoneNumber\":String\r\n" + "			                 }\r\n"
				+ "			            }\r\n" + " Error Response      - application/json;SC-423      \r\n"
				+ "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"User Account deactivated\"}\r\n"
				+ "			           application/json;SC-401      \r\n"
				+ "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"Invalid credentials\"} \r\n" + "\r\n"
				+ "*URL     -  \"/RestAPI/v1/user/session/logout\"\r\n" + " Method  -  GET\r\n"
				+ " Description - Destroys the user session(requires user to be logged in).\r\n"
				+ " Success Response    - application/json;SC-200\r\n"
				+ "                       {\"Success\": true,\r\n"
				+ "			            \"message\": \"Successfully logged out\"}\r\n"
				+ " Error Response      - application/json;SC-401\r\n"
				+ "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"User not logged in\"}			            \r\n" + "\r\n"
				+ "*URL    -  \"/RestAPI/v1/user/deactivate/{id}\"\r\n" + " Method -  PATCH\r\n"
				+ " Description - deactivates the user account(requires user to be logged in).\r\n"
				+ " Success Response    - application/json;SC-200\r\n"
				+ "                       {\"Success\": true,\r\n"
				+ "			            \"message\": \"Account successfully deactivated\"}\r\n"
				+ " Error Response      - application/json;SC-401\r\n"
				+ "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"User not logged in\"}\r\n"
				+ "			         - application/json;SC-401\r\n" + "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"Invalid credentials\"}\r\n" + "			            \r\n"
				+ " \r\n" + " \r\n" + "*URL    -  \"/RestAPI/v1/user/update/{id}\"\r\n" + " Method -  PATCH\r\n"
				+ " RequestBody- {\"name\":String,\"email\":String,\"phoneNumber\":String}\r\n"
				+ " Description - Updates one or more user details(requires user to be logged in).\r\n"
				+ " Success Response    - application/json;SC-200      \r\n"
				+ "                       {\"Success\": true,\r\n"
				+ "			            \"message\": \"Successfully updated\",\r\n"
				+ "			            \"profileDetails\":\r\n" + "			                { \"id\":String,\r\n"
				+ "			                  \"name\":String,\r\n" + "			                  \"email\",String,\r\n"
				+ "			                  \"PhoneNumber\":String\r\n" + "			                 }\r\n"
				+ "			            }\r\n" + "Error Response      - application/json;SC-401\r\n"
				+ "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"User not logged in\"}\r\n"
				+ "			        - application/json;SC-401\r\n" + "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"Invalid credentials\"}	\r\n"
				+ "                    - application/json;SC-422\r\n"
				+ "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"no input details provided to update\"}\r\n"
				+ "			       - application/json;SC-422\r\n" + "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"enter a valid name\"}\r\n"
				+ "			       - application/json;SC-422\r\n" + "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"enter a valid email\"}\r\n"
				+ "			       - application/json;SC-422\r\n" + "                       {\"Success\": false,\r\n"
				+ "			            \"message\": \"enter a valid 10 digit phone number\"}\r\n"
				+ "                - application/json;SC-400\r\n" + "                       {\"Success\": false,\r\n"
				+ "                     \"message\": \"enter a valid JSON response body\"}\r\n\"  ";
		return Response.status(200).entity(documentation).build();
	}

	@SuppressWarnings("unchecked")
	@POST
	@Path("/user/create")
	@Consumes("application/json")
	@Produces("application/json")
	public Response register(Contact contact, @Context HttpServletRequest request) {
		contact.setActive(true);
		JSONObject result = new JSONObject();
		Contact results = ofy().load().type(Contact.class).filter("email", contact.getEmail())
				.filter("password", contact.getPassword()).first().now();
		System.out.println("contact result : " + results);
		if (results != null) {
			result.put("Success", false);
			result.put("message", "Email already registered");
			return Response.status(409).entity(result).build();

		} else {
			HttpSession session = request.getSession();
			session.setAttribute("userInfo", contact);
			ofy().save().entity(contact).now();
			result.put("Success", true);
			result.put("message", "contact created");
			return Response.status(201).entity(result).build();

		}
	}

	@SuppressWarnings("unchecked")
	@POST
	@Path("/user/session")
	@Consumes("application/json")
	@Produces("application/json")
	public Response login(Contact contact, @Context HttpServletRequest request) {
		JSONObject result = new JSONObject();
		Boolean login = false;
		Contact loginresult = ofy().load().type(Contact.class).filter("email", contact.getEmail())
				.filter("password", contact.getPassword()).first().now();
		if (loginresult != null) {
			if (loginresult.getActive()) {
				login = true;
			} else {
				result.put("Success", false);
				result.put("message", "User Account deactivated");
				return Response.status(423).entity(result).build();
			}
		}

		if (login) {
			HttpSession session = request.getSession();
			session.setAttribute("userInfo", loginresult);
			result.put("Success", true);
			result.put("message", "Successfully loggedin");
			JSONObject profiledetails = new JSONObject();
			profiledetails.put("id", loginresult.getId());
			profiledetails.put("name", loginresult.getName());
			profiledetails.put("email", loginresult.getEmail());
			profiledetails.put("phoneNumber", loginresult.getPhoneNumber());
			result.put("profileDetails", profiledetails);
			return Response.status(200).entity(result).build();

		} else {
			result.put("Success", false);
			result.put("message", "Invalid credentials");
			return Response.status(401).entity(result).build();

		}
	}

	@SuppressWarnings("unchecked")
	@GET
	@Path("/user/session/logout")
	@Produces("application/json")
	public Response logout(@Context HttpServletRequest request) throws IOException {
		JSONObject result = new JSONObject();
		HttpSession session = request.getSession(false);
		System.out.println(session);
		if (session != null) {
			session.invalidate();
			result.put("Success", true);
			result.put("message", "Successfully logged out");
			return Response.status(200).entity(result).build();
		} else {
			result.put("Success", false);
			result.put("message", "User not logged in");
			return Response.status(401).entity(result).build();
		}
	}

	@SuppressWarnings("unchecked")
	@PATCH
	@Path("/user/deactivate/{id}")
	@Produces("application/json")
	public Response deactivate(@PathParam("id") String id, @Context HttpServletRequest request) {
		JSONObject result = new JSONObject();
		HttpSession session = request.getSession(false);
		if (session != null) {
			Contact deactivateContact = (Contact) session.getAttribute("userInfo");
			String accId = "" + deactivateContact.getId();
			if (id.equals(accId)) {
				session.invalidate();
				deactivateContact = ofy().load().type(Contact.class).filter("email", deactivateContact.getEmail())
						.first().now();
				deactivateContact.setActive(false);
				ofy().save().entity(deactivateContact).now();
				result.put("success", true);
				result.put("message", "Account successfully deactivated");
				return Response.status(200).entity(result).build();
			} else {
				result.put("success", false);
				result.put("message", "Invalid credentials");
				return Response.status(401).entity(result).build();
			}
		} else {
			result.put("success", false);
			result.put("message", "user not logged in");
			return Response.status(401).entity(result).build();

		}
	}

	@SuppressWarnings("unchecked")
	@PATCH
	@Path("/user/update/{id}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response update(@PathParam("id") String id, JSONObject updateinfo, @Context HttpServletRequest request) {
		JSONObject result = new JSONObject();
		HttpSession session = request.getSession(false);
		if (session != null) {
			Contact updateContact = (Contact) session.getAttribute("userInfo");
			String accId = "" + updateContact.getId();
			if (id.equals(accId)) {
				updateContact = ofy().load().type(Contact.class).filter("email", updateContact.getEmail()).first()
						.now();
				String updateName = (String) updateinfo.get("name");
				String updateEmail = (String) updateinfo.get("email");
				String updatePhoneNumber = (String) updateinfo.get("phoneNumber");
				if (updateName == null && updateEmail == null && updatePhoneNumber == null) {
					result.put("Success", false);
					result.put("message", "no input details provided to update");
					return Response.status(422).entity(result).build();
				}
				if (updateName != null) {
					if (updateName.matches("^[a-zA-Z][a-zA-Z\\\\s]*$"))
						updateContact.setName(updateName);
					else {
						result.put("Success", false);
						result.put("message", "enter a valid name");
						return Response.status(422).entity(result).build();
					}
				}
				if (updateEmail != null) {
					if (updateEmail.matches("^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$"))
						updateContact.setEmail(updateEmail);
					else {
						result.put("Success", false);
						result.put("message", "enter a valid email");
						return Response.status(422).entity(result).build();
					}
				}
				if (updatePhoneNumber != null) {
					if (updatePhoneNumber.matches("^[789][0-9]{9}$"))
						updateContact.setPhoneNumber(updatePhoneNumber);
					else {
						result.put("Success", false);
						result.put("message", "enter a valid 10 digit phone number");
						return Response.status(422).entity(result).build();
					}
				}
				ofy().save().entity(updateContact).now();
				session.setAttribute("userInfo", updateContact);
				result.put("Success", true);
				result.put("message", "Successfully updated");
				JSONObject profiledetails = new JSONObject();
				profiledetails.put("id", updateContact.getId());
				profiledetails.put("name", updateContact.getName());
				profiledetails.put("email", updateContact.getEmail());
				profiledetails.put("phoneNumber", updateContact.getPhoneNumber());
				result.put("profileDetails", profiledetails);
				return Response.status(200).entity(result).build();

			} else {
				result.put("success", false);
				result.put("message", "Invalid credentials");
				return Response.status(401).entity(result).build();
			}
		} else {
			result.put("success", false);
			result.put("message", "user not logged in");
			return Response.status(401).entity(result).build();
		}

	}

	@SuppressWarnings("unchecked")
	@POST
	@Path("/user/clockin/{id}")
	@Produces("application/json")
	public Response clockin(@PathParam("id") String id, @Context HttpServletRequest request) {
		TimerInfo timerentry = new TimerInfo(id);
		ofy().save().entity(timerentry).now();
		JSONObject result = new JSONObject();
		result.put("Success", true);
		result.put("entryid", timerentry.getEntryId());
		result.put("intime",timerentry.getInTime());
		return Response.status(200).entity(result).build();

	}

	@SuppressWarnings("unchecked")
	@PATCH
	@Path("user/clockout/{entryid}")
	@Produces("application/json")
	public Response clockout(@PathParam("entryid") String entryid, @Context HttpServletRequest request) {
		TimerInfo timerentry = ofy().load().type(TimerInfo.class).id(Long.parseLong(entryid)).now();
		timerentry.setOutTime(new Date().getTime());
		timerentry.setCompletedStatus(true);
		ofy().save().entity(timerentry).now();

		JSONObject result = new JSONObject();
		result.put("Success", true);
		result.put("entryid", timerentry.getEntryId());
		result.put("outtime", timerentry.getOutTime());
		return Response.status(200).entity(result).build();

	}

	@SuppressWarnings("unchecked")
	@GET
	@Path("/user/timerinfo/{userid}")
	@Produces("application/json")
	public Response timerinfo(@PathParam("userid") String userid) {
		 JSONObject result = new JSONObject();
		 JSONArray thisWeekEntries= new JSONArray();
		 Calendar today = Calendar. getInstance();
		 today.setTime(new Date());
		 Calendar entryDay = Calendar.getInstance();
		 ofy().clear();
		List<TimerInfo> timerInfoList = ofy().load().type(TimerInfo.class).filter("userId", userid).list();
		for(TimerInfo x: timerInfoList)
		{
			entryDay.setTime(new Date(x.getInTime()));
	        if(entryDay.get(entryDay.WEEK_OF_YEAR)==today.get(today.WEEK_OF_YEAR))
			{
	        	JSONObject timerentry = new JSONObject();
				timerentry.put("intime", x.getInTime());
				timerentry.put("outtime", x.getOutTime());
				timerentry.put("entryid", x.getEntryId());
				thisWeekEntries.add(timerentry);

			}
			
		}
		result.put("Success", true);
		result.put("thisWeekEntries", thisWeekEntries);
		return Response.status(200).entity(result).build();
		
	
	}
	@SuppressWarnings("unchecked")
	@DELETE
	@Path("/user/delete/entry/{entryid}")
	@Produces("application/json")
	public Response deleteEntry(@PathParam("entryid") String entryidString)
	{
		Long entryid=Long.parseLong(entryidString); 
		JSONObject result = new JSONObject();
		 ofy().delete().type(TimerInfo.class).id(entryid).now();
		if(ofy().load().type(TimerInfo.class).id(entryid).now()==null)
		 {result.put("Success", true);
		 result.put("message", "entry deleted.");
		 return Response.status(200).entity(result).build();}
		else
		{
			result.put("Success", false);
			 result.put("message", "entry deletion failed.");
			 return Response.status(200).entity(result).build();
			
		}
		
	}
	@SuppressWarnings("unchecked")
	@PATCH
	@Path("/user/password/token/create")
	@Produces("application/json")
	@Consumes("application/json")
	public Response createToken(JSONObject email,@Context HttpServletRequest request) throws UnsupportedEncodingException
	{
		JSONObject result = new JSONObject();
		Contact user = ofy().load().type(Contact.class).filter("email",email.get("email")).first().now();
		if(user==null)
		{
			result.put("Success", false);
			result.put("message", "Email doesn't exist");
			return Response.status(401).entity(result).build();
		}
		else
		{
			String resetToken= user.getId()+"X"+UUID.randomUUID().toString()+"X"+new Date().getTime();
			user.setResetToken(resetToken);
			ofy().save().entity(user).now();
			
		   String to = (String)email.get("email");
		   
		 
		   

		   try {
			   Message msg = new Message();
			   msg.setSender("arun.muthuraman@anywhere.co");
			   msg.setReplyTo(to);
			   msg.setTo(to);
			   msg.setSubject("Password reset");
			   msg.setHtmlBody("<html><h1>Dear User,</h1><p>Please click the following link to reset your password.</p><a href=\"https://login-signup-ui.appspot.com/token?token="+resetToken+"\">Reset password</a></html>");
			   MailServiceFactory.getMailService().send(msg);
			   
		   }catch (Exception mex) {
			   final Logger log = Logger.getLogger(RESTEasyHelloWorldService.class.getName());
			   log.info(mex.toString());
		      
		   }
			
			result.put("Success", true);
			return Response.status(200).entity(result).build();
			
		}
			
	}
	@SuppressWarnings("unchecked")
	@PATCH
	@Path("/user/password/reset")
	@Produces("application/json")
	@Consumes("application/json")
	public Response resetpasswordtoken(JSONObject reset,@Context HttpServletRequest request)
	{
		JSONObject result= new JSONObject();
		String userid=(String)reset.get("userid");
		userid=userid.trim();
		Contact user=ofy().load().type(Contact.class).id(Long.parseLong(userid)).now();
		if(user.getResetToken()!=null)
		{
			user.setPassword((String)reset.get("password"));
			user.setResetToken(null);
			ofy().save().entity(user).now();
			HttpSession session = request.getSession();
			session.setAttribute("userInfo", user);
			result.put("Success", true);
			
			return Response.status(200).entity(result).build();
		}
		else
		{
			result.put("Success", false);
			result.put("message", "Reset password failed.");
			return Response.status(200).entity(result).build();
			
			
			
		}
	}
	  
		
	
	
		
}