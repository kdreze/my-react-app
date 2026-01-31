import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import model
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYMPTOMS = {
    0: "Fever",
    1: "Cough",
    2: "Fatigue",
    3: "Headache",
    4: "Nausea",
    5: "Vomiting",
    6: "Diarrhea",
    7: "Abdominal Pain",
    8: "Chest Pain",
    9: "Shortness of Breath",
    10: "Dizziness",
    11: "Rash",
    12: "Joint Pain",
    13: "Muscle Pain",
    14: "Swelling",
    15: "Weight Loss",
    16: "Weight Gain",
    17: "Night Sweats",
    18: "Chills",
    19: "Sore Throat",
    20: "Runny Nose",
    21: "Sneezing",
    22: "Loss of Appetite",
    23: "Vision Problems",
    24: "Confusion",
    25: "Seizures",
    26: "Paralysis",
    27: "Numbness",
    28: "Tingling",
    29: "Increased Thirst",
    30: "Increased Urination",
    31: "Hair Loss",
    32: "Jaundice",
    33: "Itching",
    34: "Heart Palpitations",
    35: "Anxiety",
    36: "Heat Intolerance",
    37: "Cold Intolerance",
    38: "Balance Issues",
    39: "Memory Loss",
    40: "Difficulty Swallowing",
    41: "Anosmia",
    42: "Wheezing",
    43: "Neck Stiffness",
    44: "Dark Urine",
}


@app.get("/all-symptoms")
async def all_symptoms():
    return SYMPTOMS


class Payload(BaseModel):
    symptoms: list[int]


@app.post("/symptoms")
async def symptoms(payload: Payload):
    inp = np.array(payload.symptoms).reshape(1, -1)  # Poprawiony reshape
    prediction = model.predict(inp)

    # Model zwraca nazwę choroby jako string
    disease_name = (
        prediction[0] if isinstance(prediction[0], str) else str(prediction[0])
    )

    return {"predicted_disease": disease_name}
