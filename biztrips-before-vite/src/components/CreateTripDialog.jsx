"use client"

import { useState } from "react"
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
import { tripsApi } from "@/lib/api"

export function CreateTripDialog({ open, onOpenChange, onTripCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startTrip: "",
        endTrip: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // Validate required fields
            if (!formData.title.trim()) {
                setError("Trip title is required")
                return
            }

            if (!formData.startTrip || !formData.endTrip) {
                setError("Start and end dates are required")
                return
            }

            // Validate dates
            const startDate = new Date(formData.startTrip)
            const endDate = new Date(formData.endTrip)
            const now = new Date()

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                setError("Please enter valid dates")
                return
            }

            if (startDate <= now) {
                setError("Start date must be in the future")
                return
            }

            if (startDate >= endDate) {
                setError("End date must be after start date")
                return
            }

            // Format data for API
            const tripData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                startTrip: startDate.toISOString(),
                endTrip: endDate.toISOString(),
            }

            await tripsApi.create(tripData)
            onTripCreated()

            // Reset form
            setFormData({
                title: "",
                description: "",
                startTrip: "",
                endTrip: "",
            })
        } catch (error) {
            console.error("Error creating trip:", error)
            setError("Failed to create trip. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Trip</DialogTitle>
                    <DialogDescription>Add a new business trip for your team to book.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Trip Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter trip title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter trip description"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="startTrip">Start Date & Time</Label>
                            <Input
                                id="startTrip"
                                name="startTrip"
                                type="datetime-local"
                                value={formData.startTrip}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="endTrip">End Date & Time</Label>
                            <Input
                                id="endTrip"
                                name="endTrip"
                                type="datetime-local"
                                value={formData.endTrip}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Trip"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
