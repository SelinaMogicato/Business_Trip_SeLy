package ch.clip.trips.controller;

import ch.clip.trips.model.Expense;
import ch.clip.trips.repo.ExpenseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseRepository expenseRepo;

    public ExpenseController(ExpenseRepository expenseRepo) {
        this.expenseRepo = expenseRepo;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return expenseRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        return ResponseEntity.ok(expenseRepo.save(expense));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense newExpense) {
        return expenseRepo.findById(id)
                .map(expense -> {
                    expense.setDescription(newExpense.getDescription());
                    expense.setAmount(newExpense.getAmount());
                    expense.setDate(newExpense.getDate());
                    expense.setBusinessTrip(newExpense.getBusinessTrip());
                    return ResponseEntity.ok(expenseRepo.save(expense));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        if (expenseRepo.existsById(id)) {
            expenseRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
