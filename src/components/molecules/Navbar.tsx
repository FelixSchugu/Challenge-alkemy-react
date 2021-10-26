import Button from "react-bootstrap/Button";
import React from "react";

import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as LogoutIcon } from "bootstrap-icons/icons/box-arrow-right.svg";

import { DropdownButton, Dropdown } from "react-bootstrap";

type NavbarTypes = {
  onOpenSearchModal: () => void;
  onLogout: () => void;
  windowSize: { width: number | string; height: number | string };
  onDropDownClick: (key: any) => void;
};

const CustomNavbar: React.FC<NavbarTypes> = (props) => {
  return (
    <nav
      className="d-flex flex-column p-2 justify-content-between align-items-center bg-white w-100 shadow-sm"
      style={{
        boxSizing: "border-box",
        borderBottom: "1px solid lightgray",
        height: "60px",
        position: "relative",
        top: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      <div
        className="w-100 d-flex flex-row justify-content-between align-items-center"
        style={{ height: "100%" }}
      >
        {props.windowSize.width < 768 && (
          <div className="d-flex flex-row align-items-center justify-content-center">
            <DropdownButton
              onSelect={props.onDropDownClick}
              title={"Menu"}
              style={{ marginRight: "10px" }}
            >
              <Dropdown.Item eventKey="1">Estadísticas generales</Dropdown.Item>
              <Dropdown.Item eventKey="2">Buscar heroe</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3">Cerrar sesión</Dropdown.Item>
            </DropdownButton>  

            <h2 style={{ margin: 0 }}>Mi equipo</h2>
          </div>
        )}
        {props?.windowSize?.width > 768 && (
          <>
            <Button
              className="sm-h6 text-white"
              onClick={props.onOpenSearchModal}
              variant="primary"
            >
              <SearchIcon width="40px" height="30px" />
            </Button>

            <h2>Mi equipo</h2>

            <Button onClick={props.onLogout} variant="outline-primary">
              <LogoutIcon width="40px" height="30px" />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
