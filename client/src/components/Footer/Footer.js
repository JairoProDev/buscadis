// Footer.js

import NavList from "../NavList/NavList";

function Footer({ setFilter }) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return <footer>{isMobile && <NavList setFilter={setFilter} />}</footer>;
}

export default Footer;
