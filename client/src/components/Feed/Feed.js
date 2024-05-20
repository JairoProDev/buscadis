// Feed.js
import React from 'react';
import NavList from '../NavList/NavList';
import AdList from '../AdList/AdList';
import './Feed.css';

function Feed({ anuncios, setSelectedAd, error, isLoading, loader, setFilter, toggleForm }) {

    return (
    <div className="feed">
      <NavList
        className="nav-list nav-list-top"
        toggleForm={toggleForm}
        setFilter={setFilter}
      />
      <AdList
        anuncios={anuncios}
        setSelectedAd={setSelectedAd}
        error={error}
        isLoading={isLoading}
        loader={loader}
      />
      {/* <NavList
        className="nav-list nav-list-bottom"
        toggleForm={toggleForm}
        setFilter={setFilter}
      /> */}
      {error && <div className="error">{error}</div>}
            {isLoading && (
              <div ref={loader}>
                Cargando anuncios publicados en BuscAdis.com...
              </div>
            )}
    </div>
  );
}

export default Feed;