package ecommerce.ecommerce.domain.user.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthInfo {

    @NotNull
    String username;

    @NotNull
    String password;
}
