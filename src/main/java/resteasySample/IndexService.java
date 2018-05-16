package resteasySample;


import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.plugins.providers.html.View;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import static resteasySample.StartObjectify.ofy;
import resteasySample.Contact;


import javax.ws.rs.Produces;
import javax.ws.rs.Path;

@Path("/")
public class IndexService {
@GET
@Produces(MediaType.TEXT_HTML)
public void getIndex(@Context HttpServletRequest request, @Context HttpServletResponse response) throws URISyntaxException, IOException, ServletException 
{
	request.getRequestDispatcher("index.jsp").forward(request, response);
  
}

@POST
@Path("/uploadhandler")
@Produces(MediaType.TEXT_HTML)
public void imageupload(@Context HttpServletRequest request, @Context HttpServletResponse response) throws URISyntaxException, IOException, ServletException
{
	 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService(); 
	Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
	 List<BlobKey> blobkey=blobs.get("profilepic");
	 HttpSession session=request.getSession();
	 Contact user=(Contact)session.getAttribute("userInfo");
	 ServingUrlOptions options = ServingUrlOptions.Builder
			    .withBlobKey(blobkey.get(0))
			    .secureUrl(false);
			String servingUrl = ImagesServiceFactory.getImagesService()
			    .getServingUrl(options);
     Contact profilepic=ofy().load().type(Contact.class).filter("email",user.getEmail()).first().now();
     profilepic.setProfilePicUrl(servingUrl);
     ofy().save().entity(profilepic).now();
     session.setAttribute("userInfo", profilepic);
     response.sendRedirect("/Welcome.jsp");
}	
}
