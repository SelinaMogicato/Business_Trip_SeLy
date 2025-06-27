"use client" // React Server Components Hinweis, hier nicht relevant
import {useState} from "react"
import {useNavigate} from "react-router-dom"
// UI-Komponenten
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
// Icons für Darstellung
import {Plane, Users, Calendar, TrendingUp, AlertCircle} from "lucide-react"
// React Context für Login-Status
import {useAuth} from "@/contexts/AuthContext"
// Zugriff auf Backend-Funktionen
import {usersApi} from "@/lib/api"

export default function LoginPage() {
    // Zustand für Formularfelder
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [department, setDepartment] = useState("")
    const [isNewUser, setIsNewUser] = useState(false) // Umschaltung Login / Registrierung
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const {login} = useAuth()
    const navigate = useNavigate()

    // Formular wird abgeschickt
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // Registrierung eines neuen Users
            if (isNewUser) {
                if (!email.trim() || !firstName.trim() || !lastName.trim() || !department) {
                    setError("All fields are required for new users")
                    return
                }

                const userData = {
                    email: email.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    department
                }
                const user = await usersApi.create(userData) // POST /api/users
                login(user) // speichert User im AuthContext
                navigate("/dashboard")
            } else {
                // Login eines bestehenden Users (ohne Passwort!)
                if (!email.trim()) {
                    setError("Email is required")
                    return
                }

                try {
                    const user = await usersApi.getByEmail(email.trim()) // GET /api/users/email/{email}
                    login(user)
                    navigate("/dashboard")
                } catch (error) {
                    if (error.message.includes("404") || error.message.includes("not found")) {
                        setError("User not found. Would you like to create a new account?")
                        setIsNewUser(true) // wechselt zur Registrierung
                    } else {
                        setError("Failed to login. Please try again.")
                    }
                }
            }
        } catch (error) {
            console.error("Authentication error:", error)
            if (error.message.includes("already exists") || error.message.includes("duplicate")) {
                setError("An account with this email already exists. Please try logging in instead.")
                setIsNewUser(false)
            } else {
                setError(error.message || "An error occurred. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    // Formular zurücksetzen
    const resetForm = () => {
        setEmail("")
        setFirstName("")
        setLastName("")
        setDepartment("")
        setError("")
        setIsNewUser(false)
    }

    // Benutzeroberfläche
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-black">
            <div className="container mx-auto px-4 py-8">
                {/* Überschrift + Einleitung */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Plane className="h-12 w-12 text-red-600 mr-3"/>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Business Trips Manager</h1>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Professional travel management for modern businesses
                    </p>
                </div>

                {/* Zwei-Spalten-Layout: Infos + Formular */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Features: Visuelle Erklärung der App */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <Calendar className="h-8 w-8 text-red-600 mb-3"/>
                                    <h3 className="font-semibold mb-2">Trip Planning</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Planung von
                                        Geschäftsreisen</p>
                                </CardContent>
                            </Card>
                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <Users className="h-8 w-8 text-red-600 mb-3"/>
                                    <h3 className="font-semibold mb-2">Team Management</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Abteilungsübergreifende
                                        Koordination</p>
                                </CardContent>
                            </Card>
                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <TrendingUp className="h-8 w-8 text-red-600 mb-3"/>
                                    <h3 className="font-semibold mb-2">Expense Tracking</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Verwaltung von Spesen</p>
                                </CardContent>
                            </Card>
                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <Plane className="h-8 w-8 text-red-600 mb-3"/>
                                    <h3 className="font-semibold mb-2">Booking System</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Flug- und Hotelbuchung</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Formular: Login oder Registrierung */}
                    <Card className="w-full max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>{isNewUser ? "Create Account" : "Welcome Back"}</CardTitle>
                            <CardDescription>
                                {isNewUser ? "Enter your details to create a new account" : "Enter your email to access your account"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* E-Mailfeld für Login und Registrierung */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)} required/>
                                </div>

                                {/* Zusätzliche Felder bei Registrierung */}
                                {isNewUser && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input id="firstName" value={firstName}
                                                       onChange={(e) => setFirstName(e.target.value)} required/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input id="lastName" value={lastName}
                                                       onChange={(e) => setLastName(e.target.value)} required/>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="department">Department</Label>
                                            <Select value={department} onValueChange={setDepartment} required>
                                                <SelectTrigger><SelectValue
                                                    placeholder="Select your department"/></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                                    <SelectItem value="Sales">Sales</SelectItem>
                                                    <SelectItem value="HR">Human Resources</SelectItem>
                                                    <SelectItem value="Finance">Finance</SelectItem>
                                                    <SelectItem value="Operations">Operations</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                )}

                                {/* Fehleranzeige */}
                                {error && (
                                    <div
                                        className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded">
                                        <AlertCircle className="h-4 w-4"/>
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Absenden-Button */}
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Please wait..." : isNewUser ? "Create Account" : "Sign In"}
                                </Button>

                                {/* Umschalten zw. Login / Registrierung */}
                                <div className="flex gap-2">
                                    {!isNewUser && (
                                        <Button type="button" variant="outline" className="flex-1"
                                                onClick={() => setIsNewUser(true)}>
                                            New user? Create account
                                        </Button>
                                    )}
                                    {isNewUser && (
                                        <Button type="button" variant="outline" className="flex-1"
                                                onClick={() => setIsNewUser(false)}>
                                            Have account? Sign in
                                        </Button>
                                    )}
                                    <Button type="button" variant="ghost" onClick={resetForm}>Reset</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
