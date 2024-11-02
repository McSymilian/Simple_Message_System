package edu.ryder_cichy.sms.user;

public class NoSuchUserException extends RuntimeException {
    public NoSuchUserException(String message) {
        super(message);
    }
    public NoSuchUserException() {}
}
