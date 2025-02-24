package esprit.damage_claim.Services;

import esprit.damage_claim.Entities.Mechanic;
import esprit.damage_claim.Repositories.MechanicRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MechanicService {
    @Autowired
private MechanicRepository mechanicRepository;

    public List<Mechanic> findAvailableMechanicsByLocation(String location) {
        return mechanicRepository.findByLocationAndAvailable(location, true);
    }
}
