package resteasySample;

import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;

/**
 * Custom Objectify Service that this application should use.
 */
public class StartObjectify {
    /**
     * This static block ensure the entity registration.
     */
    static {
    	ObjectifyService.factory().register(Contact.class);
        }

    /**
     * Use this static method for getting the Objectify service object in order to make sure the
     * above static block is executed before using Objectify.
     * @return Objectify service object.
     */
    public static Objectify ofy() {
        return ObjectifyService.ofy();
    }

   
}