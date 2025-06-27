package ch.clip.trips.controller;

import ch.clip.trips.model.Meeting;
import ch.clip.trips.repo.MeetingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

	private final MeetingRepository meetingRepo;

	public MeetingController(MeetingRepository meetingRepo) {
		this.meetingRepo = meetingRepo;
	}

	@GetMapping
	public List<Meeting> getAllMeetings() {
		return meetingRepo.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Meeting> getMeetingById(@PathVariable Long id) {
		return meetingRepo.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
		return ResponseEntity.ok(meetingRepo.save(meeting));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Meeting> updateMeeting(@PathVariable Long id, @RequestBody Meeting newMeeting) {
		return meetingRepo.findById(id)
				.map(meeting -> {
					meeting.setTitle(newMeeting.getTitle());
					meeting.setDescription(newMeeting.getDescription());
					meeting.setBusinessTrip(newMeeting.getBusinessTrip());
					return ResponseEntity.ok(meetingRepo.save(meeting));
				})
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
		if (meetingRepo.existsById(id)) {
			meetingRepo.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
