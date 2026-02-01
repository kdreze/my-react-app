import numpy as np
import json
import os
from uuid import uuid4
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# Upewnij się, że plik model.py i model.pkl są w tym samym folderze
from model import model 

app = FastAPI()

# --- KONFIGURACJA CORS ---
# Zmieniamy na ["*"], żeby działało na każdym porcie (5173, 5174 itp.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- BAZA DANYCH (Plik JSON) ---
DB_FILE = "db.json"

# Funkcja pomocnicza: Odczyt z bazy
def load_db():
    if not os.path.exists(DB_FILE):
        # Jeśli plik nie istnieje, zwracamy pustą listę
        return []
    with open(DB_FILE, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

# Funkcja pomocnicza: Zapis do bazy
def save_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

# --- MODELE DANYCH (Pydantic) ---

# Model do predykcji (to co wysyła frontend przy diagnozie)
class Payload(BaseModel):
    symptoms: list[int]

# Model do zapisu w historii (CRUD)
class DiagnosisEntry(BaseModel):
    id: Optional[str] = None
    disease: str
    symptoms: list[int]
    note: str = "" # Pole do edycji (Update)

# --- LISTA SYMPTOMÓW ---
SYMPTOMS = {
    0: "Fever", 1: "Cough", 2: "Fatigue", 3: "Headache", 4: "Nausea",
    5: "Vomiting", 6: "Diarrhea", 7: "Abdominal Pain", 8: "Chest Pain",
    9: "Shortness of Breath", 10: "Dizziness", 11: "Rash", 12: "Joint Pain",
    13: "Muscle Pain", 14: "Swelling", 15: "Weight Loss", 16: "Weight Gain",
    17: "Night Sweats", 18: "Chills", 19: "Sore Throat", 20: "Runny Nose",
    21: "Sneezing", 22: "Loss of Appetite", 23: "Vision Problems", 24: "Confusion",
    25: "Seizures", 26: "Paralysis", 27: "Numbness", 28: "Tingling",
    29: "Increased Thirst", 30: "Increased Urination", 31: "Hair Loss",
    32: "Jaundice", 33: "Itching", 34: "Heart Palpitations", 35: "Anxiety",
    36: "Heat Intolerance", 37: "Cold Intolerance", 38: "Balance Issues",
    39: "Memory Loss", 40: "Difficulty Swallowing", 41: "Anosmia",
    42: "Wheezing", 43: "Neck Stiffness", 44: "Dark Urine",
}

@app.get("/all-symptoms")
async def all_symptoms():
    return SYMPTOMS

# --- LOGIKA ML (Twoja stara funkcja) ---
# Zostawiłem nazwę "/symptoms", żeby stary kod Frontendu działał bez zmian
@app.post("/symptoms")
async def symptoms(payload: Payload):
    inp = np.array(payload.symptoms).reshape(1, -1)
    prediction = model.predict(inp)

    disease_name = (
        prediction[0] if isinstance(prediction[0], str) else str(prediction[0])
    )

    return {"predicted_disease": disease_name}


# --- NOWOŚĆ: CRUD OPERATIONS (Wymagane do zaliczenia) ---

# 1. CREATE (Dodaj nową diagnozę do historii)
@app.post("/history")
async def add_history(entry: DiagnosisEntry):
    db = load_db()
    new_entry = entry.dict()
    new_entry["id"] = str(uuid4()) # Generujemy unikalne ID
    db.append(new_entry)
    save_db(db)
    return new_entry

# 2. READ (Wyświetl listę diagnoz)
@app.get("/history")
async def get_history():
    return load_db()

# 3. UPDATE (Edytuj notatkę w diagnozie)
@app.put("/history/{entry_id}")
async def update_history(entry_id: str, payload: dict):
    # Frontend wyśle np: {"note": "Pacjent zdrowy"}
    db = load_db()
    for item in db:
        if item["id"] == entry_id:
            # Aktualizujemy notatkę, jeśli przyszła w żądaniu
            item["note"] = payload.get("note", item["note"])
            save_db(db)
            return item
    raise HTTPException(status_code=404, detail="Wpis nie znaleziony")

# 4. DELETE (Usuń wpis z historii)
@app.delete("/history/{entry_id}")
async def delete_history(entry_id: str):
    db = load_db()
    # Zostaw tylko te elementy, które NIE mają podanego ID
    new_db = [item for item in db if item["id"] != entry_id]
    
    if len(db) == len(new_db):
        raise HTTPException(status_code=404, detail="Wpis nie znaleziony")
        
    save_db(new_db)
    return {"message": "Usunięto pomyślnie"}