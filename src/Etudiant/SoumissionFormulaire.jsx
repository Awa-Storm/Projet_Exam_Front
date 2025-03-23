import API_URL from "../api";
export const uploadExamResponse = async (file, examId,etuId) => {
    const formData = new FormData();
    formData.append("copie", file);  
    formData.append("idExamen", examId);
    formData.append("idEtudiant", etuId);
  
    console.log("📝 Données envoyées :", formData.get("copie"), formData.get("idExamen"));
  
    const response = await fetch(`${API_URL}/api/soumettre`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Échec de l'envoi de la copie.");
    }
  
    return await response.json();
  };
  