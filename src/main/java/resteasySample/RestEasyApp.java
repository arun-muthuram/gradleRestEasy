package resteasySample;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;
public class RestEasyApp extends Application {
	
	private Set<Object> singletons = new HashSet<Object>();

	public RestEasyApp() {
		singletons.add(new RESTEasyHelloWorldService());
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}

}