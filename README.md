# Tidsrapport-Frontend
Under mina studier byggdes denna app som del av inlämningsuppgifterna
Detta är frontend-delen av **Timekeeper** – en tidrapporteringsapp som låter användare registrera och visualisera hur mycket tid de lägger på olika arbetsuppgifter.  
Applikationen är byggd med **React**, **TypeScript**, och kommunicerar med ett REST-API för datahantering. 

---

## 🚀 Funktionalitet

- ✅ Skapa och välj arbetskategori (ex: *Läsa*, *Programmera*, *Lunch*, *Paus*)
- ▶️ Starta och stoppa uppgifter (Check in / Check out)
- 🧾 Visa historik över registrerade tidsposter
- 📊 Statistik per vecka, dag och kategori (text + graf)
- 🎨 Stilren och responsiv UI med modulär komponentstruktur

---

## 🚧 Begränsningar & Buggar

### Saknad funktionalitet
- Inloggningssystem och stöd för flera användare
- Sortering av uppgifter per dag i lista

### Kända buggar
- Tidsposter som loggas på söndagar visas inte korrekt  
  (p.g.a. en bugg i hur veckonummer beräknas – inte relaterad till religiösa protokoll 😉)

---

## 🧰 Teknikstack

- React (Vite)
- TypeScript
- CSS Modules
- React Hooks (både inbyggda och custom)
- REST API-integration
- GitHub Actions + DigitalOcean App Platform (för deployment)

---

## 🗂 Projektstruktur

src/
├── components/         # Återanvändbara UI-komponenter
├── hooks/              # Custom hooks (t.ex. useTasks, useCategories)
├── models/             # Typer (t.ex. TimeEntry, Category)
├── pages/              # Sidkomponenter (t.ex. inloggad vy)
├── services/           # API-anrop till backend
├── utils/              # Hjälpfunktioner (ex. tidsberäkning)
├── styles/             # CSS-filer (globala & modulära)

---
##🧩 Viktiga komponenter & hooks
---

TimeTracker – Start/stopp-funktionalitet

TaskList – Visar registrerade uppgifter

StatBar – Grafisk statistik (kategori/tid)

WeeklyStats – Textbaserad summering per vecka

CategoryHandler – Skapa och hantera kategorier

useTasks() – Hook för logik kring tidsposter

useCategories() – Hook för kategori-hantering

---
##🌍 Miljövariabler
---

| Variabel       | Exempelvärde            | Beskrivning          |
| -------------- | ----------------------- | -------------------- |
| `VITE_API_URL` | `http://localhost:8080` | URL till backend-API |


Skapa en .env-fil (eller använd .env.example) för att konfigurera rätt URL.

🧪 Starta lokalt
Klona repot:

cd Tidsrapport-Frontend-v2/tidsrapportverktyg
Installera beroenden:


npm install
Starta utvecklingsserver:


npm run dev
Obs: Backend behöver köras parallellt på samma host som definierats i VITE_API_URL.


📦 Bygg & deployment
Frontend kan byggas med:

npm run build
Färdiga statiska filer hamnar i /dist och är redo att deployas (t.ex. via DigitalOcean App Platform eller Netlify).