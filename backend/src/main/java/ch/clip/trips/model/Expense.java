package ch.clip.trips.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private double amount;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "business_trip_id")
    private BusinessTrip businessTrip;

    public Expense() {}

    public Expense(String description, double amount, LocalDate date, BusinessTrip businessTrip) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.businessTrip = businessTrip;
    }

    // Getter & Setter

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public BusinessTrip getBusinessTrip() { return businessTrip; }
    public void setBusinessTrip(BusinessTrip businessTrip) { this.businessTrip = businessTrip; }
}
