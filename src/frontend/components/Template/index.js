import React, { useState, useEffect } from "react";
import Header from './Header';
import HeaderNavSticky from "./HeaderNavSticky"
import Footer from './Footer';
import './index.css';

const STICKY_NAV_POS = 150;

function Template(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      {
        scrollPosition >= STICKY_NAV_POS && <HeaderNavSticky />
      }
      <div className="main-container">
        {props.children}
      </div>
      <Footer />
    </>
  );
}
export default Template;
