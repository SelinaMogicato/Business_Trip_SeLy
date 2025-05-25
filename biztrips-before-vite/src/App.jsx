import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import TripsPage from "./pages/TripsPage"
import MyTripsPage from "./pages/MyTripsPage"
import ExpensesPage from "./pages/ExpensesPage"

function App() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
        )
    }

    return (
        <Routes>
            <Route
                path="/"
                element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
            />
            <Route
                path="/dashboard"
                element={user ? <DashboardPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/trips"
                element={user ? <TripsPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/my-trips"
                element={user ? <MyTripsPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/expenses"
                element={user ? <ExpensesPage /> : <Navigate to="/" replace />}
            />
        </Routes>
    )
}

export default App
