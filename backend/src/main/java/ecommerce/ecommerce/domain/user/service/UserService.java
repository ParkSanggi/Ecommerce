package ecommerce.ecommerce.domain.user.service;

public interface UserService {
    boolean isDuplicated(String loginId);
}
