import './DiagnosisResult.css';

export default function DiagnosisResult({data, onBack}) {
  return (
    <div className="result-container">
        <div className="result-card">
            <h2>Based on the symptoms, your possible diagnosis is...</h2>
            <h1 className="disease-title">{data.Disease}</h1>
            <div>
                <h3>Description:</h3>
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
  )
}