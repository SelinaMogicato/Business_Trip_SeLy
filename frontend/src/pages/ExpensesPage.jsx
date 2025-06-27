"use client"

import {useState, useEffect} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {DollarSign, Calendar, FileText, Plus, Search} from "lucide-react"
import {Layout} from "@/components/Layout"
import {AddExpenseDialog} from "@/components/AddExpenseDialog"
import {expensesApi} from "@/lib/api"
import {formatSwissDate, formatSwissCurrency} from "@/lib/utils"

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([])
    const [filteredExpenses, setFilteredExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [showAddDialog, setShowAddDialog] = useState(false)

    useEffect(() => {
        fetchExpenses()
    }, [])

    useEffect(() => {
        const filtered = expenses.filter(
            (expense) =>
                expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (expense.businessTrip && expense.businessTrip.title.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setFilteredExpenses(filtered)
    }, [expenses, searchTerm])

    const fetchExpenses = async () => {
        try {
            setLoading(true)
            const data = await expensesApi.getAll()
            setExpenses(data)
        } catch (error) {
            console.error("Error fetching expenses:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleExpenseAdded = (newExpense) => {
        setExpenses((prev) => [...prev, newExpense])
    }

    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expenses</h1>
                        <p className="text-gray-600 dark:text-gray-300">Track and manage business trip expenses</p>
                    </div>
                    <Button onClick={() => setShowAddDialog(true)} className="bg-red-600 hover:bg-red-700">
                        <Plus className="h-4 w-4 mr-2"/>
                        Add Expense
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400"/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total
                                        Expenses</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatSwissCurrency(totalExpenses)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400"/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total
                                        Records</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredExpenses.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400"/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">This Month</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatSwissCurrency(
                                            filteredExpenses
                                                .filter((expense) => {
                                                    const expenseDate = new Date(expense.date)
                                                    const now = new Date()
                                                    return (
                                                        expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()
                                                    )
                                                })
                                                .reduce((sum, expense) => sum + expense.amount, 0),
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                    <Input
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Expense Records</CardTitle>
                        <CardDescription>All business trip expenses and their details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredExpenses.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No expenses
                                    found</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {searchTerm ? "Try adjusting your search terms." : "Start by adding your first expense."}
                                </p>
                                {!searchTerm && (
                                    <Button onClick={() => setShowAddDialog(true)}
                                            className="bg-red-600 hover:bg-red-700">
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Add Expense
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredExpenses.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400"/>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{expense.description}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {expense.businessTrip ? expense.businessTrip.title : "No trip assigned"} •{" "}
                                                    {formatSwissDate(expense.date)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {formatSwissCurrency(expense.amount)}
                                            </p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <AddExpenseDialog open={showAddDialog} onOpenChange={setShowAddDialog}
                                  onExpenseAdded={handleExpenseAdded}/>
            </div>
        </Layout>
    )
}
