package resteasySample;

import java.io.Serializable;
import java.util.Date;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
@Entity
public class TimerInfo implements Serializable {

@Id
private Long entryId;
@Index
private String userId;
@Index
private long inTime;
@Index
private long outTime;
@Index
private boolean completedStatus;
 public TimerInfo()
 {
	 
 }
 public TimerInfo(String userId)
 {   
	 
	 this.inTime=new Date().getTime();
	 this.userId=userId;
	 this.completedStatus=false;
	
	 
 }
public Long getEntryId() {
	return entryId;
}
public void setEntryId(Long entryId) {
	this.entryId = entryId;
}
public String getUserId() {
	return userId;
}
public void setUserId(String userId) {
	this.userId = userId;
}
public long getInTime() {
	return inTime;
}
public void setInTime(long inTime) {
	this.inTime = inTime;
}
public long getOutTime() {
	return outTime;
}
public void setOutTime(long outTime) {
	this.outTime = outTime;
}
public boolean isCompletedStatus() {
	return completedStatus;
}
public void setCompletedStatus(boolean completedStatus) {
	this.completedStatus = completedStatus;
}

	
	
}
