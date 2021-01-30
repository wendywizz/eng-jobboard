import React from "react";
import Header from './header';
import Footer from './footer';
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
