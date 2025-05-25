// Test data creation script
import { usersApi, tripsApi } from "./api.js"

export const createTestData = async () => {
    try {
        // Create test users
        const testUsers = [
            {
                name: "John Doe",
                email: "john.doe@company.com",
                role: "EMPLOYEE",
            },
            {
                name: "Jane Smith",
                email: "jane.smith@company.com",
                role: "MANAGER",
            },
            {
                name: "Admin User",
                email: "admin@company.com",
                role: "ADMIN",
            },
        ]

        console.log("Creating test users...")
        for (const userData of testUsers) {
            try {
                const user = await usersApi.create(userData)
                console.log("Created user:", user)
            } catch (error) {
                console.log("User might already exist:", userData.email)
            }
        }

        // Create test trips
        const testTrips = [
            {
                title: "Berlin Business Conference",
                description: "Annual business conference in Berlin",
                startTrip: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
                endTrip: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
                location: "Berlin, Germany",
            },
            {
                title: "London Client Meeting",
                description: "Important client presentation in London",
                startTrip: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
                endTrip: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 days from now
                location: "London, UK",
            },
        ]

        console.log("Creating test trips...")
        for (const tripData of testTrips) {
            try {
                const trip = await tripsApi.create(tripData)
                console.log("Created trip:", trip)
            } catch (error) {
                console.log("Trip might already exist:", tripData.title)
            }
        }

        console.log("Test data creation completed!")
    } catch (error) {
        console.error("Error creating test data:", error)
    }
}
