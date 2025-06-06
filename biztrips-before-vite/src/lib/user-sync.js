import { usersApi } from "./api"

export const syncUser = async (frontendUser) => {
    try {
        try {
            const existingUser = await usersApi.getById(frontendUser.id)
            console.log("User already exists:", existingUser)
            return existingUser
        } catch (error) {
            if (error.message.includes("404")) {
                console.log("Creating new user:", frontendUser)
                const newUser = await usersApi.create({
                    email: frontendUser.email,
                    firstName: frontendUser.firstName,
                    lastName: frontendUser.lastName,
                    department: frontendUser.department || "Unknown",
                })
                console.log("User created successfully:", newUser)
                return newUser
            }
            throw error
        }
    } catch (error) {
        console.error("Error syncing user:", error)
        throw error
    }
}

export const syncAllUsers = async (users) => {
    const results = []
    for (const user of users) {
        try {
            const syncedUser = await syncUser(user)
            results.push({ success: true, user: syncedUser })
        } catch (error) {
            results.push({ success: false, user, error: error.message })
        }
    }
    return results
}


export const createTestUsers = async () => {
    const testUsers = [
        {
            email: "zmogis@bbcag.ch",
            firstName: "John",
            lastName: "Doe",
            department: "Marketing",
        },
        {
            email: "jane.smith@company.com",
            firstName: "Jane",
            lastName: "Smith",
            department: "Engineering",
        },
        {
            email: "mike.johnson@company.com",
            firstName: "Mike",
            lastName: "Johnson",
            department: "Sales",
        },
    ]

    const results = []
    for (const userData of testUsers) {
        try {
            const user = await usersApi.create(userData)
            results.push({ success: true, user })
            console.log("Created test user:", user)
        } catch (error) {
            results.push({ success: false, userData, error: error.message })
            console.error("Failed to create test user:", userData, error)
        }
    }

    return results
}
