import React from "react";
import Header from './header';
import Footer from './footer';
import './index.css';

function Template(props) {
  return (
    <div>
      <Header />
       <div id="container">
         {props.children}
       </div>
      <Footer />
    </div>
  );
}
export default Template;
