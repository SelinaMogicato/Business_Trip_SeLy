"use client"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plane, Calendar, MapPin, DollarSign, LogOut, Moon, Sun } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/components/ThemeProvider"

export function Layout({ children }) {
    const { user, logout } = useAuth()
    const { theme, setTheme } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: Calendar },
        { name: "All Trips", href: "/trips", icon: MapPin },
        { name: "My Trips", href: "/my-trips", icon: Plane },
        { name: "Expenses", href: "/expenses", icon: DollarSign },
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/dashboard" className="flex items-center">
                                <Plane className="h-8 w-8 text-red-600 mr-3" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Business Trips</span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "text-red-600 bg-red-50 dark:bg-red-900/20 shadow-sm"
                                                : "text-gray-600 hover:text-gray-900 dark:text-gray-300text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-9 w-9 p-0">
                                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Switch theme</span>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                                                {user?.firstName?.[0]}
                                                {user?.lastName?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium">
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                                            <p className="text-xs text-muted-foreground">{user?.department}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            const isActive = location.pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                                        isActive
                                            ? "text-red-600 bg-red-50 dark:bg-red-900/20"
                                            : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">{children}</div>
            </main>
        </div>
    )
}
