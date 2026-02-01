import { useState } from 'react'; // <--- 1. IMPORTUJEMY STATE
import './DiagnosisResult.css';

// 2. DODAJEMY onSave DO PROPSÓW
export default function DiagnosisResult({ data, onBack, onSave }) {
    const [isSaved, setIsSaved] = useState(false); // <--- 3. STAN ZAPISU

    // Funkcja obsługująca kliknięcie zapisu
    const handleSaveClick = async () => {
        // Sprawdzamy, czy mamy dane do zapisu (te surowe, które dokleiliśmy w SymptomAnalysis)
        if (data.rawPrediction && data.rawSymptoms) {
            await onSave(data.rawPrediction, data.rawSymptoms);
            setIsSaved(true); // Zmieniamy przycisk na "Zapisano"
        } else {
            console.error("Brak danych surowych (rawPrediction/rawSymptoms) w obiekcie data");
        }
    };

    const diseaseresultBox = [
        {
            icon: <img src="/img/diag_rec.png" alt="Reccomendation icon" />,
            title: "Recomendation",
            description: "Professional medical guidance advised."
        },
        {
            icon: <img src="/img/diag_care.png" alt="When to seek care icon" />,
            title: "When to seek care",
            description: "If symptoms worsen or persist."
        },
        {
            icon: <img src="/img/diag_self.png" alt="Self-care icon" />,
            title: "Self-care",
            description: "Rest and stay hydrated."
        }
    ];

    return (
        <div className="result-container">
            <div className="result-card">
                <h2>Based on the symptoms, your possible diagnosis is...</h2>
                
                <div className="disease-content-wrapper" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    
                    {/* LEWA STRONA (TEKST + PRZYCISKI) */}
                    <div className="disease-left-side">
                        <div className="disease-name">
                            <h1 className="disease-title">{data.Disease}</h1>
                        </div>
                        <div className="disease-line"></div>
                        <div className="disease-info">
                            <div>
                                <p className="disease-description">{data.Description}</p>
                            </div>
                            <div>
                                <h3>Common Symptoms:</h3>
                                <p className="disease-symptoms">{data.Symptoms}</p>
                            </div>
                            <div>
                                <h3>Useful Resources:</h3>
                                <ul className="disease-resources">
                                    {data.Resources?.map((resource, index) => (
                                        <li key={index}>
                                            <a href={resource} target="_blank" rel="noopener noreferrer">{resource}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>                        
                    </div>

                    {/* PRAWA STRONA (KAFELKI) */}
                    <div className="disease-right-side">
                        <div className="disease-result-grid">
                            {diseaseresultBox.map((box, index) => (
                                <div key={index} className="our-team-box">
                                    <div className="box-icon-wrapper">
                                        <span className="box-icon">{box.icon}</span>
                                    </div>
                                    <h3 className="box-title">{box.title}</h3>
                                    <div className="box-description">
                                        {box.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="diagnosis-actions">
                    <button 
                        className={`action-btn btn-save ${isSaved ? 'saved' : ''}`} 
                        onClick={handleSaveClick}
                        disabled={isSaved}
                    >
                        {isSaved ? "✓ Saved to History" : "Save Result"}
                    </button>
                            
                    <button className="action-btn btn-back" onClick={onBack}>
                        Back / New Diagnosis
                    </button>
                </div>        
            </div>
        </div>
    );
}