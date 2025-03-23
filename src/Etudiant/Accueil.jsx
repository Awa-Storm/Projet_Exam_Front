import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Accueil() {

  const locate = useLocation();
  const { user } = locate.state || {};
  const Etudiant = user;
  console.log(Etudiant);

  const [annonces, setAnnonces] = useState([
    "Les examens de fin de semestre commencent le 15 juin.",
    "N'oubliez pas de soumettre vos réponses avant la date limite !",
    "Les résultats des examens seront publiés le 25 juin."
  ]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800">Bienvenue, {Etudiant.prenom} ! 👋</h2>
      <p className="text-gray-600 mt-2">Voici les dernières annonces :</p>
      <ul className="mt-4 space-y-2">
        {annonces.map((annonce, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-md text-gray-700">
            {annonce}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Accueil;

const styles = {
  container: {
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "1.5rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2d3748",
  },
  paragraph: {
    color: "#4a5568",
    marginTop: "0.5rem",
  },
  list: {
    marginTop: "1rem",
    display: "grid",
    gap: "0.5rem",
  },
  listItem: {
    backgroundColor: "#f7fafc",
    padding: "1rem",
    borderRadius: "8px",
    color: "#2d3748",
  },
};
