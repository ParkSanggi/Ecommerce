package ecommerce.ecommerce.jwt;

import ecommerce.ecommerce.domain.user.UserDetailsImpl;
import ecommerce.ecommerce.domain.user.dto.LoginToken;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class TokenProvider implements InitializingBean {

    @Value("${jwt.secret}")
    private String secret;
    private Key key;

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public LoginToken createToken(Authentication authentication) {
        long expiredTime = 100 * 60L * 60L * 24L;
        Date ext = new Date();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ext.setTime(ext.getTime() + expiredTime);
        return new LoginToken(
                Jwts.builder()
                        .setSubject(userDetails.getId().toString())
                        .signWith(key)
                        .setExpiration(ext)
                        .compact()
        );
    }
}
