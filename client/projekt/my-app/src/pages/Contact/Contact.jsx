import './Contact.css';

export default function Contact() {
    const ourTeamBox = [
        {
            icon: <img src="/img/contact_ludzik.png" alt="Kuba Kryłowicz" />,
            title: "KUBA KRYŁOWICZ",
            description: "Backend"
        },
        {
            icon: <img src="/img/contact_ludzik.png" alt="Kacper Janczak" />,
            title: "KACPER JANCZAK",
            description: "Frontend"
        },
        {
            icon: <img src="/img/contact_ludzik.png" alt="Kacper Dreze" />,
            title: "KACPER DREZE",
            description: "Frontend"
        },
        {
            icon: <img src="/img/contact_ludzik.png" alt="Anna Kowalska" />,
            title: "ANNA KOWALSKA",
            description: "Frontend"
        }
    ];
    return (
        <main className="contact-content">
            <div className="contact-card">
                <div className="contact-page-container">
                    <img className='Rectangle' src="/img/Rectangle 54.png" alt="Decorative rectangle"/>
                    <div className="contact-page-text">
                        <h1 className="contact-subtitle">
                            <span>We would love to <br/> hear from <br/> you!</span>
                        </h1>
                        <p className="contact-description">Whether you have a question about the Sympthosium, need more details about registration, or are interested in partnering with us, we're here to help. Reach out to our team and we'll get back to you as soon as possible. Your ideas, feedback, and inquiries are always welcome.</p>
                    </div>
                    <div className="contact-page-image">
                        <img src="/img/contact_page.png" alt="Contact us"/>
                    </div>
                </div>
            </div>
            <div className="our-team">
                <div>
                    <h2 className="our-team-title">Our Team</h2>
                    <p className="our-team-subtitle">Meet the team that turned Sympthosium into reality.</p>
                </div>
                <div className="our-team-grid">
                    {ourTeamBox.map((box, index) => (
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
        </main>
    )
}