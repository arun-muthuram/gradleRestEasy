package resteasySample;

import resteasySample.Contact;
import static resteasySample.StartObjectify.ofy;
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
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.plugins.providers.html.View;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import static resteasySample.StartObjectify.ofy;
import resteasySample.Contact;

import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("/")
public class IndexService {
	@GET
	@Produces(MediaType.TEXT_HTML)
	public void getIndex(@Context HttpServletRequest request, @Context HttpServletResponse response)
			throws URISyntaxException, IOException, ServletException {
		request.getRequestDispatcher("index.jsp").forward(request, response);

	}

	@POST
	@Path("/uploadhandler")
	@Produces(MediaType.TEXT_HTML)
	public void imageupload(@Context HttpServletRequest request, @Context HttpServletResponse response)
			throws URISyntaxException, IOException, ServletException {
		BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		List<BlobKey> blobkey = blobs.get("profilepic");
		HttpSession session = request.getSession();
		Contact user = (Contact) session.getAttribute("userInfo");
		ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobkey.get(0)).secureUrl(false);
		String servingUrl = ImagesServiceFactory.getImagesService().getServingUrl(options);
		Contact profilepic = ofy().load().type(Contact.class).filter("email", user.getEmail()).first().now();
		profilepic.setProfilePicUrl(servingUrl);
		ofy().save().entity(profilepic).now();
		session.setAttribute("userInfo", profilepic);
		response.sendRedirect("/Welcome.jsp");
	}

	@GET
	@Path("/oauth/callback")
	@Produces(MediaType.TEXT_HTML)
	public Response oAuthCallBack(@QueryParam("code") String authcode, @QueryParam("error") String error,
			@Context HttpServletRequest request, @Context HttpServletResponse response)
			throws IOException, ParseException, ServletException, URISyntaxException {
		String clientid = "1062085927305-i99h2o72tn8ptdh8ft7kne26pkosbtni.apps.googleusercontent.com";
		String clientsecret = "pbJMIMuM1UX6LDG68yH7zKNM";
		java.net.URI locationerror = new java.net.URI("/index.jsp?message=Google%20signin%20failed");
		java.net.URI location = new java.net.URI("/index.jsp");
		

		if (error != null) {
			    return Response.temporaryRedirect(locationerror).build();

		} else {
			Client client = ClientBuilder.newClient();
			WebTarget target = client.target("https://www.googleapis.com/oauth2/v4/token");
			Form form = new Form();
			form.param("code", authcode).param("client_id", clientid).param("client_secret", clientsecret)
					.param("redirect_uri", "https://login-signup-ui.appspot.com/oauth/callback")
					.param("grant_type", "authorization_code");
			Entity<Form> entity = Entity.form(form);
			Response tokenResponse = target.request(MediaType.APPLICATION_JSON).post(entity);
			if (tokenResponse.getStatus() == 200) {
				String tokens = tokenResponse.readEntity(String.class);
				tokenResponse.close();
				JSONParser parser = new JSONParser();
				JSONObject json = (JSONObject) parser.parse(tokens);
				target = client.target("https://www.googleapis.com/oauth2/v2/userinfo").queryParam("access_token",
						json.get("access_token"));
				Response userInfoResponse = target.request(MediaType.APPLICATION_JSON).get();
				if (userInfoResponse.getStatus() == 200) {
					String userInfoString = userInfoResponse.readEntity(String.class);
					userInfoResponse.close();
					json = (JSONObject) parser.parse(userInfoString);
					
					Contact loginresult = ofy().load().type(Contact.class).filter("email", json.get("email")).first()
							.now();
					if (loginresult == null)
					{
						HttpSession session =request.getSession();
						session.invalidate();
				    return Response.temporaryRedirect(locationerror).build();
					}
					else {
						HttpSession session = request.getSession();
						session.setAttribute("userInfo", loginresult);
						 return Response.temporaryRedirect(location).build();

					}

				}

			} else {
				 return Response.temporaryRedirect(locationerror).build();
			}

		}
		return Response.temporaryRedirect(locationerror).build();

	}
}
