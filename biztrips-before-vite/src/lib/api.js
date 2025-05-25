const API_BASE_URL = "http://localhost:8080/api"

// Generic API request handler with improved error handling
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
        console.log(`Making API request to: ${url}`, config)
        const response = await fetch(url, config)

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`

            try {
                const errorText = await response.text()
                if (errorText) {
                    errorMessage = errorText
                }
            } catch (e) {
                // If we can't read the error text, use the status
                errorMessage = `HTTP ${response.status}: ${response.statusText}`
            }

            console.error(`API Error ${response.status}:`, errorMessage)
            throw new Error(errorMessage)
        }

        // Handle empty responses (like DELETE)
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

        // Provide more user-friendly error messages
        if (error.name === "TypeError" && error.message.includes("fetch")) {
            throw new Error(
                "Unable to connect to backend server. Please make sure the Spring Boot backend is running on port 8080.",
            )
        }

        throw error
    }
}

// Business Trips API
export const tripsApi = {
    getAll: () => apiRequest("/trips"),
    getById: (id) => apiRequest(`/trips/${id}`),
    create: (tripData) =>
        apiRequest("/trips", {
            method: "POST",
            body: JSON.stringify(tripData),
        }),
    update: (id, tripData) =>
        apiRequest(`/trips/${id}`, {
            method: "PUT",
            body: JSON.stringify(tripData),
        }),
    delete: (id) =>
        apiRequest(`/trips/${id}`, {
            method: "DELETE",
        }),
}

// Bookings API
export const bookingsApi = {
    getAll: () => apiRequest("/bookings"),
    getById: (id) => apiRequest(`/bookings/${id}`),
    create: (bookingData) => {
        console.log("Creating booking with data:", bookingData)
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

// Expenses API
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

// Meetings API
export const meetingsApi = {
    getAll: () => apiRequest("/meetings"),
    getById: (id) => apiRequest(`/meetings/${id}`),
    create: (meetingData) =>
        apiRequest("/meetings", {
            method: "POST",
            body: JSON.stringify(meetingData),
        }),
    update: (id, meetingData) =>
        apiRequest(`/meetings/${id}`, {
            method: "PUT",
            body: JSON.stringify(meetingData),
        }),
    delete: (id) =>
        apiRequest(`/meetings/${id}`, {
            method: "DELETE",
        }),
    getByTripId: (tripId) => apiRequest(`/meetings/trip/${tripId}`),
}

// Users API
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
