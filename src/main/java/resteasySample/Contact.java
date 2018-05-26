package resteasySample;
import java.io.Serializable;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import com.google.appengine.api.datastore.Key;
@Entity
public class Contact implements Serializable {
@Id
private Long id;
private String name;
@Index
private String email;
@Index
private String password;
private String phoneNumber;
@Index
private Boolean active;
@Index
private String ProfilePicUrl;
@Index
private String resetToken;

public Contact() {	
}
public Contact(String email, String password)
{
	this.email = email;
	this.password = password;
}
public Contact(String name,String email,String phoneNumber)
{
	this.name = name;
	this.email = email;
	this.phoneNumber = phoneNumber;
}

public Contact(String name, String email, String password, String phoneNumber) {
	this.name = name;
	this.email = email;
	this.password = password;
	this.phoneNumber = phoneNumber;
	this.active=true;
	
}
public void setActive(Boolean active) {
	this.active = active;
}
public Boolean getActive() {
	return active;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getPhoneNumber() {
	return phoneNumber;
}
public void setPhoneNumber(String phoneNumber) {
	this.phoneNumber = phoneNumber;
}
public Long getId()
{
   return id;	
}
public String getProfilePicUrl() {
	return ProfilePicUrl;
}
public void setProfilePicUrl(String profilePicUrl) {
	ProfilePicUrl = profilePicUrl;
}
public String getResetToken() {
	return resetToken;
}
public void setResetToken(String resetToken) {
	this.resetToken = resetToken;
}

}
