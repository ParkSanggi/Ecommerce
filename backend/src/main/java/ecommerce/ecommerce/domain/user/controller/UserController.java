package ecommerce.ecommerce.domain.user.controller;

import ecommerce.ecommerce.domain.user.dto.checkExistenceDTO;
import ecommerce.ecommerce.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/check")
    public checkExistenceDTO checkExistence(@RequestParam String loginId) {
        return new checkExistenceDTO(
                userService.isExist(loginId));
    }
}


