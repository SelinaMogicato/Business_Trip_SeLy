# Business Trip Management System

Eine umfassende Webanwendung zur Verwaltung von Geschäftsreisen, Buchungen, Spesen und Meetings – mit Unterstützung für Schweizer Lokalisierung.

## Überblick

Das Business Trip Management System ist eine Full-Stack-Anwendung, die den Prozess der Planung, Buchung und Verwaltung von Geschäftsreisen innerhalb eines Unternehmens vereinfacht. Sie bietet eine benutzerfreundliche Oberfläche, mit der Mitarbeitende Reisen einsehen, buchen, Spesen verwalten und Meetings planen können.

Dieses Projekt wurde im Rahmen eines Schulprojekts von **Lysandro** und **Selina** entwickelt.  
*(Hinweis am Rande: Wir arbeiten nebenbei bei der Sunrise GmbH)*

## Funktionen

- **Reiseverwaltung**: Geschäftsreisen erstellen, anzeigen, bearbeiten und löschen
- **Buchungssystem**: Mitarbeitende können Reisen buchen (mit Genehmigungsprozess)
- **Spesenerfassung**: Spesen zu Reisen erfassen und verwalten
- **Meetingverwaltung**: Meetings während Geschäftsreisen planen und dokumentieren
- **Dashboard**: Übersicht über anstehende Reisen, Buchungen und Statistiken
- **Schweizer Lokalisierung**: Datumsformat (TT.MM.JJJJ) und Währungsformat (CHF)
- **Dark-/Light-Mode**: Umschaltbar zwischen hellem und dunklem Modus
- **Responsive Design**: Optimiert für Desktop und mobile Geräte

## Technologiestack

### Backend

- **Java 17** mit **Spring Boot**
- **Spring Data JPA** für Datenbankoperationen
- **RESTful API** Architektur
- **H2-Datenbank** für die Entwicklung

### Frontend

- **React** mit **Vite** als Build-Tool
- **Tailwind CSS** für das Styling
- **Shadcn/UI** Komponentenbibliothek
- **React Router** für Navigation
- **Context API** für Zustandsverwaltung

## Architektur

### Zentrale Datenmodelle

1. **BusinessTrip**: Beinhaltet Reisedetails, Daten, Ort und maximale Teilnehmerzahl
2. **User**: Informationen zu Mitarbeitenden wie Name, E-Mail, Abteilung
3. **Booking**: Repräsentiert eine Buchung eines Nutzers für eine Reise
4. **Expense**: Spesen, die mit einer Reise verbunden sind
5. **Meeting**: Meetings im Rahmen einer Geschäftsreise

### Wichtige Komponenten

#### Backend-Controller

- **BusinessTripController**: Verwaltung von Geschäftsreisen
- **UserController**: Benutzerverwaltung
- **BookingController**: Buchungsvorgänge
- **ExpenseController**: Spesenverwaltung
- **MeetingController**: Meetingorganisation

#### Frontend-Seiten

- **DashboardPage**: Übersicht über Reisen und Kennzahlen
- **TripsPage**: Alle Reisen verwalten und anzeigen
- **MyTripsPage**: Eigene gebuchte Reisen anzeigen
- **ExpensesPage**: Spesen verwalten

#### UI-Komponenten

- **CreateTripDialog**: Formular zum Erstellen neuer Reisen
- **EditTripDialog**: Formular zum Bearbeiten bestehender Reisen
- **BookTripDialog**: Oberfläche zur Buchung von Reisen
- **AddExpenseDialog**: Formular zum Hinzufügen von Spesen
- **ThemeProvider**: Verwaltung von Dark-/Light-Modus

## Schweizer Lokalisierung

Die Anwendung berücksichtigt spezifische Anforderungen der Schweiz:

- **Datumsformat**: TT.MM.JJJJ (z. B. 25.12.2025)
- **Zeitformat**: 24-Stunden (z. B. 14:30)
- **Währung**: CHF mit landesüblicher Formatierung
- **Einheitliche Formatierung**: Anwendung im gesamten System

## API-Endpunkte

### Geschäftsreisen

- `GET /api/trips`: Alle Reisen abrufen
- `GET /api/trips/{id}`: Reise nach ID abrufen
- `POST /api/trips`: Neue Reise erstellen
- `PUT /api/trips/{id}`: Reise aktualisieren
- `DELETE /api/trips/{id}`: Reise löschen

### Benutzer

- `GET /api/users`: Alle Benutzer abrufen
- `GET /api/users/{id}`: Benutzer nach ID abrufen
- `POST /api/users`: Neuen Benutzer erstellen
- `PUT /api/users/{id}`: Benutzer aktualisieren
- `DELETE /api/users/{id}`: Benutzer löschen

### Buchungen

- `GET /api/bookings`: Alle Buchungen abrufen
- `GET /api/bookings/user/{userId}`: Buchungen eines Benutzers abrufen
- `POST /api/bookings`: Buchung erstellen
- `PUT /api/bookings/{id}`: Buchungsstatus aktualisieren
- `DELETE /api/bookings/{id}`: Buchung löschen

### Spesen

- `GET /api/expenses`: Alle Spesen abrufen
- `POST /api/expenses`: Spese erfassen
- `PUT /api/expenses/{id}`: Spese aktualisieren
- `DELETE /api/expenses/{id}`: Spese löschen

### Meetings

- `GET /api/meetings`: Alle Meetings abrufen
- `POST /api/meetings`: Meeting erstellen
- `PUT /api/meetings/{id}`: Meeting aktualisieren
- `DELETE /api/meetings/{id}`: Meeting löschen

## Setup-Anleitung

### Backend

1. Java 17 installieren
2. Zum Verzeichnis `backend` wechseln
3. Mit `./mvnw spring-boot:run` starten (unter Windows: `mvnw.cmd spring-boot:run`)
4. Das Backend läuft unter [http://localhost:8080](http://localhost:8080)

### Frontend

1. Node.js installieren
2. Zum Verzeichnis `biztrips-before-vite` wechseln
3. Mit `npm install` die Abhängigkeiten installieren
4. Mit `npm run dev` den Entwicklungsserver starten
5. Das Frontend ist erreichbar unter [http://localhost:5173](http://localhost:5173)

## Verwendung

1. Benutzer über die API oder direkt in der Datenbank anlegen
2. Mit Benutzer-Zugangsdaten einloggen
3. Neue Geschäftsreisen auf der Trips-Seite erstellen
4. Reisen über die "Alle Reisen"-Seite buchen
5. Spesen auf der Spesen-Seite hinzufügen
6. Zwischen hellen und dunklen Layouts umschalten

## Projektstruktur

```plaintext
business-trip-management/
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/        # Java Quellcode
│   │   └── ch/clip/trips/    # Hauptpaket
│   │       ├── controller/   # REST-Controller
│   │       ├── model/        # Entity-Klassen
│   │       └── repo/         # JPA-Repositories
│   └── pom.xml               # Maven-Konfiguration
└── biztrips-before-vite/     # React Frontend
    ├── public/               # Statische Inhalte
    ├── src/                  # Quellcode
    │   ├── components/       # React-Komponenten
    │   ├── contexts/         # React Contexts
    │   ├── lib/              # Hilfsfunktionen
    │   └── pages/            # Seiten-Komponenten
    ├── index.html            # Einstiegspunkt HTML
    └── package.json          # NPM-Konfiguration
