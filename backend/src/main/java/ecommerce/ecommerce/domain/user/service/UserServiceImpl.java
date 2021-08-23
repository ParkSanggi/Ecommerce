package ecommerce.ecommerce.domain.user.service;

import ecommerce.ecommerce.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public boolean isExist(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }
}
