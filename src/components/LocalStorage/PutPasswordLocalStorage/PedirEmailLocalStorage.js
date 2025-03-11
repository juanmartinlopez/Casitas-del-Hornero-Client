const PedirEmailLocalStorage = () => {
  const emailUsuario = localStorage.getItem("EmailUsuario");

  console.log(emailUsuario);

  if (emailUsuario) {
    return emailUsuario;
  } else {
    // Valor predeterminado o puedes devolver otro valor que consideres apropiado
  }
};

export default PedirEmailLocalStorage;
