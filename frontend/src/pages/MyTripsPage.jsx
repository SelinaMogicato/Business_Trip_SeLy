"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { bookingsApi } from "../lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/Layout"
import { Calendar, MapPin, FileText, Clock, AlertCircle, RefreshCw } from "lucide-react"
import { formatSwissDate } from "@/lib/utils"

const MyTripsPage = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { user } = useAuth()

    useEffect(() => {
        if (user?.id) {
            fetchMyTrips()
        }
    }, [user])

    const fetchMyTrips = async () => {
        try {
            setLoading(true)
            setError("")

            const data = await bookingsApi.getByUserId(user.id)

            setBookings(Array.isArray(data) ? data : [])
        } catch (error) {
            setError("Failed to load your trips. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            </Layout>
        )
    }

    if (error) {
        return (
            <Layout>
                <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Trips</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={fetchMyTrips} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Trips</h1>
                    <p className="text-gray-600 dark:text-gray-300">View and manage your booked business trips</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trips booked yet</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Book your first business trip to get started!</p>
                        <Button onClick={() => (window.location.href = "/trips")}>Browse Available Trips</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{booking.businessTrip?.title || "Trip Details"}</CardTitle>
                                            <CardDescription>Booking #{booking.id}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {booking.businessTrip && (
                                        <>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar className="h-4 w-4" />
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {booking.businessTrip.startTrip && booking.businessTrip.endTrip
                                                        ? `${formatSwissDate(booking.businessTrip.startTrip)} - ${formatSwissDate(booking.businessTrip.endTrip)}`
                                                        : "Date range not available"}
                                                </p>
                                            </div>

                                            {booking.businessTrip.location && (
                                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{booking.businessTrip.location}</span>
                                                </div>
                                            )}

                                            {booking.businessTrip.description && (
                                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                                    <p className="line-clamp-2">{booking.businessTrip.description}</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Clock className="h-4 w-4" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Booked on {formatSwissDate(booking.bookingDate)}
                                        </p>
                                    </div>

                                    {booking.notes && (
                                        <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                            <FileText className="h-4 w-4 mt-0.5" />
                                            <span className="line-clamp-2">{booking.notes}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default MyTripsPage
