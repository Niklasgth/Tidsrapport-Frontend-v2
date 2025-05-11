# Tidsrapport-Frontend

Detta är frontend-delen av min **Timekeeper**, en tidrapporteringsapp vilken låter en användaren registrera och se sin lagda tid på olika arbetsuppgifter elelr andra sysslor. 
Applikationen är byggd med **React**, **TypeScript**, och använder en REST-backend för datahantering.

## Funktionalitet

- ✅ Skapa och välj arbetskategori (t.ex. *Läsa*, *Programmera*, *Lunch*, *Paus*)
- ▶️ Starta och stoppa en arbetsuppgift (Check in / Check out)
- 🧾 Lista alla registrerade uppgifter
- 📊 Visa statistik per vecka, dag och kategori (text + graf)
- 🎨 Stilren och responsiv UI med modulär komponentstruktur
- 🚀 Automatisk deployment via GitHub → DigitalOcean

## Saknad funktionalitet

- sortering av kort på aktuell dag
- avsaknad av login funktion och stöd för olika användare

## Teknikstack

- React (Vite)
- TypeScript
- CSS Modules
- Hooks (Custom och React built-in)
- REST API-integration
- GitHub Actions + DigitalOcean App Platform

## Projektstruktur

```plaintext
src/
├── components/         # Återanvändbara UI-komponenter
├── hooks/              # Custom hooks som useTasks, useCategories etc.
├── models/             # Typsystem för TimeEntry, Category m.fl.
├── pages/              # Huvudsidor (inloggad vy etc.)
├── services/           # API-anrop till backend
├── utils/              # Hjälpfunktioner (ex. tidsberäkning)
├── styles/             # Globala och modulära CSS-filer
```

## Viktiga komponenter

- `TimeTracker` – Huvudkomponent för att starta/stoppa en uppgift
- `TaskList` – Visar registrerade uppgifter i en lista
- `StatBar` – Grafisk visning av tid per kategori
- `WeeklyStats` – Summering per dag och kategori i textform
- `CategoryHandler` – Hantering av kategorier
- `useTasks()` – Hook som hanterar `TimeEntry`-logik
- `useCategories()` – Hook som hanterar arbetskategorier

## Miljövariabler

| Variabel         | Exempelvärde                    | Beskrivning                |
|------------------|----------------------------------|----------------------------|
| `VITE_API_URL`   | `http://localhost:8080`         | Adressen till backend-API  |

## Starta lokalt

1. Klona repot:
```bash
git clone https://github.com/Niklasgth/Tidsrapport-Frontend-v2.git
cd Tidsrapport-Frontend-v2
```

2. Installera beroenden:
```bash
npm install
```

3. Starta dev-server:
```bash
npm run dev
```

> Backend måste vara igång på samma nätverk/host som definierat i `VITE_API_URL`.

## Deployment

Frontend är konfigurerad för att byggas med `vite` och deployas som en **statisk webbplats** via DigitalOcean App Platform.

### Bygg för produktion

```bash
npm run build
```

### Output

Filerna hamnar i `/dist` och kan användas som **static site** i DigitalOcean.

## Övrigt

## Kontakt

Byggd av [Niklas Torstensson](https://github.com/Niklasgth)
