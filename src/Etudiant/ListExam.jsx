import { useEffect, useState } from "react";
import SoumetExam from "./SoumetExam";
import API_URL from "../api"
// Composant ExamList
const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${API_URL}/api/exams`);
        const data = await response.json();
        console.log("✅ Examens reçus de l'API:", data);
        setExams(data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des examens", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="exam-list-container">
      <h2 className="exam-list-title">Sujets d'examen</h2>

      {loading ? (
        <p>Chargement des examens...</p>
      ) : exams.length === 0 ? (
        <p>Aucun examen disponible pour le moment.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam.id} className="exam-item">
              <span className="exam-title">{exam.title}</span> - <span className="exam-teacher">{exam.teacher}</span>
              <a href={exam.fileUrl} download className="download-link" target="_blank" rel="noopener noreferrer">
                Télécharger
              </a>
              <SoumetExam examId={exam.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamList;

// CSS dans le même fichier JSX
const styles = `
  /* Conteneur principal de la liste des examens */
  .exam-list-container {
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  /* Titre de la liste des examens */
  .exam-list-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1d4ed8;
    margin-bottom: 1rem;
  }

  /* Style de chaque élément d'examen */
  .exam-item {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  /* Animation au survol des éléments */
  .exam-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Titre de chaque examen */
  .exam-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
  }

  /* Détails supplémentaires comme le nom de l'enseignant */
  .exam-teacher {
    font-size: 1rem;
    color: #555;
    margin-top: 0.5rem;
  }

  /* Lien de téléchargement */
  .download-link {
    margin-top: 1rem;
    font-size: 1rem;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }

  .download-link:hover {
    color: #1d4ed8;
  }

  /* Bouton pour soumettre un examen */
  .submit-button {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-align: center;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-button:hover {
    background-color: #388e3c;
  }
`;

export const addStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

// Appel de la fonction pour ajouter le CSS au chargement du composant
addStyles();
