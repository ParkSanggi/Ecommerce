package ecommerce.ecommerce.domain.user.repository;

import ecommerce.ecommerce.domain.user.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.SQLIntegrityConstraintViolationException;

@Slf4j
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void existsByLoginId_이미_존재하는_로그인_아이디라면_true() {
        //given
        String loginId = "test1";
        User user = User.builder()
                    .loginId(loginId)
                    .password("abcd").build();
        userRepository.save(user);

        //when
        boolean result = userRepository.existsByLoginId(loginId);

        //then
        Assertions.assertTrue(result);
    }

    @Test
    void existsByLoginId_db에_존재하지_않는_아이디라면_false() {
        String loginId = "test2";
        User user = User.builder()
                .loginId("test1")
                .password("abcd").build();
        userRepository.save(user);

        //when
        boolean result = userRepository.existsByLoginId(loginId);

        //then
        Assertions.assertFalse(result);
    }

    @Test
    void user_table_constraint_loginId가_중복_저장되려고_하면_런타임_예외() {
        //given
        String loginId = "test";
        User user = User.builder()
                        .loginId(loginId)
                        .password("abcd").build();
        User user2 = User.builder()
                        .loginId(loginId)
                        .password("1234").build();
        userRepository.save(user);

        //when
        SQLIntegrityConstraintViolationException result =
                Assertions.assertThrows(
                        SQLIntegrityConstraintViolationException.class, () -> userRepository.save(user2));
   }
}
