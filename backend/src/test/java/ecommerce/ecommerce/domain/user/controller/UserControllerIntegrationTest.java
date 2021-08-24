package ecommerce.ecommerce.domain.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecommerce.ecommerce.domain.user.User;
import ecommerce.ecommerce.domain.user.dto.JoinInfo;
import ecommerce.ecommerce.domain.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import javax.transaction.Transactional;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        //when
        ResultActions result = mockMvc.perform(get("/user/check?loginId=test1"));

        //then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.existence").value(false));
    }

    @Test
    void create_비밀번호는_암호화되어_저장되어야_한다() throws Exception {
        //given
        String loginId = "test";
        String password = "1234";
        JoinInfo joinInfo = new JoinInfo(loginId, password);
        String content = new ObjectMapper().writeValueAsString(joinInfo);

        //when
        ResultActions result = mockMvc.perform(post("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON));

        //then
        User user = userRepository.findByLoginId(loginId).orElseThrow();
        result.andExpect(status().isCreated());
        Assertions.assertTrue(passwordEncoder.matches(password, user.getPassword()));
    }
}
