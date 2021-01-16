import React from "react";
import Header from './header';
import Footer from './footer';

function Template(props) {
  return (
    <div>
      <Header />
       <div id="container" className="container">
         {props.children}
       </div>
      <Footer />
    </div>
  );
}
export default Template;
