package esprit.damage_claim.Repositories;

import esprit.damage_claim.Entities.Expert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpertRepository extends JpaRepository<Expert, Long> {
    List<Expert> findByLocationAndAvailable(String location, boolean available); // Trouver des experts disponibles par localisation

}
