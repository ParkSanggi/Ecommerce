package ecommerce.ecommerce.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class AuthInfo {

    @NotBlank
    String username;

    @NotBlank
    String password;
}
