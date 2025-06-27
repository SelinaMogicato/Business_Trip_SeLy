import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Hilfsfunktion für CSS: kombiniert Tailwind-Klassen intelligent
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// Formatiert ein Datum im Schweizer Format: z. B. 20.06.2025
export function formatSwissDate(dateInput) {
    if (!dateInput) return "Date not available"

    try {
        let date

        // Unterstützt auch Array-Format: [Jahr, Monat, Tag]
        if (Array.isArray(dateInput)) {
            const [year, month, day] = dateInput
            date = new Date(year, month - 1, day) // Monat ist 0-basiert
        } else {
            date = new Date(dateInput)
        }

        // Wenn kein gültiges Datum -> Fehler
        if (isNaN(date.getTime())) return "Date not available"

        // Format: dd.mm.yyyy
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    } catch (error) {
        console.error("Error formatting date:", error, dateInput)
        return "Date not available"
    }
}

// Formatiert Beträge im Schweizer Währungsformat: z. B. CHF 1’000.00
export function formatSwissCurrency(amount) {
    if (amount === null || amount === undefined) return "CHF 0.00"
    return new Intl.NumberFormat("de-CH", {
        style: "currency",
        currency: "CHF",
    }).format(amount)
}

// Format für HTML-Input vom Typ "date": yyyy-mm-dd
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

// Kombiniert zwei Daten zu einer Bereichsangabe: "01.01.2025 - 03.01.2025"
export function formatSwissDateRange(startDate, endDate) {
    if (!startDate || !endDate) return "Date range not available"

    try {
        return `${formatSwissDate(startDate)} - ${formatSwissDate(endDate)}`
    } catch (error) {
        console.error("Error formatting date range:", error, startDate, endDate)
        return "Date range not available"
    }
}
