import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, TrendingUp, Plus, Clock, CheckCircle } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext"
import { Layout } from "@/components/Layout"
import { Link } from "react-router-dom"

export default function DashboardPage() {
    const { user } = useAuth()
    const [trips, setTrips] = useState([])
    const [myBookings, setMyBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all trips
                const tripsResponse = await fetch("http://localhost:8080/api/trips")
                const tripsData = await tripsResponse.json()
                setTrips(tripsData)

                // Fetch user's bookings
                if (user?.id) {
                    const bookingsResponse = await fetch(`http://localhost:8080/api/bookings/user/${user.id}`)
                    const bookingsData = await bookingsResponse.json()
                    setMyBookings(bookingsData)
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "rejected":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
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

    return (
        <Layout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-800 dark:to-red-900 rounded-lg p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
                    <p className="text-red-100 text-lg">Manage your business trips and explore new opportunities</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Calendar className="h-8 w-8 text-red-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Available Trips</p>
                                    <p className="text-2xl font-bold">{trips.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">My Bookings</p>
                                    <p className="text-2xl font-bold">{myBookings.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Clock className="h-8 w-8 text-yellow-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending</p>
                                    <p className="text-2xl font-bold">{myBookings.filter((b) => b.status === "PENDING").length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <TrendingUp className="h-8 w-8 text-blue-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Department</p>
                                    <p className="text-lg font-bold">{user?.department}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Trips */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Available Trips</CardTitle>
                                <CardDescription>Discover and book upcoming business trips</CardDescription>
                            </div>
                            <Link to="/trips">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {trips.slice(0, 3).map((trip) => (
                                    <div key={trip.id} className="flex items-center space-x-4 p-4 border rounded-lg card-hover">
                                        <div className="flex-shrink-0">
                                            <MapPin className="h-8 w-8 text-red-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{trip.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(trip.startTrip)} - {formatDate(trip.endTrip)}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Badge variant="secondary">{trip.meetings?.length || 0} meetings</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* My Bookings */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>My Bookings</CardTitle>
                                <CardDescription>Your current trip bookings and their status</CardDescription>
                            </div>
                            <Link to="/my-trips">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {myBookings.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400">No bookings yet. Start by booking a trip!</p>
                                        <Link to="/trips">
                                            <Button className="mt-4">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Book a Trip
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    myBookings.slice(0, 3).map((booking) => (
                                        <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {booking.businessTrip.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Booked on {formatDate(booking.bookingDate)}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}
