package edu.ryder_cichy.sms.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@AllArgsConstructor
@Data
@Document("users")
public class AuthUser {
    @Id
    private String uuid;

    @Indexed(unique = true)
    private String username;

    private String password;
}
