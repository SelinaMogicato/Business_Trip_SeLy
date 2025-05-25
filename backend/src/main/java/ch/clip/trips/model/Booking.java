package ch.clip.trips.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"bookings"})
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_trip_id", nullable = false)
    @JsonIgnoreProperties({"bookings", "meetings", "expenses"})
    private BusinessTrip businessTrip;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BookingStatus status;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }

    // Constructors
    public Booking() {}

    public Booking(User user, BusinessTrip businessTrip, String notes) {
        this.user = user;
        this.businessTrip = businessTrip;
        this.notes = notes;
        this.bookingDate = LocalDateTime.now();
        this.status = BookingStatus.PENDING;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BusinessTrip getBusinessTrip() {
        return businessTrip;
    }

    public void setBusinessTrip(BusinessTrip businessTrip) {
        this.businessTrip = businessTrip;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", userId=" + (user != null ? user.getId() : null) +
                ", businessTripId=" + (businessTrip != null ? businessTrip.getId() : null) +
                ", bookingDate=" + bookingDate +
                ", status=" + status +
                ", notes='" + notes + '\'' +
                '}';
    }
}
