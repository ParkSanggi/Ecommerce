package ecommerce.ecommerce.domain.user.repository;

import ecommerce.ecommerce.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByLoginId(String loginId);
}
