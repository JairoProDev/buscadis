// AdList.js
import React, { useState, useEffect, useRef } from 'react'; // Asegúrate de importar useState, useEffect y useRef
import AdCard from "../AdCard/AdCard";
import "./adList.css";
import { Link } from "react-router-dom";

function AdList({ setSelectedAd }) { 
  const [anuncios, setAnuncios] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const lastAdElementRef = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, { threshold: 1 });

  if (lastAdElementRef.current) {
    observer.observe(lastAdElementRef.current);
  }

  return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
  fetch(`/api/anuncios?page=${page}&limit=30`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setAnuncios((prevAds) => {
        const newAds = data.anuncios.filter(
          (ad) => !prevAds.find((prevAd) => prevAd._id === ad._id)
        );
        return [...prevAds, ...newAds];
      });
      setHasMore(data.hasMore);
      console.log('hasMore:', data.hasMore); // Agrega esta línea
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, [page]);

  return (
    <div className="ad-container">
      <ul id="ad-list" style={{ listStyleType: "none" }}>
        {anuncios.map((anuncio, index, arr) => (
          <li key={anuncio._id} ref={index === arr.length - 1 ? lastAdElementRef : null}>
            <Link
              to={`/anuncio/${anuncio._id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                flex: "1 0 calc(20% - 10px)",
                maxWidth: "calc(20% - 10px)",
              }}
            >
              <AdCard
                anuncio={anuncio}
                number={index + 1}
                setSelectedAd={setSelectedAd}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdList;