"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { bookingsApi, usersApi } from "../lib/api"
import { formatSwissDateRange } from "@/lib/utils"

export function BookTripDialog({ open, onOpenChange, trip, onTripBooked }) {
    const [notes, setNotes] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const { user } = useAuth()

    const ensureUserExists = async (user) => {
        try {
            const dbUser = await usersApi.getById(user.id)
            return dbUser
        } catch (error) {
            if (error.message.includes("404") || error.message.includes("not found")) {
                try {
                    const newUser = await usersApi.create({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        department: user.department || "Unknown",
                    })
                    return newUser
                } catch (createError) {
                    throw new Error("Failed to create user account")
                }
            } else {
                throw error
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user || !trip) {
            setError("Missing user or trip information")
            return
        }

        setLoading(true)
        setError("")
        setSuccess(false)

        try {

            const dbUser = await ensureUserExists(user)

            const bookingData = {
                user: { id: dbUser.id },
                businessTrip: { id: trip.id },
                notes: notes.trim() || "",
                status: "PENDING",
            }


            const result = await bookingsApi.create(bookingData)

            setSuccess(true)
            setNotes("")

            setTimeout(() => {
                onTripBooked?.()
                onOpenChange(false)
                setSuccess(false)
            }, 2000)
        } catch (error) {

            let errorMessage = "Failed to book trip. Please try again."
            if (error.message.includes("User with ID")) {
                errorMessage = "Your user account was not found. Please log in again."
            } else if (error.message.includes("Business trip with ID")) {
                errorMessage = "This trip is no longer available."
            } else if (error.message.includes("Failed to create user")) {
                errorMessage = "Failed to create user account. Please contact support."
            } else if (error.message.includes("Unable to connect")) {
                errorMessage = "Unable to connect to server. Please check your connection."
            }

            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (!loading) {
            setNotes("")
            setError("")
            setSuccess(false)
            onOpenChange(false)
        }
    }

    if (!trip) return null

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Trip</DialogTitle>
                    <DialogDescription>Confirm your booking for "{trip.title}"</DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="text-center py-6">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-green-700 mb-2">Booking Successful!</h3>
                        <p className="text-sm text-gray-600">Your trip has been booked successfully.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                            <h4 className="font-medium">{trip.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{trip.description}</p>

                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                <Calendar className="h-4 w-4" />
                                <span>{formatSwissDateRange(trip.startTrip, trip.endTrip)}</span>
                            </div>

                            {trip.meetings && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                    <Users className="h-4 w-4" />
                                    <span>{trip.meetings.length} meetings scheduled</span>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes (Optional)</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Add any special requirements or notes for this trip..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={3}
                                        disabled={loading}
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{error}</span>
                                    </div>
                                )}
                            </div>

                            <DialogFooter className="mt-6">
                                <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Booking..." : "Confirm Booking"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
