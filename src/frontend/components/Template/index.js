import React from "react";
import Header from './Header';
import Footer from './Footer';
import './index.css';

function Template(props) {
  return (
    <>
      <Header />
      <div className="main-container">
        {props.children}
      </div>
      <Footer />
    </>
  );
}
export default Template;
