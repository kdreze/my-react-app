import './DiagnosisResult.css';

export default function DiagnosisResult({data, onBack}) {
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
                                <li key={index}><a href={resource} target="_blank" rel="noopener noreferrer">{resource}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
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
    </div>
  )
}