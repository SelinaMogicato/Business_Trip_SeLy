package ch.clip.trips;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import ch.clip.trips.model.*;
import ch.clip.trips.repo.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BusinessTripsBackendApplication {
	private static final Logger log = LoggerFactory.getLogger(BusinessTripsBackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BusinessTripsBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner demoData(
			BusinessTripRepository businessTripRepository,
			MeetingRepository meetingRepository,
			ExpenseRepository expenseRepository,
			UserRepository userRepository,
			BookingRepository bookingRepository
	) {
		return (args) -> {

			// Create users
			User user1 = new User("john.doe@company.com", "John", "Doe", "Engineering");
			User user2 = new User("jane.smith@company.com", "Jane", "Smith", "Marketing");
			User user3 = new User("mike.johnson@company.com", "Mike", "Johnson", "Sales");

			userRepository.save(user1);
			userRepository.save(user2);
			userRepository.save(user3);

			// Create business trips
			BusinessTrip bt01 = new BusinessTrip(1L, "Tech Conference San Francisco", "Annual technology conference in San Francisco featuring the latest innovations in AI and cloud computing", LocalDateTime.of(2024, 3, 15, 9, 0), LocalDateTime.of(2024, 3, 18, 17, 0));
			BusinessTrip bt02 = new BusinessTrip(2L, "Client Meeting New York", "Strategic planning meeting with key clients in New York to discuss Q2 objectives", LocalDateTime.of(2024, 4, 10, 8, 0), LocalDateTime.of(2024, 4, 12, 18, 0));
			BusinessTrip bt03 = new BusinessTrip(3L, "Product Launch London", "International product launch event in London with global stakeholders", LocalDateTime.of(2024, 5, 20, 10, 0), LocalDateTime.of(2024, 5, 23, 16, 0));
			BusinessTrip bt04 = new BusinessTrip(4L, "Training Workshop Berlin", "Advanced training workshop on new technologies and methodologies", LocalDateTime.of(2024, 6, 5, 9, 0), LocalDateTime.of(2024, 6, 7, 17, 0));
			BusinessTrip bt05 = new BusinessTrip(5L, "Partnership Summit Tokyo", "Annual partnership summit with Asian market leaders", LocalDateTime.of(2024, 7, 12, 8, 0), LocalDateTime.of(2024, 7, 16, 19, 0));

			businessTripRepository.save(bt01);
			businessTripRepository.save(bt02);
			businessTripRepository.save(bt03);
			businessTripRepository.save(bt04);
			businessTripRepository.save(bt05);

			// Create meetings
			meetingRepository.save(new Meeting(1L, "AI Innovation Keynote", "Keynote presentation on AI innovations and future trends", bt01));
			meetingRepository.save(new Meeting(2L, "Cloud Architecture Workshop", "Hands-on workshop on modern cloud architecture patterns", bt01));
			meetingRepository.save(new Meeting(3L, "Strategic Planning Session", "Quarterly strategic planning with key stakeholders", bt02));
			meetingRepository.save(new Meeting(4L, "Client Presentation", "Product demonstration and roadmap presentation", bt02));
			meetingRepository.save(new Meeting(5L, "Product Showcase", "Global product launch presentation", bt03));
			meetingRepository.save(new Meeting(6L, "Media Briefing", "Press conference and media interviews", bt03));

			// Create expenses
			expenseRepository.save(new Expense("Hotel Accommodation", 450.00, LocalDate.of(2024, 3, 15), bt01));
			expenseRepository.save(new Expense("Flight Tickets", 680.00, LocalDate.of(2024, 3, 14), bt01));
			expenseRepository.save(new Expense("Conference Registration", 299.00, LocalDate.of(2024, 3, 15), bt01));
			expenseRepository.save(new Expense("Meals & Entertainment", 125.50, LocalDate.of(2024, 3, 16), bt01));
			expenseRepository.save(new Expense("Transportation", 85.00, LocalDate.of(2024, 4, 10), bt02));
			expenseRepository.save(new Expense("Client Dinner", 180.00, LocalDate.of(2024, 4, 11), bt02));

			// Create bookings
			bookingRepository.save(new Booking(user1, bt01, "Attending as technical lead"));
			bookingRepository.save(new Booking(user2, bt03, "Managing product launch activities"));
			bookingRepository.save(new Booking(user3, bt02, "Leading client relationship discussions"));
			bookingRepository.save(new Booking(user1, bt04, "Technical training and certification"));
		};
	}
}
