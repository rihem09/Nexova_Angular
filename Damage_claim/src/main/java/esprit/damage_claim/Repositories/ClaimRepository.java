package esprit.damage_claim.Repositories;

import esprit.damage_claim.Entities.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

}