package net.weg.general_api.model.entity.users;

import lombok.Data;

import java.util.Date;

@Data
public class EmailModel {
    private String owner;
    private String sender;
    private String reciver;
    private String title;
    private String content;
    private String turma; // Opcional, não usado neste caso
    private Date date;    // Opcional, não usado neste caso

    // Getters e Setters
}