import React from 'react';
import './Home.css';
// Import your images here
// import heroImage from './images/hero.png';
// import userIcon from './images/user-icon.png';
// import locationIcon from './images/location-icon.png';
// import toothIcon from './images/tooth-icon.png';
// import calendarIcon from './images/calendar-icon.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            De tandarts die je lach weer laat stralen
          </h1>
          <p className="hero-subtitle">
            Registreer en maak snel en handig een afspraak met jullie tand
          </p>
          <button className="cta-button">Registreer nu</button>
        </div>
      </section>

      {/* Description Section */}
      <section className="description-section">
        <p className="description-text">
          Bij Tandartspraktijk Hengelo combineren we moderne tandheelkunde met persoonlijke zorg. Van een eenvoudige controle tot gespecialiseerde behandelingen – jouw mondgezondheid staat bij ons altijd voorop.
        </p>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <h2 className="section-title">Waarom ons?</h2>
        <div className="statistics-container">
          <div className="stat-card">
            <img src="" alt="users" className="stat-icon" />
            <h3 className="stat-number">400+</h3>
            <p className="stat-label">Tevreden patiënten</p>
          </div>
          
          <div className="stat-card">
            <img src="" alt="location" className="stat-icon" />
            <h3 className="stat-number">3</h3>
            <p className="stat-label">Vestigingen</p>
          </div>
          
          <div className="stat-card">
            <img src="" alt="tooth" className="stat-icon" />
            <h3 className="stat-number">7</h3>
            <p className="stat-label">Moderne Tandartsen</p>
          </div>
          
          <div className="stat-card">
            <img src="" alt="calendar" className="stat-icon" />
            <h3 className="stat-number">4.8/5</h3>
            <p className="stat-label">Beoordeling</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2 className="section-title">Wat onze patiënten zeggen</h2>
        <div className="reviews-container">
          <div className="review-card">
            <div className="review-header">
              <span className="reviewer-name">Jaymiro van der L.</span>
              <div className="rating">★★★★★</div>
            </div>
            <p className="review-text">
              De tandarts was zeer professioneel en vriendelijk. Ik voelde me op mijn gemak tijdens de hele behandeling.
            </p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <span className="reviewer-name">Sandra ter H.</span>
              <div className="rating">★★★★★</div>
            </div>
            <p className="review-text">
              Uitstekende service! Het personeel was zeer behulpzaam en de behandeling was pijnloos en snel.
            </p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <span className="reviewer-name">Jan Jansen</span>
              <div className="rating">★★★★★</div>
            </div>
            <p className="review-text">
              Ik ben zeer tevreden met de resultaten van mijn behandeling. De tandarts nam de tijd om alles uit te leggen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;