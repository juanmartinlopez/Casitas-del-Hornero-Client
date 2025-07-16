//?---------------------------- IMPORTS --------------------------------

//?----------------- COMPONENTE FOOTER ------------------------------------
const Footer = () => {
  return (
    <footer className="bg-primary-color text-white py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm">
        <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} CasitasDelHornero. Todos los derechos reservados.</p>
        <div className="flex space-x-4">
          <a href="/aboutus" className="hover:underline hover:text-elegant-gold transition-colors">Sobre el proyecto</a>
          <a href="/contacto" className="hover:underline hover:text-elegant-gold transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
