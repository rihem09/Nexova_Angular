package esprit.damage_claim.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import lombok.Data;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClaim;

    private String description; // Description de la réclamation (ex: "Problème de freins")

    private String clientLocation; // Localisation du client (ex: "Paris, France")

    private String status; // Statut de la réclamation (ex: "OPEN", "IN_PROGRESS", "RESOLVED")

    // Relation Many-to-One avec Expert
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "expert_id") // Clé étrangère vers la table Expert
    private Expert expert;

    // Relation Many-to-One avec Mechanic
    // l'annotation joincolumn specifie la colonne de la cle etrangére dans la table Claim
    //fetch.lazy
    @ManyToOne
    @JoinColumn(name = "mechanic_id") // Clé étrangère vers la table Mechanic
    private Mechanic mechanic;
}