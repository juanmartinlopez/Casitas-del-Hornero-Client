//?---------------------------- IMPORTS --------------------------------
//react
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//actions
import {
  FuncionSelectFilter,
  PostFilters,
} from "../../../redux/Actions/Actions";

//?----------------- COMPONENTE PAGINATION MODERNO ------------------------------------
const Pagination = ({ paginas }) => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const paginado = useSelector((state) => state.Hotels.numPages);
  const { Filters } = useSelector((state) => state);
  const dispatch = useDispatch();

  const totalPages = paginado || paginas || 1;
  const cards = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePage = (event) => {
    const newPage = parseInt(event.target.value);
    changePage(newPage);
  };

  const handlePagePrev = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const handlePageNext = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    setPage(newPage);
    dispatch(PostFilters({ ...Filters, page: newPage }));
    dispatch(FuncionSelectFilter({ ...Filters, page: newPage }));
  };

  // Si solo hay una página, no mostrar paginación
  if (totalPages <= 1) {
    return null;
  }

  // Calcular rango de páginas a mostrar
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* Botón Anterior */}
      <button
        onClick={handlePagePrev}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-md border transition-all duration-300 shadow-sm font-bold text-lg
          ${currentPage === 1
            ? "border-white/20 text-white/40 cursor-not-allowed bg-secondary-color"
            : "border-white/30 text-white hover:border-elegant-gold hover:bg-elegant-gold/20 hover:text-elegant-gold bg-secondary-color/80"}
        `}
        aria-label="Anterior"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-base" />
      </button>

      {/* Números de página */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="flex items-center justify-center w-10 h-10 text-light-gray font-bold"
              >
                ...
              </span>
            );
          }

          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              value={pageNum}
              onClick={handlePage}
              className={`flex items-center justify-center w-10 h-10 rounded-md border font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm
                ${isActive
                  ? "bg-elegant-gold border-elegant-gold text-deep-black shadow-elegant"
                  : "border-white/30 text-white hover:border-elegant-gold hover:bg-elegant-gold/20 hover:text-elegant-gold bg-secondary-color/80"}
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={handlePageNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-md border transition-all duration-300 shadow-sm font-bold text-lg
          ${currentPage === totalPages
            ? "border-white/20 text-white/40 cursor-not-allowed bg-secondary-color"
            : "border-white/30 text-white hover:border-elegant-gold hover:bg-elegant-gold/20 hover:text-elegant-gold bg-secondary-color/80"}
        `}
        aria-label="Siguiente"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-base" />
      </button>

      {/* Información de página */}
      <div className="hidden sm:flex items-center ml-4 text-light-gray text-sm">
        <span>
          Página {currentPage} de {totalPages}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
