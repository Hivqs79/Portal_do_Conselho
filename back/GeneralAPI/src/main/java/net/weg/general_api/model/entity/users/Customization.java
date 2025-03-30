package net.weg.general_api.model.entity.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.enums.*;

@Builder
@Entity
@Table(name = "customization")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "mode_theme")
    private ModeThemeENUM modeTheme;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PalleteENUM pallete;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TextFont textFont;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TitleFont titleFont;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FontSizeENUM fontSize;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Override
    public String toString() {
        return "Customization{" +
                "id=" + id +
                ", modeTheme=" + modeTheme +
                ", pallete=" + pallete +
                ", textFont=" + textFont +
                ", titleFont=" + titleFont +
                ", fontSize=" + fontSize +
                ", user=" + user.getName() +
                '}';
    }
}
