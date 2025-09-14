import React from 'react';
import './Home.css';



import ToothIcon from '../../Media/Icons/ToothIcon.svg';
import PatiëntsIcon from '../../Media/Icons/PatiëntsIcon.svg';
import LocationIcon from '../../Media/Icons/LocationIcon.svg';
import ReviewIcon from '../../Media/Icons/ReviewIcon.svg';

import heroImg from '../../Media/Images/homeDentistBG.png';

const Home = () => {
    return (
        <div className="home-container">
            <div
                className="hero-section"
                style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">
                        De tandarts die je lach weer laat stralen
                    </h1>
                    <p className="hero-subtitle">
                        Registreer en maak snel en handig een afspraak met jullie tand
                    </p>
                    <button className="cta-button">Registreer nu</button>
                </div>
            </div>

            {/* Description Section */}
            <div className="description-section">
                <p className="description-text">
                    Bij Tandartspraktijk Hengelo combineren we moderne tandheelkunde met persoonlijke zorg. Van een eenvoudige controle tot gespecialiseerde behandelingen – jouw mondgezondheid staat bij ons altijd voorop.
                </p>
            </div>

            {/* Statistics Section */}
            <div className="statistics-section">
                <h1 className="section-title">Waarom ons?</h1>
                <div className="statistics-container">
                    <div className="stat-card">
                        <img src={PatiëntsIcon} alt="users" className="stat-icon" />
                        <h3 className="stat-number">400+</h3>
                        <p className="stat-label">Tevreden patiënten</p>
                    </div>

                    <div className="stat-card">
                        <img src={LocationIcon} alt="location" className="stat-icon" />
                        <h3 className="stat-number">3</h3>
                        <p className="stat-label">Vestigingen</p>
                    </div>

                    <div className="stat-card">
                        <img src={ToothIcon} alt="tooth" className="stat-icon" />
                        <h3 className="stat-number">7</h3>
                        <p className="stat-label">Moderne Tandartsen</p>
                    </div>

                    <div className="stat-card">
                        <img src={ReviewIcon} alt="review" className="stat-icon" />
                        <h3 className="stat-number">4.8/5</h3>
                        <p className="stat-label">Beoordeling</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h2 className="section-title">Wat onze patiënten zeggen</h2>
                <div className="reviews-container">
                    <div className="review-card">
                        <div className="review-header">
                            <span className="reviewer-name">Jaylano van der Veen</span>
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
                            <span className="reviewer-name">Emma Jansen</span>
                            <div className="rating">★★★★★</div>
                        </div>
                        <p className="review-text">
                            Ik ben zeer tevreden met de resultaten van mijn behandeling. De tandarts nam de tijd om alles uit te leggen.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;