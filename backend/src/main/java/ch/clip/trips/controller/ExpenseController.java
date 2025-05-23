package ch.clip.trips.controller;

import ch.clip.trips.model.Expense;
import ch.clip.trips.repo.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepo;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepo.findAll();
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseRepo.save(expense);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return expenseRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        return expenseRepo.findById(id)
                .map(expense -> {
                    expenseRepo.deleteById(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
