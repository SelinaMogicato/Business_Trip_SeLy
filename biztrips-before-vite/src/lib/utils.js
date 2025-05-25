import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// Swiss date formatting (dd.mm.yyyy)
export function formatSwissDate(dateString) {
    if (!dateString) return "N/A"
    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return "Invalid Date"
        return date.toLocaleDateString("de-CH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    } catch (error) {
        return "Invalid Date"
    }
}

// Swiss date and time formatting (dd.mm.yyyy, 24:00)
export function formatSwissDateTime(dateString) {
    if (!dateString) return "N/A"
    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return "Invalid Date"
        return date.toLocaleString("de-CH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24-hour format
        })
    } catch (error) {
        return "Invalid Date"
    }
}

// Swiss time only formatting (24:00)
export function formatSwissTime(dateString) {
    if (!dateString) return "N/A"
    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return "Invalid Time"
        return date.toLocaleTimeString("de-CH", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24-hour format
        })
    } catch (error) {
        return "Invalid Time"
    }
}

// Swiss currency formatting (CHF)
export function formatSwissCurrency(amount) {
    if (amount === null || amount === undefined) return "CHF 0.00"
    return new Intl.NumberFormat("de-CH", {
        style: "currency",
        currency: "CHF",
    }).format(amount)
}

// Short Swiss date formatting for compact displays (dd.mm.yyyy)
export function formatSwissDateShort(dateString) {
    if (!dateString) return "N/A"
    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return "Invalid"
        return date.toLocaleDateString("de-CH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    } catch (error) {
        return "Invalid"
    }
}

// Month name in German (for Swiss formatting)
export function getSwissMonthName(dateString) {
    if (!dateString) return "N/A"
    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return "Invalid"
        return date.toLocaleDateString("de-CH", {
            month: "long",
            year: "numeric",
        })
    } catch (error) {
        return "Invalid"
    }
}

// Format date for HTML datetime-local input
export function formatDateForInput(dateString) {
    if (!dateString) return ""
    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return ""
        // Format as YYYY-MM-DDTHH:MM for datetime-local input
        return date.toISOString().slice(0, 16)
    } catch (error) {
        return ""
    }
}

// Format date range in Swiss format
export function formatSwissDateRange(startDate, endDate) {
    if (!startDate || !endDate) return "N/A"
    try {
        const start = formatSwissDate(startDate)
        const end = formatSwissDate(endDate)
        return `${start} - ${end}`
    } catch (error) {
        return "Invalid Date Range"
    }
}

// Format date and time range in Swiss format
export function formatSwissDateTimeRange(startDate, endDate) {
    if (!startDate || !endDate) return "N/A"
    try {
        const start = formatSwissDateTime(startDate)
        const end = formatSwissDateTime(endDate)
        return `${start} - ${end}`
    } catch (error) {
        return "Invalid Date Range"
    }
}
