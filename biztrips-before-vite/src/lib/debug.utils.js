import { usersApi, tripsApi, bookingsApi } from "./api"

/**
 * Debug utilities for checking database state
 */
export const debugUtils = {
    // Check all users in database
    async checkUsers() {
        try {
            const users = await usersApi.getAll()
            console.log("All users in database:", users)
            return users
        } catch (error) {
            console.error("Error fetching users:", error)
            return []
        }
    },

    // Check all trips in database
    async checkTrips() {
        try {
            const trips = await tripsApi.getAll()
            console.log("All trips in database:", trips)
            return trips
        } catch (error) {
            console.error("Error fetching trips:", error)
            return []
        }
    },

    // Check all bookings in database
    async checkBookings() {
        try {
            const bookings = await bookingsApi.getAll()
            console.log("All bookings in database:", bookings)
            return bookings
        } catch (error) {
            console.error("Error fetching bookings:", error)
            return []
        }
    },

    // Check if specific user exists
    async checkUser(userId) {
        try {
            const user = await usersApi.getById(userId)
            console.log(`User ${userId} exists:`, user)
            return user
        } catch (error) {
            console.error(`User ${userId} not found:`, error)
            return null
        }
    },

    // Full database status check
    async fullCheck() {
        console.log("=== DATABASE STATUS CHECK ===")
        const users = await this.checkUsers()
        const trips = await this.checkTrips()
        const bookings = await this.checkBookings()

        console.log("Summary:")
        console.log(`- Users: ${users.length}`)
        console.log(`- Trips: ${trips.length}`)
        console.log(`- Bookings: ${bookings.length}`)

        return { users, trips, bookings }
    },
}

// Make it available globally for debugging
if (typeof window !== "undefined") {
    window.debugUtils = debugUtils
}
