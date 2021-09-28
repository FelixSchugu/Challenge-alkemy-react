import React from "react";

const Styles = () => {
  return (
    <style type="text/css">
      {`
    .btn-primary {
      background-color: #3f50b5;
      color: white;
      border: none;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .btn-secondary {
        background-color: #005cac;
        color: white;
        border: none;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .btn-secondary:hover, .btn-secondary:focus, .btn-secondary:active, .btn-secondary.active, .open>.dropdown-toggle.btn-primary {
      color: #fff;
      background-color: #285e8e; 
  }
    `}
    </style>
  );
};

export default Styles;
