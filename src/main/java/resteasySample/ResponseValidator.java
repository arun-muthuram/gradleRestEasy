package resteasySample;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.ext.Provider;

import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.annotations.interception.ServerInterceptor;
import org.jboss.resteasy.core.Headers;
import org.jboss.resteasy.core.ResourceMethodInvoker;
import org.jboss.resteasy.core.ServerResponse;
import org.jboss.resteasy.spi.Failure;
import org.jboss.resteasy.spi.HttpRequest;
import org.jboss.resteasy.spi.interception.AcceptedByMethod;
import org.jboss.resteasy.spi.interception.PreProcessInterceptor;
import org.json.simple.JSONObject;

@SuppressWarnings("deprecation")
@Provider
@ServerInterceptor
public class ResponseValidator implements PreProcessInterceptor, AcceptedByMethod {

	@Override
	public boolean accept(Class declaring, Method method) {

		String methodName = method.getName();
		if (methodName.equals("update"))
			return true;
		else
			return false;
	}

	@Override
	public ServerResponse preProcess(HttpRequest request, ResourceMethodInvoker method)
			throws Failure, WebApplicationException {
		ServerResponse response = null;
		InputStream bufferedInputStream = new BufferedInputStream(request.getInputStream());
		bufferedInputStream.mark(1024);
		String requestBody = "";
		try {
			requestBody = IOUtils.toString(bufferedInputStream, "UTF-8");
			bufferedInputStream.reset();
            System.out.println(requestBody);
			request.setInputStream(bufferedInputStream);
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		if (!requestBody.matches("\\s*\\{.*\\}")) {
			JSONObject result = new JSONObject();
			result.put("Success", false);
			result.put("message", "enter a valid JSON response body");
			response = new ServerResponse(result, 400, new Headers<Object>());
			return response;
		}

		return response;

	}
}
