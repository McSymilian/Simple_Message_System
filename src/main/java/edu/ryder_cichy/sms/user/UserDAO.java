package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDAO {
    private String username;
    private String password;
}
