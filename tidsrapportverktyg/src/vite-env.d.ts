
/// <reference types="vite/client" />

// Lägg till typdefinitioner för miljövariabler som börjar med "VITE_"
interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Exempel på en miljövariabel
    // Lägg till andra miljövariabler här om du behöver fler
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  