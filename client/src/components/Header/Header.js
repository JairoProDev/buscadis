import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import useScroll from "../../hooks/useScroll";

function Header({ setFilter, toggleSidebar, openLoginForm, openRegisterForm, updateSearchTerm, searchInputRef }) {
  const isHidden = useScroll();

  const [visitorCount, setVisitorCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  const totalVisitors = visitorCount + postCount;

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const cachedVisitorCount = sessionStorage.getItem('visitorCount');
        if (cachedVisitorCount) {
          setVisitorCount(JSON.parse(cachedVisitorCount));
        } else {
          const response = await fetch('/visitorCount');
          const data = await response.json();
          setVisitorCount(data.visitorCount);
          sessionStorage.setItem('visitorCount', JSON.stringify(data.visitorCount));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchPostCount = async () => {
      try {
        const cachedPostCount = sessionStorage.getItem('postCount');
        if (cachedPostCount) {
          setPostCount(JSON.parse(cachedPostCount));
        } else {
          const response = await fetch('/postCount');
          const data = await response.json();
          setPostCount(data.postCount);
          sessionStorage.setItem('postCount', JSON.stringify(data.postCount));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchVisitorCount();
    fetchPostCount();
  }, []);

  return (
    <header className={`header ${isHidden ? "header-hidden" : ""}`}>
      <div className="header-top">
        <Link to="/" className="header-left">
          <img src="../../images/logo.ico" alt="Logo" className="logo" />
          <h1 className="header-title">BuscAdis</h1>
        </Link>
        <div className="counters">
          <p className="advertisers"><span className="icon">📢</span> <span className="text">Avisos:</span> <span className="number">{postCount}</span></p>
          <p className="visitors"><span className="icon">🔎</span> <span className="text">Visitas:</span> <span className="number">{totalVisitors}</span></p>
        </div>
      </div>
    </header>
  );
}

export default Header;