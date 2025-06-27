import { usersApi } from "./api"

// syncUser(): Synchronisiert einen Benutzer mit dem Backend
// Prüft, ob der User bereits im Backend existiert. Wenn nicht, wird er neu erstellt.
export const syncUser = async (frontendUser) => {
    try {
        try {
            // Versuch, den Benutzer über die ID zu finden (GET /users/{id})
            const existingUser = await usersApi.getById(frontendUser.id)
            return existingUser // Falls gefunden, zurückgeben
        } catch (error) {
            // Falls Benutzer nicht existiert (404): Erstellen
            if (error.message.includes("404")) {
                const newUser = await usersApi.create({
                    email: frontendUser.email,
                    firstName: frontendUser.firstName,
                    lastName: frontendUser.lastName,
                    department: frontendUser.department || "Unknown", // Fallback
                })
                return newUser
            }
            // Andere Fehler weitergeben
            throw error
        }
    } catch (error) {
        console.error("Error syncing user:", error)
        throw error
    }
}

// syncAllUsers(): synchronisiert eine ganze Benutzerliste
// Wird z.B. verwendet, wenn mehrere Benutzer auf einmal geprüft oder angelegt werden sollen
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
    return results // Ergebnis: Liste mit Erfolgen und Fehlern
}

// createTestUsers(): legt manuell drei Beispiel-User im Backend an
// Praktisch für Tests und Demos
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
            const user = await usersApi.create(userData) // POST /users
            results.push({ success: true, user })
        } catch (error) {
            results.push({ success: false, userData, error: error.message })
        }
    }

    return results
}
