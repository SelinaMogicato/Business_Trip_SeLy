const API_BASE_URL = "http://localhost:8080/api"

const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...options.headers,
        },
        ...options,
    }

    try {
        const response = await fetch(url, config)

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`

            try {
                const errorText = await response.text()
                if (errorText) {
                    errorMessage = errorText
                }
            } catch (e) {
                errorMessage = `HTTP ${response.status}: ${response.statusText}`
            }

            console.error(`API Error ${response.status}:`, errorMessage)
            throw new Error(errorMessage)
        }

        if (response.status === 204 || response.headers.get("content-length") === "0") {
            return null
        }

        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            return await response.json()
        }

        return await response.text()
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error)

        if (error.name === "TypeError" && error.message.includes("fetch")) {
            throw new Error(
                "Unable to connect to backend server. Please make sure the Spring Boot backend is running on port 8080.",
            )
        }

        throw error
    }
}

export const tripsApi = {
    list: async () => {
        const response = await fetch(`${API_BASE_URL}/trips`)
        if (!response.ok) {
            throw new Error(`Failed to fetch trips: ${response.status} ${response.statusText}`)
        }
        return response.json()
    },
    get: async (id) => {
        const response = await fetch(`${API_BASE_URL}/trips/${id}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch trip: ${response.status} ${response.statusText}`)
        }
        return response.json()
    },
    create: async (tripData) => {
        const response = await fetch(`${API_BASE_URL}/trips`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tripData),
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to create trip: ${response.status} ${response.statusText}`)
        }

        return response.json()
    },
    update: async (id, tripData) => {
        const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tripData),
        })
        if (!response.ok) {
            throw new Error(`Failed to update trip: ${response.status} ${response.statusText}`)
        }
        return response.json()
    },
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error(`Failed to delete trip: ${response.status} ${response.statusText}`)
        }
        return response.json()
    },
    getAll: async () => {
        return tripsApi.list()
    },
}

export const bookingsApi = {
    getAll: () => apiRequest("/bookings"),
    getById: (id) => apiRequest(`/bookings/${id}`),
    create: (bookingData) => {
        return apiRequest("/bookings", {
            method: "POST",
            body: JSON.stringify(bookingData),
        })
    },
    update: (id, bookingData) =>
        apiRequest(`/bookings/${id}`, {
            method: "PUT",
            body: JSON.stringify(bookingData),
        }),
    delete: (id) =>
        apiRequest(`/bookings/${id}`, {
            method: "DELETE",
        }),
    getByUserId: (userId) => apiRequest(`/bookings/user/${userId}`),
}

export const expensesApi = {
    getAll: () => apiRequest("/expenses"),
    getById: (id) => apiRequest(`/expenses/${id}`),
    create: (expenseData) =>
        apiRequest("/expenses", {
            method: "POST",
            body: JSON.stringify(expenseData),
        }),
    update: (id, expenseData) =>
        apiRequest(`/expenses/${id}`, {
            method: "PUT",
            body: JSON.stringify(expenseData),
        }),
    delete: (id) =>
        apiRequest(`/expenses/${id}`, {
            method: "DELETE",
        }),
    getByTripId: (tripId) => apiRequest(`/expenses/trip/${tripId}`),
}

export const usersApi = {
    getAll: () => apiRequest("/users"),
    getById: (id) => apiRequest(`/users/${id}`),
    getByEmail: (email) => apiRequest(`/users/email/${encodeURIComponent(email)}`),
    create: (userData) =>
        apiRequest("/users", {
            method: "POST",
            body: JSON.stringify(userData),
        }),
    update: (id, userData) =>
        apiRequest(`/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        }),
    delete: (id) =>
        apiRequest(`/users/${id}`, {
            method: "DELETE",
        }),
}
