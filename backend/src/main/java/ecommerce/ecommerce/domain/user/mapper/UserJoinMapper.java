package ecommerce.ecommerce.domain.user.mapper;

import ecommerce.ecommerce.domain.user.User;
import ecommerce.ecommerce.domain.user.dto.JoinInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserJoinMapper {

    @Mapping(target = "id", ignore = true)
    User toUserEntity(JoinInfo joinInfo);
}
