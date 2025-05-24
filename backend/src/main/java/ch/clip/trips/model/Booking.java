package ch.clip.trips.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "business_trip_id", nullable = false)
    private BusinessTrip businessTrip;

    @Column(nullable = false)
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private String notes;

    public enum BookingStatus {
        PENDING, APPROVED, REJECTED, CANCELLED
    }

    public Booking() {
        this.bookingDate = LocalDateTime.now();
        this.status = BookingStatus.PENDING;
    }

    public Booking(User user, BusinessTrip businessTrip, String notes) {
        this();
        this.user = user;
        this.businessTrip = businessTrip;
        this.notes = notes;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public BusinessTrip getBusinessTrip() { return businessTrip; }
    public void setBusinessTrip(BusinessTrip businessTrip) { this.businessTrip = businessTrip; }

    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
