package esprit.damage_claim.Controllers;

import esprit.damage_claim.Entities.Claim;
import esprit.damage_claim.Services.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
public class ClaimController {
    @Autowired
    private ClaimService claimService;

    @PostMapping
    public Claim createClaim(@RequestBody Claim claim) {
        return claimService.createClaim(claim);
    }

    @PutMapping("/{claimId}/assign-expert")
    public Claim assignExpert(@PathVariable Long claimId, @RequestParam Long expertId) {
        return claimService.assignExpertToClaim(claimId, expertId);
    }
}