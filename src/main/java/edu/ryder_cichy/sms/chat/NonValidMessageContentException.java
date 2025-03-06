package edu.ryder_cichy.sms.chat;

public class NonValidMessageContentException extends RuntimeException {
    public NonValidMessageContentException(String message) {
        super(message);
    }
    public NonValidMessageContentException() {}
}
