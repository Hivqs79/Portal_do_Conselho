package net.weg.general_api.service.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.entity.users.UserAuthentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.util.Date;

@Service
@AllArgsConstructor
public class TokenService {

    private static final String password = "my-secret-password";
    private static final Algorithm algorithm = Algorithm.HMAC256(password);

    public String generateToken(UserAuthentication userAuthentication) {
        try {
            String token = JWT.create()
                    .withIssuer("Portal do Conselho")
                    .withSubject(userAuthentication.getUsername())
                    .withExpiresAt(generateExpire())
                    .sign(algorithm);

            return token;
        } catch (JWTCreationException e) {
            System.out.println("JWT Creation Exception");
            throw new RuntimeException(e);
        }
    }

    public String validate(String token) {
        try {
            return JWT.require(algorithm)
                    .withIssuer("Portal do Conselho")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTCreationException e) {
            System.out.println("JWT Verification Error!");
            return "";
        }
    }

    private Instant generateExpire() {
        return Instant.now().plusSeconds(18000).atZone(ZoneId.of("-03:00")).toInstant();
    }

}
