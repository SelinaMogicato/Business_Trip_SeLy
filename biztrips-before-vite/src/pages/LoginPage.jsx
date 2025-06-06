"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, Users, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { usersApi } from "@/lib/api"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [department, setDepartment] = useState("")
    const [isNewUser, setIsNewUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            if (isNewUser) {
                if (!email.trim() || !firstName.trim() || !lastName.trim() || !department) {
                    setError("All fields are required for new users")
                    return
                }

                const userData = {
                    email: email.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    department,
                }

                const user = await usersApi.create(userData)
                login(user)
                navigate("/dashboard")
            } else {
                if (!email.trim()) {
                    setError("Email is required")
                    return
                }

                try {
                    const user = await usersApi.getByEmail(email.trim())
                    login(user)
                    navigate("/dashboard")
                } catch (error) {
                    if (error.message.includes("404") || error.message.includes("not found")) {
                        setError("User not found. Would you like to create a new account?")
                        setIsNewUser(true)
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

    const resetForm = () => {
        setEmail("")
        setFirstName("")
        setLastName("")
        setDepartment("")
        setError("")
        setIsNewUser(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-black">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Plane className="h-12 w-12 text-red-600 mr-3" />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Business Trips Manager</h1>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Professional travel management for modern businesses
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <Calendar className="h-8 w-8 text-red-600 mb-3" />
                                    <h3 className="font-semibold mb-2">Trip Planning</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Organize and schedule business trips efficiently
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <Users className="h-8 w-8 text-red-600 mb-3" />
                                    <h3 className="font-semibold mb-2">Team Management</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Coordinate trips across departments</p>
                                </CardContent>
                            </Card>

                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <TrendingUp className="h-8 w-8 text-red-600 mb-3" />
                                    <h3 className="font-semibold mb-2">Expense Tracking</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Monitor and manage travel expenses</p>
                                </CardContent>
                            </Card>

                            <Card className="card-hover">
                                <CardContent className="p-6">
                                    <Plane className="h-8 w-8 text-red-600 mb-3" />
                                    <h3 className="font-semibold mb-2">Booking System</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Streamlined trip booking process</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Card className="w-full max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>{isNewUser ? "Create Account" : "Welcome Back"}</CardTitle>
                            <CardDescription>
                                {isNewUser ? "Enter your details to create a new account" : "Enter your email to access your account"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john.doe@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {isNewUser && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder="John"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Doe"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="department">Department</Label>
                                            <Select value={department} onValueChange={setDepartment} required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your department" />
                                                </SelectTrigger>
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

                                {error && (
                                    <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Please wait..." : isNewUser ? "Create Account" : "Sign In"}
                                </Button>

                                <div className="flex gap-2">
                                    {!isNewUser && (
                                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsNewUser(true)}>
                                            New user? Create account
                                        </Button>
                                    )}

                                    {isNewUser && (
                                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsNewUser(false)}>
                                            Have account? Sign in
                                        </Button>
                                    )}

                                    <Button type="button" variant="ghost" onClick={resetForm}>
                                        Reset
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
