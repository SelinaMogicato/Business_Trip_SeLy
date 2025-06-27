"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Layout } from "@/components/Layout"
import { BookTripDialog } from "@/components/BookTripDialog"
import { CreateTripDialog } from "@/components/CreateTripDialog"
import { EditTripDialog } from "@/components/EditTripDialog"
import { tripsApi } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { Calendar, MapPin, Search, Plus, Edit, Trash2, AlertCircle, RefreshCw } from "lucide-react"
import { formatSwissDate } from "@/lib/utils"

export default function TripsPage() {
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [showBookDialog, setShowBookDialog] = useState(false)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        fetchTrips()
    }, [])

    useEffect(() => {
        const filtered = trips.filter(
            (trip) =>
                trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (trip.location && trip.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (trip.description && trip.description.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setFilteredTrips(filtered)
    }, [trips, searchTerm])

    const fetchTrips = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await tripsApi.list()
            setTrips(data)
        } catch (error) {
            setError("Failed to load trips. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleTripBooked = () => {
        fetchTrips()
    }

    const handleTripCreated = (newTrip) => {
        setTrips((prev) => [...prev, newTrip])
        setShowCreateDialog(false)
    }

    const handleTripUpdated = (updatedTrip) => {
        setTrips((prev) => prev.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip)))
    }

    const handleDeleteTrip = async (tripId) => {
        if (!window.confirm("Are you sure you want to delete this trip?")) return

        try {
            await tripsApi.delete(tripId)
            setTrips((prev) => prev.filter((trip) => trip.id !== tripId))
        } catch (error) {
            console.error("Error deleting trip:", error)
            alert("Failed to delete trip. Please try again.")
        }
    }

    const isAdmin = user && user.role === "ADMIN"

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
                    <Button onClick={fetchTrips} variant="outline">
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
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Trips</h1>
                        <p className="text-gray-600 dark:text-gray-300">Browse and book available business trips</p>
                    </div>
                    {/* Make Create Trip button always visible */}
                    <Button onClick={() => setShowCreateDialog(true)} className="bg-red-600 hover:bg-red-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Trip
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search trips by title, location, or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Trips List */}
                {filteredTrips.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trips found</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {searchTerm ? "Try adjusting your search terms." : "No business trips are currently available."}
                        </p>
                        <Button onClick={() => setShowCreateDialog(true)} className="bg-red-600 hover:bg-red-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Create First Trip
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrips.map((trip) => (
                            <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{trip.title}</CardTitle>
                                    </div>
                                    <CardDescription>Trip #{trip.id}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Calendar className="h-4 w-4" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {trip.startTrip && trip.endTrip
                                                    ? `${formatSwissDate(trip.startTrip)} - ${formatSwissDate(trip.endTrip)}`
                                                    : "Date range not available"}
                                            </p>
                                        </div>

                                        {trip.location && (
                                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                <MapPin className="h-4 w-4" />
                                                <span>{trip.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{trip.description}</p>

                                    <div className="flex justify-between items-center pt-2">
                                        <Button
                                            onClick={() => {
                                                setSelectedTrip(trip)
                                                setShowBookDialog(true)
                                            }}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Book Trip
                                        </Button>

                                        {isAdmin && (
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        setSelectedTrip(trip)
                                                        setShowEditDialog(true)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="icon" onClick={() => handleDeleteTrip(trip.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Dialogs */}
                <BookTripDialog
                    open={showBookDialog}
                    onOpenChange={setShowBookDialog}
                    trip={selectedTrip}
                    onTripBooked={handleTripBooked}
                />

                <CreateTripDialog
                    open={showCreateDialog}
                    onOpenChange={setShowCreateDialog}
                    onTripCreated={handleTripCreated}
                />

                <EditTripDialog
                    open={showEditDialog}
                    onOpenChange={setShowEditDialog}
                    trip={selectedTrip}
                    onTripUpdated={handleTripUpdated}
                />
            </div>
        </Layout>
    )
}
