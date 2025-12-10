import './MainContent.css';

export default function MainContent() {
  return (
      <main className='app-content'>
        <div className='Main-text-container'>
          <div className='Main-text'>We bring AI to</div>
          <div className='Main-caps'>HEALTHCARE.</div>
          <p className='Text'>Instant, AI-powered symptom analysis to guide you toward the right diagnosis.</p>
        </div>
        <div className='Main-image-container'>
          <img src="/img/dna.png" alt="DNA image" className='Main-image'/>
        </div>
      </main>
  )
}
