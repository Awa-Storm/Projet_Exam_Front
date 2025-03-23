import React from 'react';
import { Link } from 'react-router-dom';
import Accueil from './Accueil';

function Navigation({ role }) {
  const navbarStyle = {
    backgroundColor: '#1E40AF', /* Bleu */
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '16px',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
    transition: 'color 0.3s',
  };

  const navLinkHoverStyle = {
    color: '#E5E7EB', /* Gris clair lors du survol */
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle}>Plateforme Examens</h1>
      <div style={navLinksStyle}>
      <Link to="#" style={navLinkStyle} onClick={() => setSelectedSection("Notifications")} onMouseEnter={(e) => (e.target.style.color = navLinkHoverStyle.color)}
        onMouseLeave={(e) => (e.target.style.color = "")}>  Tableau de bord  </Link>
        {role === 'enseignant' && <Link to="/stats" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = ''}>Statistiques</Link>}
        <Link to="/" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = ''}>Déconnexion</Link>
      </div>
    </nav>
  );
}

export default Navigation;
