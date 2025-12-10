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
          <li>Lokalizacja</li>
          <li>Numer</li>
          <li>Mail</li>
       </ul>
      </div>
    </footer>
  )
}