import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function formatSwissDate(dateInput) {
    if (!dateInput) return "Date not available"

    try {
        let date

        if (Array.isArray(dateInput)) {
            const [year, month, day] = dateInput
            date = new Date(year, month - 1, day)
        } else {
            date = new Date(dateInput)
        }

        if (isNaN(date.getTime())) return "Date not available"

        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    } catch (error) {
        console.error("Error formatting date:", error, dateInput)
        return "Date not available"
    }
}

export function formatSwissCurrency(amount) {
    if (amount === null || amount === undefined) return "CHF 0.00"
    return new Intl.NumberFormat("de-CH", {
        style: "currency",
        currency: "CHF",
    }).format(amount)
}

export function formatDateForInput(dateInput) {
    if (!dateInput) return ""

    try {
        let date

        if (Array.isArray(dateInput)) {
            const [year, month, day] = dateInput
            date = new Date(year, month - 1, day)
        } else {
            date = new Date(dateInput)
        }

        if (isNaN(date.getTime())) return ""

        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")

        return `${year}-${month}-${day}`
    } catch (error) {
        console.error("Error formatting date for input:", error, dateInput)
        return ""
    }
}

export function formatSwissDateRange(startDate, endDate) {
    if (!startDate || !endDate) return "Date range not available"

    try {
        return `${formatSwissDate(startDate)} - ${formatSwissDate(endDate)}`
    } catch (error) {
        console.error("Error formatting date range:", error, startDate, endDate)
        return "Date range not available"
    }
}
