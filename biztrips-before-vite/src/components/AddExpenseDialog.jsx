"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { expensesApi, tripsApi } from "@/lib/api"
import { formatSwissCurrency } from "@/lib/utils"

export function AddExpenseDialog({ open, onOpenChange, onExpenseAdded }) {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        date: "",
        businessTripId: "",
    })
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (open) {
            fetchTrips()
            // Reset form when dialog opens
            setFormData({
                description: "",
                amount: "",
                date: new Date().toISOString().split("T")[0], // Today's date
                businessTripId: "",
            })
            setError("")
        }
    }, [open])

    const fetchTrips = async () => {
        try {
            const tripsData = await tripsApi.getAll()
            setTrips(tripsData)
        } catch (error) {
            console.error("Error fetching trips:", error)
            setError("Failed to load business trips")
        }
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // Validate form
            if (!formData.description.trim()) {
                throw new Error("Description is required")
            }
            if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
                throw new Error("Amount must be greater than 0")
            }
            if (!formData.date) {
                throw new Error("Date is required")
            }
            if (!formData.businessTripId) {
                throw new Error("Please select a business trip")
            }

            // Prepare expense data - ONLY send the businessTrip ID, not the entire object
            const expenseData = {
                description: formData.description.trim(),
                amount: Number.parseFloat(formData.amount),
                date: formData.date,
                businessTrip: {
                    id: Number.parseInt(formData.businessTripId),
                },
            }

            const newExpense = await expensesApi.create(expenseData)

            if (onExpenseAdded) {
                onExpenseAdded(newExpense)
            }

            onOpenChange(false)
        } catch (error) {
            console.error("Error creating expense:", error)
            setError(error.message || "Failed to create expense")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                        Add a new expense for a business trip. Fill in all the required information.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter expense description (e.g., Hotel accommodation, Flight tickets, Meals)"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount (CHF) *</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.05"
                            min="0"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => handleInputChange("amount", e.target.value)}
                            required
                        />
                        {formData.amount && (
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Preview: {formatSwissCurrency(Number.parseFloat(formData.amount) || 0)}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="businessTrip">Business Trip *</Label>
                        <Select
                            value={formData.businessTripId}
                            onValueChange={(value) => handleInputChange("businessTripId", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a business trip" />
                            </SelectTrigger>
                            <SelectContent>
                                {trips.map((trip) => (
                                    <SelectItem key={trip.id} value={trip.id.toString()}>
                                        {trip.title} - {trip.location}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
                            {loading ? "Creating..." : "Create Expense"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
