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

			// Create business trips with enhanced data
			BusinessTrip bt01 = new BusinessTrip();
			bt01.setTitle("Tech Conference San Francisco");
			bt01.setDescription("Annual technology conference in San Francisco featuring the latest innovations in AI and cloud computing");
			bt01.setStartTrip(LocalDateTime.of(2024, 3, 15, 9, 0));
			bt01.setEndTrip(LocalDateTime.of(2024, 3, 18, 17, 0));
			bt01.setLocation("San Francisco, CA");
			bt01.setMaxParticipants(50);

			BusinessTrip bt02 = new BusinessTrip();
			bt02.setTitle("Client Meeting New York");
			bt02.setDescription("Strategic planning meeting with key clients in New York to discuss Q2 objectives");
			bt02.setStartTrip(LocalDateTime.of(2024, 4, 10, 8, 0));
			bt02.setEndTrip(LocalDateTime.of(2024, 4, 12, 18, 0));
			bt02.setLocation("New York, NY");
			bt02.setMaxParticipants(20);

			BusinessTrip bt03 = new BusinessTrip();
			bt03.setTitle("Product Launch London");
			bt03.setDescription("International product launch event in London with global stakeholders");
			bt03.setStartTrip(LocalDateTime.of(2024, 5, 20, 10, 0));
			bt03.setEndTrip(LocalDateTime.of(2024, 5, 23, 16, 0));
			bt03.setLocation("London, UK");
			bt03.setMaxParticipants(100);

			BusinessTrip bt04 = new BusinessTrip();
			bt04.setTitle("Training Workshop Berlin");
			bt04.setDescription("Advanced training workshop on new technologies and methodologies");
			bt04.setStartTrip(LocalDateTime.of(2024, 6, 5, 9, 0));
			bt04.setEndTrip(LocalDateTime.of(2024, 6, 7, 17, 0));
			bt04.setLocation("Berlin, Germany");
			bt04.setMaxParticipants(30);

			BusinessTrip bt05 = new BusinessTrip();
			bt05.setTitle("Partnership Summit Tokyo");
			bt05.setDescription("Annual partnership summit with Asian market leaders");
			bt05.setStartTrip(LocalDateTime.of(2024, 7, 12, 8, 0));
			bt05.setEndTrip(LocalDateTime.of(2024, 7, 16, 19, 0));
			bt05.setLocation("Tokyo, Japan");
			bt05.setMaxParticipants(75);

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

			log.info("Demo data created successfully!");
		};
	}
}
