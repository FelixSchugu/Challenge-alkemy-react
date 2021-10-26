import { Button } from "react-bootstrap";
import React from "react";
import CustomModal from "../molecules/CustomModal";

type LogoutModalTypes = {
  onHide: () => void;
  show: boolean;
  onLogout: () => void;
};

const LogoutModal: React.FC<LogoutModalTypes> = (props) => {
  return (
    <CustomModal
      modaltitle="Cerrar sesión"
      show={props.show}
      onHide={props.onHide}
      modalbody={<p>{`¿Está seguro que desea cerrar sesión?`}</p>}
      modalfooter={
        <>
          <Button variant="outline-secondary" onClick={props.onHide}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={props.onLogout}>
            Cerrar sesión
          </Button>
        </>
      }
    />
  );
};

export default LogoutModal;
