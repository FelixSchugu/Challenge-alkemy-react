import Button from "react-bootstrap/Button";
import React from "react";

type NavbarTypes = {
  onOpenSearchModal: () => void;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarTypes> = (props) => {
  return (
    <nav
      className="d-flex flex-row p-2 justify-content-between align-items-center bg-white w-100 shadow-sm"
      style={{
        height: "80px",
        boxSizing: "border-box",
        borderBottom: "1px solid lightgray",
      }}
    >
      <Button onClick={props.onOpenSearchModal} variant="primary">
        Buscar heroe
      </Button>

      <h1>Mi equipo</h1>

      <Button onClick={props.onLogout} variant="outline-primary">
        Cerrar sesión
      </Button>
    </nav>
  );
};

export default Navbar;
