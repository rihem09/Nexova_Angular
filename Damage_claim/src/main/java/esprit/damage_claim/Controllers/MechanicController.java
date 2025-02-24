package esprit.damage_claim.Controllers;

import esprit.damage_claim.Entities.Mechanic;
import esprit.damage_claim.Services.MechanicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mechanics")
public class MechanicController {

    @Autowired
    private MechanicService mechanicService;

    @GetMapping("/available")
    public List<Mechanic> findAvailableMechanics(@RequestParam String location) {
        return mechanicService.findAvailableMechanicsByLocation(location);
    }
}