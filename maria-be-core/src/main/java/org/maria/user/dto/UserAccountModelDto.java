package org.maria.user.dto;

import lombok.Data;

@Data
public class UserAccountModelDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
