import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src="/img/logo_footer.png" alt="Footer logo" className='footer-logo'/>
      </div>
      <div className='footer-line'></div>
      <div className='footer-bottom'>
        <ul className="footer-links">
          <li className="footer-location">
            <img src="/img/foot-lokalizacja.png" alt="Location" />
            <span>Wydział Biologii UAM</span>
          </li>
          <li className="footer-phone">
            <img src="/img/foot-telefon.png" alt="Phone number" />
            <span>+48 123 456 789</span>  
          </li>
          <li className="footer-email">
            <img src="/img/foot-mail.png" alt="Email" />
            <span>sympthosium@sympthosium.pl</span>
          </li>
       </ul>
      </div>
    </footer>
  )
}