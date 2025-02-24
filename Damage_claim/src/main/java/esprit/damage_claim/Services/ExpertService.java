package esprit.damage_claim.Services;

import esprit.damage_claim.Entities.Expert;
import esprit.damage_claim.Repositories.ExpertRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ExpertService {
    @Autowired
private ExpertRepository expertRepository;

    public List<Expert> findAvailableExpertsByLocation(String location) {
        return expertRepository.findByLocationAndAvailable(location, true);
    }

}
