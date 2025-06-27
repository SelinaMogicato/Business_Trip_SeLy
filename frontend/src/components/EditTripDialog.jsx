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
import { tripsApi } from "@/lib/api"
import { formatDateForInput } from "@/lib/utils"

export function EditTripDialog({ open, onOpenChange, trip, onTripUpdated }) {
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        location: "",
        startTrip: "",
        endTrip: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (trip) {

            let startDate = ""
            let endDate = ""

            if (trip.startTrip) {
                startDate = formatDateForInput(trip.startTrip)
            }

            if (trip.endTrip) {
                endDate = formatDateForInput(trip.endTrip)
            }

            setFormData({
                id: trip.id,
                title: trip.title || "",
                description: trip.description || "",
                location: trip.location || "",
                startTrip: startDate,
                endTrip: endDate,
            })
        }
    }, [trip])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const formattedData = {
                ...formData,
                startTrip: formData.startTrip ? `${formData.startTrip}T00:00:00` : null,
                endTrip: formData.endTrip ? `${formData.endTrip}T23:59:59` : null,
            }


            const result = await tripsApi.update(formData.id, formattedData)

            onTripUpdated(result)
            onOpenChange(false)
        } catch (error) {
            console.error("Error updating trip:", error)
            setError("Failed to update trip. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Business Trip</DialogTitle>
                    <DialogDescription>Update the details for this business trip.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

                    <div className="space-y-2">
                        <Label htmlFor="title">Trip Title</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startTrip">Start Date</Label>
                            <Input
                                id="startTrip"
                                name="startTrip"
                                type="date"
                                value={formData.startTrip}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTrip">End Date</Label>
                            <Input
                                id="endTrip"
                                name="endTrip"
                                type="date"
                                value={formData.endTrip}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
