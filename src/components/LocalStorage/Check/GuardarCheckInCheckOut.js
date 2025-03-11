const GuardarCheckInCheckOut = (ObjetoCheck) => {
  

  return localStorage.setItem("Check", JSON.stringify(ObjetoCheck));
};

export default GuardarCheckInCheckOut;
