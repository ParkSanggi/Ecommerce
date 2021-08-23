package ecommerce.ecommerce.domain.user.controller;

import ecommerce.ecommerce.domain.user.User;
import ecommerce.ecommerce.domain.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void checkExistence_이미_존재하는_아이디면_true() throws Exception {
        //given
        User user = User.builder()
                .loginId("test1")
                .password("1234").build();
        userRepository.save(user);

        //when
        ResultActions result = mockMvc.perform(get("/user/check?loginId=test1"));

        //then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.existence").value(true));
    }

    @Test
    void checkExistence_새로운_아이디면_false() throws Exception {
        //given
        User user = User.builder()
                .loginId("test1")
                .password("1234").build();
        userRepository.save(user);

        //when
        ResultActions result = mockMvc.perform(get("/user/check?loginId=test2"));

        //then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.existence").value(false));
    }
}
