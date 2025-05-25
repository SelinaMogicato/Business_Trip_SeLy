package ch.clip.trips.controller;

import ch.clip.trips.model.Booking;
import ch.clip.trips.model.User;
import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.repo.BookingRepository;
import ch.clip.trips.repo.UserRepository;
import ch.clip.trips.repo.BusinessTripRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDateTime;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping(value = "/api/bookings", produces = MediaType.APPLICATION_JSON_VALUE)
public class BookingController {

    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final BusinessTripRepository tripRepo;

    public BookingController(BookingRepository bookingRepo, UserRepository userRepo, BusinessTripRepository tripRepo) {
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this.tripRepo = tripRepo;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long userId) {
        try {
            return bookingRepo.findByUserId(userId);
        } catch (Exception e) {
            System.err.println("Error fetching bookings for user " + userId + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            System.out.println("Received booking request: " + booking);

            // Validate and fetch user
            if (booking.getUser() == null || booking.getUser().getId() == null) {
                return ResponseEntity.badRequest().body("User is required");
            }

            Long userId = booking.getUser().getId();
            User user = userRepo.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body("User with ID " + userId + " not found");
            }

            // Validate and fetch business trip
            if (booking.getBusinessTrip() == null || booking.getBusinessTrip().getId() == null) {
                return ResponseEntity.badRequest().body("Business trip is required");
            }

            Long tripId = booking.getBusinessTrip().getId();
            BusinessTrip trip = tripRepo.findById(tripId).orElse(null);
            if (trip == null) {
                return ResponseEntity.badRequest().body("Business trip with ID " + tripId + " not found");
            }

            // Create new booking with proper references
            Booking newBooking = new Booking();
            newBooking.setUser(user);
            newBooking.setBusinessTrip(trip);
            newBooking.setNotes(booking.getNotes());
            newBooking.setBookingDate(LocalDateTime.now());

            // Set status
            if (booking.getStatus() != null) {
                newBooking.setStatus(booking.getStatus());
            } else {
                newBooking.setStatus(Booking.BookingStatus.PENDING);
            }

            Booking savedBooking = bookingRepo.save(newBooking);
            System.out.println("Booking saved successfully: " + savedBooking.getId());

            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            System.err.println("Error creating booking: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error creating booking: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingData) {
        return bookingRepo.findById(id)
                .map(booking -> {
                    booking.setStatus(bookingData.getStatus());
                    booking.setNotes(bookingData.getNotes());
                    return ResponseEntity.ok(bookingRepo.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (bookingRepo.existsById(id)) {
            bookingRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
