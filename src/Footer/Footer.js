import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1 - About */}
        <div className="footer-column">
          <h3 className="footer-title">Tandartspraktijk Hengelo</h3>
          <p className="footer-description">
            Uw vertrouwde partner voor een gezonde en stralende lach.
            Moderne tandheelkunde met persoonlijke zorg.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-column">
          <h4 className="footer-heading">Snelle Links</h4>
          <ul className="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/over-ons">Over Ons</a></li>
            <li><a href="/behandelingen">Behandelingen</a></li>
            <li><a href="/afspraak">Afspraak Maken</a></li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div className="footer-column">
          <h4 className="footer-heading">Contact</h4>
          <div className="footer-contact">
            <p>📍 Hoofdstraat 123, Hengelo</p>
            <p>📞 074 - 123 45 67</p>
            <p>✉️ info@tandartshengelo.nl</p>
          </div>
        </div>


      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2025 Tandartspraktijk Hengelo. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
};

export default Footer;