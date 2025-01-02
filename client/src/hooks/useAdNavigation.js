import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function useAdNavigation(adisos) {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentIndex = adisos.findIndex((adiso) => adiso._id === id);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentIndex > 0) {
        navigate(
          `/${adisos[currentIndex - 1].adType}/${
            adisos[currentIndex - 1].category
          }/${adisos[currentIndex - 1].subcategory}/${
            adisos[currentIndex - 1]._id
          }`
        );
      } else if (
        event.key === "ArrowRight" &&
        currentIndex < adisos.length - 1
      ) {
        navigate(
          `/${adisos[currentIndex + 1].adType}/${
            adisos[currentIndex + 1].category
          }/${adisos[currentIndex + 1].subcategory}/${
            adisos[currentIndex + 1]._id
          }`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, adisos, navigate]);
}

export default useAdNavigation;
