package esprit.damage_claim.Controllers;


import esprit.damage_claim.Entities.Expert;
import esprit.damage_claim.Services.ExpertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/experts")
public class ExpertController {

    @Autowired
    private ExpertService expertService;

    @GetMapping("/available")
    public List<Expert> findAvailableExperts(@RequestParam String location) {
        return expertService.findAvailableExpertsByLocation(location);
    }
}
