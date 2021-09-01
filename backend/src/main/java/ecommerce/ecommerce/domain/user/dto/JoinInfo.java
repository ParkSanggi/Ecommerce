package ecommerce.ecommerce.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class JoinInfo {
    @NotBlank
    String username;

    @NotBlank
    String password;
}
