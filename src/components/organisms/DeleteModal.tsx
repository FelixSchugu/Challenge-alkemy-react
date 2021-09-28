import React from "react";
import CustomModal from "../molecules/CustomModal";
import { Button } from "react-bootstrap";

type DeleteModalTypes = {
  onHide: () => void;
  show: boolean;
  onDeleteHeroe: () => void;
  heroName: string;
};

const DeleteModal: React.FC<DeleteModalTypes> = (props) => {
  return (
    <CustomModal
      show={props.show}
      modaltitle={"Eliminar heroe"}
      modalbody={
        <p>{`¿Está seguro que desea eliminar a ${props.heroName} de tu equipo?`}</p>
      }
      modalfooter={
        <>
          <Button variant="outline-secondary" onClick={props.onHide}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={props.onDeleteHeroe}>
            Eliminar
          </Button>
        </>
      }
      onHide={props.onHide}
    />
  );
};

export default DeleteModal;
