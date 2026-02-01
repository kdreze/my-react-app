import './Database.css';


export default function Database() {
    const classificationData = [
    {
        title: "Key symptoms",
        dots: 4,
        frequency: "85-95% of cases",
        description: "Core symptoms that appear in nearly all patients",
        example: "Example: fever in influenza"
    },
    {
        title: "Common symptoms",
        dots: 3,
        frequency: "60-80% of cases",
        description: "Typical symptoms, but not present in every patient",
        example: "Example: muscle pain in influenza"
    },
    {
        title: "Less common symptoms",
        dots: 2,
        frequency: "30-60% of cases",
        description: "Possible but not universal",
        example: "Example: sore throat in influenza"
    },
    {
        title: "Medical noise",
        dots: 1,
        frequency: "3-8% of cases",
        description: "Rare or atypical symptoms that may occasionally accompany the disease",
        example: ""
    },
    ];
    const diseaseBox = [
        {
            icon: <img src="/img/respiratory.png" alt="Respiratory icon" />,
            title: "Respiratory",
            description: "Influenza COVID-19 Pneumonia Asthma COPD"
        },
        {
            icon: <img src="/img/cardio.png" alt="Cardiovascular icon" />,
            title: "Cardiovascular",
            description: "Hypertension Heart Faileure Arrhythmia"
        },
        {
            icon: <img src="/img/neuro.png" alt="Neurological icon" />,
            title: "Neurological",
            description: "Migraine Stroke Alzheimer's Parkinson’s"
        },
        {
            icon: <img src="/img/metabolic.png" alt="Metabolic icon" />,
            title: "Metabolic",
            description: "Type 1 & 2 Diabetes Hypothyroidism Hyperthyroidism"
        },
        {
            icon: <img src="/img/autoimmune.png" alt="Autoimmune icon" />,
            title: "Autoimmune",
            description: "Rheumatoid ArthritisLupus Multiple Sclerosis"
        }
    ];
    return (
        <main className="database-content">
            <div className="database-title-container">
                <h1 className="database-title">DATABASE</h1>
                <p className="database-subtitle">An evolving resource designed to support symptom-based disease analysis.</p>
                <p className="database-title-description">This page presents an overview of a database connecting diseases with their diagnostic symptoms. All entries are supported by reliable scientific sources and regularly updated.</p>
            </div>
            <div className="database-structure-container">
                <h2 className="database-structure-title">Structure</h2>
                <p className="database-structure-description">Our database contains 1,200 medical cases covering 30 different diseases. Each case represents a specific combination of 45 possible symptoms that may occur in a patient.</p>
            </div>
            <div className="database-patients-container">
                <p className="database-patients-description">In real life, the same disease can present differently in different individuals. For example:</p>
                <div className="database-patinets-row">
                    <div className="database-patient-container">
                        <h3 className="database-patient-title">PATIENT A</h3>
                        <p className="database-patient-disease">INFLUENZA</p>
                        <p className="database-patient-symptoms"> Symptoms: fever, cough, fatigue, and muscle pain</p>
                    </div>
                    <p className="database-patients-difference">Both patients have influenza - yet their symptoms differ. That is why we created 40 realistic variations for each disease.</p>
                    <div className="database-patient-container">
                        <h3 className="database-patient-title">PATIENT B</h3>
                        <p className="database-patient-disease">INFLUENZA</p>
                        <p className="database-patient-symptoms">Symptoms: sore throat, headache, chills, and nasal congestion</p>
                    </div>
                </div> 
            </div>
            <div className="database-classification-container">
                <h2 className="database-classification-title">Classification</h2>
                <div className="classification-list">
                    {classificationData.map((item, index) => (
                        <div key={index} className="classification-row">
                            <div className="class-left">
                                <div className="dots-wrapper">
                                    {[...Array(4)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`dot ${i < item.dots ? 'filled' : 'empty'}`}
                                        ></span>
                                    ))}
                                </div>
                                <h3 className="class-title">{item.title}</h3>  
                            </div>
                            <div className="class-right">
                                <p className="class-frequency">{item.frequency}</p>
                                <p className="class-description">{item.description}</p>
                                {item.example && <p className="class-example">{item.example}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="database-diseases-container">
                <h2 className="database-diseases-title">Diseases</h2>
                <div className="our-team-grid">
                    {diseaseBox.map((box, index) => (
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
            <div className="database-disclaimer-container">
                <div className="database-disclaimer-header">
                    <img src="/img/disclaimer.png" alt="" />
                    <h2 className="database-disclaimer-title">Disclaimer</h2>
                </div>
                <div className="database-disclaimer-line"></div>
                <div className="database-disclaimer-description-container">
                    <p className="database-disclaimer-description">This system is intended for educational purposes only and does not replace professional medical diagnosis.Always consult a qualified healthcare professional regarding your symptoms.</p>
                </div>
            </div>
        </main>
    )
}