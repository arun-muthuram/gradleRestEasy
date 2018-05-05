package resteasySample;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;

import resteasySample.Contact;

import static resteasySample.StartObjectify.ofy;




@Path("/v1")
public class RESTEasyHelloWorldService {

    @GET
    @Path("/")
    @Produces(MediaType.TEXT_PLAIN)
    public String getMsg() {
        String msg = "interface";
        return msg;
    }
    
    @POST
    @Path("/user/create")
    @Consumes("application/json")
    @Produces("application/json")
    public Response register(Contact contact)
    {   contact.setActive(true);
        JSONObject result = new JSONObject();
        Contact results = ofy().load().type(Contact.class).filter("email",contact.getEmail()).first().now();
        if (results!=null) {	
			result.put("Success", false);
			result.put("message", "Email already registered");
			return Response.status(409).entity(result).build();
			
        }
        else
        {
    	ofy().save().entity(contact).now();
		result.put("Success", true);
		result.put("message", "contact created");
		return Response.status(201).entity(result).build();
        }   	
    }
    
    @POST
    @Path("/user/session")
    @Consumes("application/json")
    @Produces("application/json")
    public Response login(Contact contact)
    {
    	JSONObject result = new JSONObject(); 
    	Boolean login =false;
		    Contact loginresult = ofy().load().type(Contact.class).filter("email",contact.getEmail()).first().now();
		    if(loginresult!=null)
		    {
		    	System.out.println(loginresult.getEmail());
		    	if(loginresult.getPassword().equals(contact.getPassword())&&loginresult.getActive())
		    		login=true;
		    }
		    if (login) {
		    	
		    	result.put("Success", true);
		    	result.put("message", "Successfully loggedin");
		    	JSONObject profiledetails=new JSONObject();
		    	profiledetails.put("name",loginresult.getName());
		    	profiledetails.put("email", loginresult.getEmail());
		    	profiledetails.put("phoneNumber", loginresult.getPhoneNumber());
		    	result.put("profileDetails", profiledetails);
		    	return Response.status(202).entity(result).build();
		    }
		    else {
		    	result.put("Success", false);
		    	result.put("message", "Invalid credentials");
		    	return Response.status(401).entity(result).build();
		    	
		    }
    }
    
    @PUT
    @Path("/user/deactivate")
    @Consumes("application/json")
    @Produces("application/json")
    public Response deactivate(Contact contact)
    {
    	JSONObject result = new JSONObject(); 
    	Boolean authorized =false;
		    Contact  updateActive= ofy().load().type(Contact.class).filter("email",contact.getEmail()).first().now();
		    if(updateActive!=null)
		    {
		    	if(updateActive.getPassword().equals(contact.getPassword())&&updateActive.getActive())
		    		authorized=true;
		    }
		    if (authorized) {
		    	updateActive.setActive(false);
				ofy().save().entity(updateActive).now();
				result.put("success", true);
				result.put("message", "Account successfully deactivated");
				return Response.status(202).entity(result).build();
		    }
		    else
		    {
		    	result.put("success",false);
		    	result.put("message", "invalid credentials");
		    	return Response.status(401).entity(result).build();
		    	
		    }
    }
    

    
}