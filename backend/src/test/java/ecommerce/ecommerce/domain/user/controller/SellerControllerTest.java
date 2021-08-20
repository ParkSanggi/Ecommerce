package ecommerce.ecommerce.domain.user.controller;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import ecommerce.ecommerce.domain.user.service.UserService;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


@WebMvcTest
public class SellerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void 이미_존재하는_아이디라면_status는_true() throws Exception {
        //given
        when(userService.isDuplicated("test1")).thenReturn(true);

        //when
        ResultActions result = mockMvc.perform(get("/seller/join?loginId=test1"));
    
        //then
        result.andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.duplStatus").value(true));
    }

    @Test
    public void 아이디가_중복되지_않는다면_status는_false() throws Exception {
        //given
        when(userService.isDuplicated("test1")).thenReturn(false);

        //when
        ResultActions result = mockMvc.perform(get("/seller/join?loginId=test1"));
    
        //then
        result.andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.duplStatus").value(false));
    }
    
}
