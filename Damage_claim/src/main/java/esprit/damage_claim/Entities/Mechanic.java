package esprit.damage_claim.Entities;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
@Data
@Entity

public class Mechanic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private boolean available;

    // Relation One-to-Many avec Claim
    @OneToMany(mappedBy = "mechanic", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Claim> claims; // Liste des réclamations assignées à ce mécanicien
}
