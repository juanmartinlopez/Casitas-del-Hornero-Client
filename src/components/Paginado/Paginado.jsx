//?---------------------------- IMPORTS --------------------------------
//react
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//css
// import style from "./Paginado.module.css";
import styleLight from "./Paginado.module.css";
import styleDark from"./PaginadoDark.module.css";

//actions
import { FuncionSelectFilter, PostFilters } from "../../redux/Actions/Actions";

//?----------------- COMPONENTE PAGINADO ------------------------------------
const Paginado = ({ paginas }) => {
  const [page, setPage] = useState(paginas);
  const [currentPage, setCurrentPage] = useState(1);
  const paginado = useSelector((state) => state.Hotels.numPages);
  const { Filters } = useSelector((state) => state);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const style = theme === "light"?styleLight:styleDark;

  const cards = Array.from({ length: paginado }, (_, i) => i + 1);

  const handlePage = (event) => {
    const newPage = event.target.value * 1;
    setCurrentPage(newPage);
    setPage(newPage);
    dispatch(PostFilters({ ...Filters, page: newPage }));
    dispatch(FuncionSelectFilter({ ...Filters, page: newPage }));
  };

  const handlePagePrev = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    setPage(newPage);
    dispatch(PostFilters({ ...Filters, page: newPage }));
    dispatch(FuncionSelectFilter({ ...Filters, page: newPage }));
  };

  const handlePageNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    setPage(newPage);
    dispatch(PostFilters({ ...Filters, page: newPage }));
    dispatch(FuncionSelectFilter({ ...Filters, page: newPage }));
  };

  return (
    <div>
      <div className={style.pagination}>
        {page > 1 && <button onClick={handlePagePrev}>&lArr;</button>}
        {cards.map((value, i) => (
          <button
            value={value}
            onClick={handlePage}
            className={currentPage === value ? style.active : style.nonactive} // le cambie paginas siquiente pagina === value.
            key={i}
          >
            {value}
          </button>
        ))}
        {page < cards.length && (
          <button onClick={handlePageNext}>&rArr;</button>
        )}
      </div>
    </div>
  );
};

export default Paginado;
