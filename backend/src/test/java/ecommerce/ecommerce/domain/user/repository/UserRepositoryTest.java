package ecommerce.ecommerce.domain.user.repository;

import ecommerce.ecommerce.domain.user.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashSet;

@Slf4j
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void existsByUsername_이미_존재하는_로그인_아이디라면_true() {
        //given
        String username = "test1";
        User user = User.builder()
                    .username(username)
                    .password("abcd").build();
        userRepository.save(user);

        //when
        boolean result = userRepository.existsByUsername(username);

        //then
        Assertions.assertTrue(result);
    }

    @Test
    void existsByUsername_db에_존재하지_않는_아이디라면_false() {
        String username = "test2";
        User user = User.builder()
                .username("test1")
                .password("abcd").build();
        userRepository.save(user);

        //when
        boolean result = userRepository.existsByUsername(username);

        //then
        Assertions.assertFalse(result);
    }

    @Test
    void user_table_constraint_username이_중복_저장되려고_하면_런타임_예외() {
        //given
        String username = "test";
        User user = User.builder()
                        .username(username)
                        .password("abcd").build();
        User user2 = User.builder()
                        .username(username)
                        .password("1234")
                        .authorities(new HashSet<>()).build();
        userRepository.save(user);

        //when
        DataIntegrityViolationException result =
                Assertions.assertThrows(
                        DataIntegrityViolationException.class, () -> userRepository.save(user2));
   }
}
