package esprit.damage_claim.Services;
import esprit.damage_claim.Entities.Claim;
import esprit.damage_claim.Repositories.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {
    @Autowired
    private ClaimRepository claimRepository;
    public Claim createClaim(Claim claim) {
        claim.setStatus("OPEN"); // Définir le statut initial
        return claimRepository.save(claim);
    }

    public Claim assignExpertToClaim(Long claimId, Long expertId) {
        Claim claim = claimRepository.findById(claimId).orElseThrow(() -> new RuntimeException("Claim not found"));
        // Ici, vous devrez injecter ExpertRepository pour récupérer l'expert
        // Expert expert = expertRepository.findById(expertId).orElseThrow(() -> new RuntimeException("Expert not found"));
        // claim.setExpert(expert);
        return claimRepository.save(claim);
    }

}