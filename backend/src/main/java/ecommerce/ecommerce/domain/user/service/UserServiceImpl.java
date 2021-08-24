package ecommerce.ecommerce.domain.user.service;

import ecommerce.ecommerce.domain.user.User;
import ecommerce.ecommerce.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void join(User user) {
        user.encodePassword(passwordEncoder);
        userRepository.save(user);
    }
}
