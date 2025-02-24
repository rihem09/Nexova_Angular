package esprit.damage_claim.Repositories;

import esprit.damage_claim.Entities.Mechanic;

import java.util.List;

public interface MechanicRepository {
    List<Mechanic> findByLocationAndAvailable(String location, boolean available); // Trouver des mécaniciens disponibles par localisation
}
