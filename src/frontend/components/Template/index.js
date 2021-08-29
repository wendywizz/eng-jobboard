import React from "react";
import { DefaultHeader, NavHeader } from "./Header";
import Footer from "./Footer";
import "./index.css";

function Template({
  headerType = "default",
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
    }
  };
  const renderFooter = () => {
    return <Footer />;
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
