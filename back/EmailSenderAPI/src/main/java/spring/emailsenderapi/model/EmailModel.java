package spring.emailsenderapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;

import java.time.LocalDateTime;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
/**
 * @author Vinícius Eduardo dos Santos
 */
public class EmailModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String owner;
    @NotBlank
    @Email
    private String sender;
    @NotBlank
    @Email
    private String reciver;
    @NotNull
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;

    //pode remover após os testes (adicionado apenas para os testes)
    private LocalDateTime date;
    private String turma;
    private String typeUser;
    private String typeContent;
    private String token;
    private String password;

    @PrePersist
    public void onPersist() {
        this.date = LocalDateTime.now();
    }

}
