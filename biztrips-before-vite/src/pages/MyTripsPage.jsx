"use client"

import {useState, useEffect} from "react"
import {useAuth} from "../contexts/AuthContext"
import {bookingsApi} from "../lib/api"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Layout} from "@/components/Layout"
import {Calendar, MapPin, FileText, Clock, AlertCircle, RefreshCw} from "lucide-react"
import {formatSwissDate, formatSwissDateRange} from "@/lib/utils"

const MyTripsPage = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const {user} = useAuth()

    useEffect(() => {
        if (user?.id) {
            fetchMyTrips()
        }
    }, [user])

    const fetchMyTrips = async () => {
        try {
            setLoading(true)
            setError("")

            console.log("Fetching bookings for user:", user.id)
            const data = await bookingsApi.getByUserId(user.id)
            console.log("Fetched bookings:", data)

            setBookings(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Error fetching my trips:", error)
            setError("Failed to load your trips. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "cancelled":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "completed":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
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
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4"/>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Trips</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={fetchMyTrips} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2"/>
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
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trips booked yet</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Book your first business trip to get
                            started!</p>
                        <Button onClick={() => (window.location.href = "/trips")}>Browse Available Trips</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle
                                                className="text-lg">{booking.businessTrip?.title || "Trip Details"}</CardTitle>
                                            <CardDescription>Booking #{booking.id}</CardDescription>
                                        </div>
                                        <Badge
                                            className={getStatusColor(booking.status)}>{booking.status || "PENDING"}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {booking.businessTrip && (
                                        <>
                                            <div
                                                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar className="h-4 w-4"/>
                                                <span>
                          {formatSwissDateRange(booking.businessTrip.startTrip, booking.businessTrip.endTrip)}
                        </span>
                                            </div>

                                            {booking.businessTrip.location && (
                                                <div
                                                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                    <MapPin className="h-4 w-4"/>
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

                                    {booking.bookingDate && (
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Clock className="h-4 w-4"/>
                                            <span>Booked on {formatSwissDate(booking.bookingDate)}</span>
                                        </div>
                                    )}

                                    {booking.notes && (
                                        <div
                                            className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                            <FileText className="h-4 w-4 mt-0.5"/>
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
