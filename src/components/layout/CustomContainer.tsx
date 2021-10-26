import React from "react";

const CustomContainer: React.FC = (props) => {
  return (
    <div
      className="d-flex flex-column vw-100 "
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        boxSizing: "border-box",
        height: "100vh",
        // minHeight: "100vh",
        // overflowX: "auto",
      }}
    >
      {props.children}
    </div>
  );
};

export default CustomContainer;
