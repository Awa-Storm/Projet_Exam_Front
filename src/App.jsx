
//import { fetchData } from './api';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RoleSelection from "./Connexion/RoleSelection";
import Accueil from "./Connexion/Accueil";
import Etudiant from "./Connexion/Etudiant";
//import Etudiant from "./Connexion/Tableau";

import Enseignant from "./Connexion/Enseignant";
import Connexion from "./Connexion/Connexion";
import Inscription from "./Connexion/Inscription";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedRole, setStoredRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredRole(localStorage.getItem('role'));
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Composant pour les routes protégées
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (storedRole !== allowedRole) {
      return <Navigate to="/role-selection" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Accueil />} /> 
      {/* <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> */}
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />

      {/* Routes protégées */}
      <Route
        path="/etudiant"
        element={<Etudiant />}
      />
      <Route
        path="/enseignant"
        element={<Enseignant /> }
      />
    </Routes>
  );
}

export default App;