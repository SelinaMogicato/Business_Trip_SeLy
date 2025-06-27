import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { ThemeProvider } from "./components/ThemeProvider.jsx"
import ErrorBoundary from "./ErrorBoundary.jsx"
import "./index.css"
import "./App.css"

window.addEventListener("unhandledrejection", (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes("message channel closed")) {
        console.warn("Browser extension error detected - preventing unhandled rejection")
        event.preventDefault()
        return
    }

    console.error("Unhandled promise rejection:", event.reason)
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
)
