package ecommerce.ecommerce.domain.user.controller;

import ecommerce.ecommerce.domain.user.User;
import ecommerce.ecommerce.domain.user.dto.JoinInfo;
import ecommerce.ecommerce.domain.user.dto.checkExistenceDTO;
import ecommerce.ecommerce.domain.user.mapper.UserJoinMapper;
import ecommerce.ecommerce.domain.user.repository.UserRepository;
import ecommerce.ecommerce.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final UserJoinMapper userJoinMapper;

    @PostMapping("")
    public ResponseEntity<Void> create(@RequestBody JoinInfo joinInfo) {
        User user = userJoinMapper.toUserEntity(joinInfo);
        userService.join(user);
        return ResponseEntity.created(URI.create("/users/" + user.getId())).build();
    }

    @GetMapping("/check")
    public checkExistenceDTO checkExistence(@RequestParam String loginId) {
        return new checkExistenceDTO(
                userRepository.existsByLoginId(loginId));
    }


}


