package ch.clip.trips.repo;

import ch.clip.trips.model.Booking;
import ch.clip.trips.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByUserId(Long userId);
}
