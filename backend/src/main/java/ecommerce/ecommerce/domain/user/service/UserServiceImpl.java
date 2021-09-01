package ecommerce.ecommerce.domain.user.service;

import ecommerce.ecommerce.domain.user.User;
import ecommerce.ecommerce.domain.user.UserDetailsImpl;
import ecommerce.ecommerce.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void join(User user) {
        user.encodePassword(passwordEncoder);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findOneWithAuthoritiesByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException(username));
        return new UserDetailsImpl(user);
    }
}


