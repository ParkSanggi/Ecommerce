package ecommerce.ecommerce.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class JoinInfo {
    String loginId;
    String password;
}
