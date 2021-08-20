package ecommerce.ecommerce.domain.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ecommerce.ecommerce.domain.user.dto.CheckDuplicationDTO;
import ecommerce.ecommerce.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerController {

    private final UserService userService;

    @GetMapping("/join")
    public CheckDuplicationDTO checkDuplicationOf(@RequestParam String loginId) {
        return new CheckDuplicationDTO(
            userService.isDuplicated(loginId)
        );
    }
}
