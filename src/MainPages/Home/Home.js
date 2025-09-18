import React from 'react';
import './Home.css';

import ToothIcon from '../../Media/Icons/ToothIcon.svg'
import PatientsIcon from '../../Media/Icons/PatientsIcon.svg'
import LocationIcon from '../../Media/Icons/LocationIcon.svg'
import ReviewIcon from '../../Media/Icons/ReviewIcon.svg'
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        De tandarts die je lach<br />
                        weer laat stralen
                    </h1>
                    <p className="hero-subtitle">
                        Registreer en maak snel en handig<br />
                        een afspraak blah blah blah
                    </p>
                    <button className="hero-button register-button" onClick={() => { navigate('/registreren') }}>Registreer nu</button>
                    <button className="hero-button login-button" onClick={() => { navigate('/inloggen') }}>Login</button>
                </div>
            </div>

            {/* Description Section */}
            <div className="description-section">
                <div className="description-content">
                    <h2 className="description-title">Moderne tandheel kunde met<br />persoonlijke zorg</h2>
                    <p className="description-text">
                        Bij Tandartspraktijk Hengelo combineren we moderne<br />
                        tandheelkunde met persoonlijke zorg. Van een<br />
                        eenvoudige controle tot gespecialiseerde<br />
                        behandelingen — jouw mondgezondheid staat bij ons<br />
                        altijd voorop.
                    </p>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="statistics-section">
                <h2 className="stats-title">Waarom kiezen voor ons?</h2>
                <div className="purple-line"></div>
                <div className="statistics-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <img src={PatientsIcon} alt="Patiënten" className='stat-icon-img' />
                        </div>
                        <h3 className="stat-number">400+</h3>
                        <p className="stat-label">Tevreden patiënten</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <img src={LocationIcon} alt="Locatie" className='stat-icon-img' />
                        </div>
                        <h3 className="stat-number">2</h3>
                        <p className="stat-label">Vestigingen</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <img src={ToothIcon} alt="Tandarts" className='stat-icon-img' />
                        </div>
                        <h3 className="stat-number">21</h3>
                        <p className="stat-label">Ervaren tandartsen</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <img src={ReviewIcon} alt="Beoordeling" className='stat-icon-img' />
                        </div>
                        <h3 className="stat-number">4.8 / 5</h3>
                        <p className="stat-label">Gemiddelde beoordeling</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <div className="reviews-content">
                    <h2 className="reviews-title">Wat onze patiënten zeggen</h2>

                    <div className="reviews-grid">
                        <div className="review-card">
                            <div className="review-stars">★★★★★</div>
                            <div className="reviewer-name">Jaylano van der Veen</div>
                            <p className="review-text">
                                "Ik voelde me direct op mijn gemak,<br />
                                de tandarts heeft alles rustig uit en er<br />
                                wordt goed naar je geluisterd.<br />
                                Echt een aanrader!"
                            </p>
                        </div>

                        <div className="review-card">
                            <div className="review-stars">★★★★★</div>
                            <div className="reviewer-name">Sander ten Hof</div>
                            <p className="review-text">
                                "Professioneel, vriendelijk en altijd op<br />
                                tijd. Mijn gezin gaat al nog veel jaar goed<br />
                                verzorgd geworden"
                            </p>
                        </div>

                        <div className="review-card">
                            <div className="review-stars">★★★★★</div>
                            <div className="reviewer-name">Isa Jansen</div>
                            <p className="review-text">
                                "Goede service en fijne sfeer. De<br />
                                mondhygiëne doet de tijd voor je om<br />
                                vliegen en het voelt fijns"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;