package edu.ryder_cichy.sms.user;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
    public InvalidCredentialsException() {}
}
