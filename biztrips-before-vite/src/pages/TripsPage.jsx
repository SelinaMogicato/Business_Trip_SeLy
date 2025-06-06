"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MapPin, Users, Plus, Search, Filter, MoreVertical, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Layout } from "@/components/Layout"
import { CreateTripDialog } from "@/components/CreateTripDialog"
import { EditTripDialog } from "@/components/EditTripDialog"
import { BookTripDialog } from "@/components/BookTripDialog"
import { tripsApi } from "@/lib/api"
import { formatSwissDateRange } from "@/lib/utils"

export default function TripsPage() {
    const { user } = useAuth()
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [bookDialogOpen, setBookDialogOpen] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchTrips()
    }, [])

    useEffect(() => {
        const filtered = trips.filter(
            (trip) =>
                trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trip.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredTrips(filtered)
    }, [trips, searchTerm])

    const fetchTrips = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await tripsApi.getAll()
            setTrips(data)
        } catch (error) {
            console.error("Error fetching trips:", error)
            setError("Failed to load trips. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteTrip = async (tripId) => {
        if (!window.confirm("Are you sure you want to delete this trip?")) {
            return
        }

        try {
            await tripsApi.delete(tripId)
            await fetchTrips()
        } catch (error) {
            console.error("Error deleting trip:", error)
            setError("Failed to delete trip. Please try again.")
        }
    }

    const handleBookTrip = (trip) => {
        setSelectedTrip(trip)
        setBookDialogOpen(true)
    }

    const handleEditTrip = (trip) => {
        setSelectedTrip(trip)
        setEditDialogOpen(true)
    }

    const handleTripCreated = () => {
        fetchTrips()
        setCreateDialogOpen(false)
    }

    const handleTripUpdated = () => {
        fetchTrips()
        setEditDialogOpen(false)
        setSelectedTrip(null)
    }

    const handleTripBooked = () => {
        setBookDialogOpen(false)
        setSelectedTrip(null)
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Trips</h1>
                        <p className="text-gray-600 dark:text-gray-300">Discover and book upcoming business trips</p>
                    </div>
                    <Button onClick={() => setCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Trip
                    </Button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search trips..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTrips.map((trip) => (
                        <Card key={trip.id} className="card-hover">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{trip.title}</CardTitle>
                                        <CardDescription className="mt-2">{trip.description}</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-red-600 flex-shrink-0" />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEditTrip(trip)}>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteTrip(trip.id)} className="text-red-600">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>{formatSwissDateRange(trip.startTrip, trip.endTrip)}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <Users className="h-4 w-4 mr-2" />
                                            <span>{trip.meetings?.length || 0} meetings</span>
                                        </div>
                                        <Badge variant="secondary">{new Date(trip.startTrip) > new Date() ? "Upcoming" : "Past"}</Badge>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <Button
                                            className="w-full"
                                            onClick={() => handleBookTrip(trip)}
                                            disabled={new Date(trip.startTrip) <= new Date()}
                                        >
                                            {new Date(trip.startTrip) <= new Date() ? "Trip Ended" : "Book Trip"}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredTrips.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trips found</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first trip."}
                        </p>
                        {!searchTerm && (
                            <Button onClick={() => setCreateDialogOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Trip
                            </Button>
                        )}
                    </div>
                )}

                {/* Dialogs */}
                <CreateTripDialog
                    open={createDialogOpen}
                    onOpenChange={setCreateDialogOpen}
                    onTripCreated={handleTripCreated}
                />

                <EditTripDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    trip={selectedTrip}
                    onTripUpdated={handleTripUpdated}
                />

                {selectedTrip && (
                    <BookTripDialog
                        open={bookDialogOpen}
                        onOpenChange={setBookDialogOpen}
                        trip={selectedTrip}
                        user={user}
                        onTripBooked={handleTripBooked}
                    />
                )}
            </div>
        </Layout>
    )
}
