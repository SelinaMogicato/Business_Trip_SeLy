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
        location: "",
        startTrip: "",
        endTrip: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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


            const result = await tripsApi.create(formattedData)

            onTripCreated(result)
        } catch (error) {
            setError("Failed to create trip. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            location: "",
            startTrip: "",
            endTrip: "",
        })
        setError("")
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) resetForm()
                onOpenChange(isOpen)
            }}
        >
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Business Trip</DialogTitle>
                    <DialogDescription>Add details for a new business trip opportunity.</DialogDescription>
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
                            {loading ? "Creating..." : "Create Trip"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
