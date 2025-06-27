package ch.clip.trips.controller;

import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.repo.BusinessTripRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/api/trips")
public class BusinessTripController {

	private final BusinessTripRepository tripRepo;

	public BusinessTripController(BusinessTripRepository tripRepo) {
		this.tripRepo = tripRepo;
	}

	@GetMapping
	public ResponseEntity<List<BusinessTrip>> getAllTrips() {
		try {
			List<BusinessTrip> trips = tripRepo.findAll();
			return ResponseEntity.ok(trips);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<BusinessTrip> getTripById(@PathVariable Long id) {
		try {
			return tripRepo.findById(id)
					.map(ResponseEntity::ok)
					.orElse(ResponseEntity.notFound().build());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@PostMapping
	public ResponseEntity<BusinessTrip> createTrip(@RequestBody BusinessTrip trip) {
		try {
			BusinessTrip savedTrip = tripRepo.save(trip);
			return ResponseEntity.ok(savedTrip);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<BusinessTrip> updateTrip(@PathVariable Long id, @RequestBody BusinessTrip tripData) {
		try {
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
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
		try {
			if (tripRepo.existsById(id)) {
				tripRepo.deleteById(id);
				return ResponseEntity.noContent().build();
			}
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
}
