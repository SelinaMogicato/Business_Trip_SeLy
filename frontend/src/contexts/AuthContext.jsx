import React, { createContext, useContext, useState, useEffect } from "react"

// Kontext wird erstellt – das ist der zentrale "Login-Status-Speicher"
const AuthContext = createContext(undefined)

// AuthProvider ist eine Hüllkomponente, die globalen Login-Zustand bereitstellt
export function AuthProvider({ children }) {
    // Aktuell eingeloggter Benutzer
    const [user, setUser] = useState(null)
    // Status für Ladevorgang (z. B. beim Start)
    const [isLoading, setIsLoading] = useState(true)

    // Beim ersten Laden: Benutzer aus dem localStorage lesen (falls vorhanden)
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser)) // Wiederherstellen
        }
        setIsLoading(false)
    }, [])

    // login(): speichert Benutzer in Zustand + localStorage
    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    // logout(): entfernt Benutzer aus Zustand + Speicher
    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    // Alle untergeordneten Komponenten können auf { user, login, logout, isLoading } zugreifen
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom Hook useAuth() – einfacher Zugriff auf den AuthContext
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
