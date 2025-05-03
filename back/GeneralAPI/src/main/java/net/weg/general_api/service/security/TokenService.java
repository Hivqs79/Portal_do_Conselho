/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.weg.general_api.service.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.TokenGeneratorException;
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
            throw new TokenGeneratorException(e.getMessage());
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
