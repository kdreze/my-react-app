import "./SymptomAnalysis.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import DiagnosisResult from "../DiagnosisResult/DiagnosisResult";
import database from "../../data/data.json";

const symptomsList = [
  "Fever", "Cough", "Fatigue", "Headache", "Nausea", "Vomiting", "Diarrhea",
  "Abdominal pain", "Chest pain", "Shortness of breath", "Dizziness", "Rash",
  "Joint pain", "Muscle Pain", "Swelling", "Weight loss", "Weight gain",
  "Night sweats", "Chills", "Sore throat", "Runny nose", "Sneezing",
  "Loss of appetite", "Vision problems", "Confusion", "Seizures", "Paralysis",
  "Numbness", "Tingling", "Increased thirst", "Increased urination",
  "Hair loss", "Jaundice", "Itching", "Heart palpitations", "Anxiety",
  "Heat intolerance", "Cold intolerance", "Balance issues", "Memory loss",
  "Difficulty swallowing", "Anosmia (loss of smell)", "Wheezing",
  "Neck stiffness", "Dark urine",
];

export default function SymptomAnalysis() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [diagnosisData, setDiagnosisData] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const saveToHistory = async (disease, symptomsArray) => {
    if (!isAuthenticated) {
      alert("Please log in to save diagnosis to history");
      return;
    }
    
    try {
      await fetch("http://localhost:8000/history", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          disease: disease,
          symptoms: symptomsArray,
          note: "",
        }),
      });
      alert("Diagnosis saved to history!");
    } catch (error) {
      console.error("Error saving to history:", error);
      alert("Failed to save diagnosis");
    }
  };

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [symptom]: !prev[symptom],
    }));
  };

  const handleDiagnose = async () => {
    const count = Object.values(selectedSymptoms).filter(
      (val) => val === true
    ).length;
    
    if (count < 4) {
      alert("Please select at least 4 symptoms to proceed with diagnosis.");
      return;
    }

    const numbersArray = symptomsList.map((symptom) =>
      selectedSymptoms[symptom] ? 1 : 0
    );

    try {
      const response = await fetch("http://localhost:8000/symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: numbersArray }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const backendPrediction = data.predicted_disease;

      const foundDisease = database.find(
        (item) =>
          item.Disease?.trim().toLowerCase() ===
          backendPrediction?.trim().toLowerCase()
      );

      const resultData = foundDisease ? { ...foundDisease } : {
          Disease: backendPrediction || "Unknown",
          Description: "No matching disease found in the database.",
          Symptoms: "N/A",
      };

      resultData.rawPrediction = backendPrediction;
      resultData.rawSymptoms = numbersArray;

      setDiagnosisData(resultData);

    } catch (error) {
      console.error("Error diagnosing:", error);
      alert("Failed to get diagnosis. Please try again.");
    }
  };

  const closeDiagnosis = () => {
    setDiagnosisData(null);
    setSelectedSymptoms({});
    setIsOpen(false);
  };

  if (diagnosisData) {
    return (
      <DiagnosisResult 
        data={diagnosisData} 
        onBack={closeDiagnosis} 
        onSave={saveToHistory}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  return (
    <main className="symptoms-page">
      <div className="symptoms-page-container">
        <Link to="/">
          <button className="close-button">x</button>
        </Link>
        <div className="symptoms-page-text">
          <h1 className="symptoms-page-title">Symptom Analysis</h1>
          <ol>
            <li className="symptoms-page-step">
              Check off any symptoms that apply to what you are feeling.
            </li>
            <li className="symptoms-page-step">Press the <b>DIAGNOSE</b> button.</li>
            <li className="symptoms-page-step">
              Get insights about what you are experiencing.
            </li>
          </ol>
          <p>
            A minimum of 4 symptoms <br /> is required to continue!
          </p>
        </div>
        <div className="symptoms-rigth section">
          <div className="dropdown-container">
            <div
              className={`dropdown-header ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Select your symptoms...</span>
              <span className="arrow">
                {isOpen ? (
                  <img src="/img/oui_arrow_up.png" alt="" />
                ) : (
                  <img src="/img/oui_arrow_down.png" alt="" />
                )}
              </span>
            </div>
            {isOpen && (
              <div className="dropdown-list">
                {symptomsList.map((symptom) => (
                  <label key={symptom} className="dropdown-list-item">
                    <input
                      type="checkbox"
                      checked={!!selectedSymptoms[symptom]}
                      onChange={() => handleCheckboxChange(symptom)}
                    />
                    <span className="symptom-label">{symptom}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="symptoms-diagnose-wrapper">
            <button className="diagnose-button" onClick={handleDiagnose}>
              DIAGNOSE <span>{">"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
