import React from "react"
import HomeSearchBox from "../HomeSearchBox"
import "./index.css";

function SectionCover() {
  return (
    <div className="cover-container">
      <div className="image">      
        <h1 className="app-title">ค้นหางานประจำ งานพาร์ทไทม์ ฝึกงาน</h1>  
        <p className="app-desc">สำหรับศิษย์เก่าและนักศึกษาวิศวฯ ดงยาง</p>
        <HomeSearchBox />
      </div>
    </div>
  );
}
export default SectionCover;