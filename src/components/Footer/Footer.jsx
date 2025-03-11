//?---------------------------- IMPORTS --------------------------------
import { useSelector } from "react-redux";
import styleLight from "./Footer.module.css";
import styleDark from "./FooterDark.module.css";


//?----------------- COMPONENTE FOOTER ------------------------------------
const Footer = () => {
  const theme = useSelector((state) => state.theme);
  const style = theme === "light"?styleLight:styleDark;
  

  return (
    <div className={style.footer}>
      <p> 2023 CasitasDelHornero </p>
    </div>
  );
};

export default Footer;
