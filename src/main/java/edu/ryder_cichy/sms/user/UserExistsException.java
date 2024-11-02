package edu.ryder_cichy.sms.user;

public class UserExistsException extends RuntimeException {
    public UserExistsException(String message) {
        super(message);
    }
    public UserExistsException() {}

}
