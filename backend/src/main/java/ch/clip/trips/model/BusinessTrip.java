package ch.clip.trips.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "business_trip")
public class BusinessTrip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	@Column(name = "start_trip")
	private LocalDateTime startTrip;

	@Column(name = "end_trip")
	private LocalDateTime endTrip;

	@Column(name = "location")
	private String location;

	@Column(name = "max_participants")
	private Integer maxParticipants;

	@OneToMany(mappedBy = "businessTrip", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"businessTrip", "user"})
	private List<Booking> bookings;

	@OneToMany(mappedBy = "businessTrip", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"businessTrip"})
	private List<Meeting> meetings;

	@OneToMany(mappedBy = "businessTrip", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"businessTrip"})
	private List<Expense> expenses;

	// Constructors
	public BusinessTrip() {}

	// Original constructor for backward compatibility
	public BusinessTrip(Long id, String title, String description, LocalDateTime startTrip, LocalDateTime endTrip) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.startTrip = startTrip;
		this.endTrip = endTrip;
	}

	// New constructor with additional fields
	public BusinessTrip(String title, String description, LocalDateTime startTrip, LocalDateTime endTrip, String location, Integer maxParticipants) {
		this.title = title;
		this.description = description;
		this.startTrip = startTrip;
		this.endTrip = endTrip;
		this.location = location;
		this.maxParticipants = maxParticipants;
	}

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getStartTrip() {
		return startTrip;
	}

	public void setStartTrip(LocalDateTime startTrip) {
		this.startTrip = startTrip;
	}

	public LocalDateTime getEndTrip() {
		return endTrip;
	}

	public void setEndTrip(LocalDateTime endTrip) {
		this.endTrip = endTrip;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getMaxParticipants() {
		return maxParticipants;
	}

	public void setMaxParticipants(Integer maxParticipants) {
		this.maxParticipants = maxParticipants;
	}

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}

	public List<Meeting> getMeetings() {
		return meetings;
	}

	public void setMeetings(List<Meeting> meetings) {
		this.meetings = meetings;
	}

	public List<Expense> getExpenses() {
		return expenses;
	}

	public void setExpenses(List<Expense> expenses) {
		this.expenses = expenses;
	}

	@Override
	public String toString() {
		return "BusinessTrip{" +
				"id=" + id +
				", title='" + title + '\'' +
				", description='" + description + '\'' +
				", startTrip=" + startTrip +
				", endTrip=" + endTrip +
				", location='" + location + '\'' +
				", maxParticipants=" + maxParticipants +
				'}';
	}
}
