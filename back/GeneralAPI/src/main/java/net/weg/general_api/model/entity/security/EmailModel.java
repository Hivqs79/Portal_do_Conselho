package net.weg.general_api.model.entity.security;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class EmailModel {
    private String owner;
    private String sender;
    private String reciver;
    private String title;
    private String content;
    private String password;
    private String token;
    private String turma; // Opcional, não usado neste caso
    private LocalDateTime date;

    // Getters e Setters
}