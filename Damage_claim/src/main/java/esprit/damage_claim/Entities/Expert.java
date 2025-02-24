package esprit.damage_claim.Entities;

import jakarta.persistence.*;
import lombok.Data;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Setter
@Getter
@Entity
public class Expert {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private boolean available;
    // Relation One-to-Many avec Claim
    @OneToMany(mappedBy = "expert", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Claim> claims; // Liste des réclamations assignées à cet expert


}
