package ch.clip.trips.controller;

import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.repo.BusinessTripRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/trips")
public class BusinessTripController {

	private final BusinessTripRepository tripRepo;

	public BusinessTripController(BusinessTripRepository tripRepo) {
		this.tripRepo = tripRepo;
	}

	@GetMapping
	public List<BusinessTrip> getAllTrips() {
		return tripRepo.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<BusinessTrip> getTripById(@PathVariable Long id) {
		return tripRepo.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<BusinessTrip> createTrip(@RequestBody BusinessTrip trip) {
		return ResponseEntity.ok(tripRepo.save(trip));
	}

	@PutMapping("/{id}")
	public ResponseEntity<BusinessTrip> updateTrip(@PathVariable Long id, @RequestBody BusinessTrip tripData) {
		Optional<BusinessTrip> tripOpt = tripRepo.findById(id);
		if (tripOpt.isPresent()) {
			BusinessTrip trip = tripOpt.get();
			trip.setTitle(tripData.getTitle());
			trip.setDescription(tripData.getDescription());
			trip.setStartTrip(tripData.getStartTrip());
			trip.setEndTrip(tripData.getEndTrip());
			return ResponseEntity.ok(tripRepo.save(trip));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
		if (tripRepo.existsById(id)) {
			tripRepo.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
