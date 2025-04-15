package net.weg.general_api.service.security;

import org.springframework.stereotype.Service;

@Service
public class PasswordGeneratorService {

    public static String generateSimpleAlphanumericPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt((int) (Math.random() * chars.length())));
        }
        return sb.toString();
    }

}
