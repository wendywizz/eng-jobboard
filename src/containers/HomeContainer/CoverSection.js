import React from "react"
import { Container } from "reactstrap"
import HomeSearchBox from "./HomeSearchBox"

import "./index.css";

function CoverSection() {
  return (
    <div className="cover-container">
      <div className="image">        
        <HomeSearchBox />
      </div>
    </div>
  );
}
export default CoverSection;