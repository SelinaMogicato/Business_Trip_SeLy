package ch.clip.trips;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import ch.clip.trips.model.Expense;
import ch.clip.trips.repo.ExpenseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.model.Meeting;
import ch.clip.trips.repo.BusinessTripRepository;
import ch.clip.trips.repo.MeetingRepository;

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
			ExpenseRepository expenseRepository
	) {
		return (args) -> {

			// save a couple of BusinessTrips
			BusinessTrip bt01 = new BusinessTrip(1L, "BT01", "San Francisco World Trade Center on new Server/IOT/Client ", LocalDateTime.of(2021, 2, 13, 9, 0), LocalDateTime.of(2021, 2, 15, 16, 56));
			BusinessTrip bt02 = new BusinessTrip(2L, "BT02", "Santa Clara Halley on new Server/IOT/Client", LocalDateTime.of(2021, 6, 23, 9, 0), LocalDateTime.of(2021, 6, 27, 16, 56));
			BusinessTrip bt03 = new BusinessTrip(3L, "BT03", "San Cose City Halley on Docker/IOT/Client", LocalDateTime.of(2021, 12, 13, 9, 0), LocalDateTime.of(2021, 12, 15, 16, 56));

			businessTripRepository.save(bt01);
			businessTripRepository.save(bt02);
			businessTripRepository.save(bt03);

			// save a couple of meetings
			meetingRepository.save(new Meeting(1L, "One Conference", "Key Note on One Conference", bt01));
			meetingRepository.save(new Meeting(2L, "Zero Conference", "Workshop Zero on One Conference", bt01));
			meetingRepository.save(new Meeting(3L, "One Conference", "HandsOn on One Conference", bt02));
			meetingRepository.save(new Meeting(4L, "One Conference", "Key Note on One Conference", bt02));
			meetingRepository.save(new Meeting(5L, "One Conference", "Key Note on One Conference", bt03));

			// save a couple of expenses
			expenseRepository.save(new Expense("Hotelkosten", 320.50, LocalDate.of(2021, 2, 13), bt01));
			expenseRepository.save(new Expense("Flugticket", 580.00, LocalDate.of(2021, 2, 13), bt01));
			expenseRepository.save(new Expense("Mahlzeiten", 45.90, LocalDate.of(2021, 2, 14), bt01));
			expenseRepository.save(new Expense("Taxi", 27.80, LocalDate.of(2021, 6, 23), bt02));
			expenseRepository.save(new Expense("Konferenzgebühr", 150.00, LocalDate.of(2021, 6, 24), bt02));
			expenseRepository.save(new Expense("Hotelkosten", 210.00, LocalDate.of(2021, 12, 13), bt03));

			List<BusinessTrip> wishTrips = new ArrayList<>();
			wishTrips.add(bt01);
			wishTrips.add(bt02);
		};
	}
}
