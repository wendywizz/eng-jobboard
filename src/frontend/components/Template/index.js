import React from "react";
import { DefaultHeader, NavHeader } from "./Header";
import Footer from "./Footer";
import "./index.css";

function Template({
  headerType = "default",
  footerType ="default",
  showHeader = true,
  showFooter = true,
  children,
}) {
  const renderHeader = () => {
    switch (headerType) {
      case "default":
      default:
        return <DefaultHeader />;
      case "nav":
        return <NavHeader />;
      case "no-header":
        return <div />
    }
  };
  const renderFooter = () => {
    switch (footerType) {
      case "default": default:
        return <Footer />;
      case "no-footer":
        return <div />
    }
    
  };
  return (
    <>
      {showHeader && renderHeader()}
      <div className="main-container">{children}</div>
      {showFooter && renderFooter()}
    </>
  );
}
export default Template;
