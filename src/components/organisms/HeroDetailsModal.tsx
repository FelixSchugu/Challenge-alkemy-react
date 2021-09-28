import React from "react";
import { Modal, Container, ListGroup, Button } from "react-bootstrap";
import { HeroType } from "../../views/types";
import CustomModal from "../molecules/CustomModal";

type HeroDetailsModalsTypes = {
  show: boolean;
  onHide: () => void;
  heroData: HeroType;
};

const HeroDetailsModal: React.FC<HeroDetailsModalsTypes> = (props) => {
  const heroData = props.heroData;

  return (
    <CustomModal
      modaltitle={"Detalles del heroe"}
      onHide={props.onHide}
      modalbody={
        <Container className="p-0">
          <Modal.Title>{heroData.name}</Modal.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Peso: {heroData.appearance?.weight[1]}
            </ListGroup.Item>
            <ListGroup.Item>
              Altura: {heroData.appearance?.height[1]}
            </ListGroup.Item>
            <ListGroup.Item>
              Nombre Completo: {heroData.biography?.["full-name"]}
            </ListGroup.Item>
            <ListGroup.Item>
              Alias: {heroData.biography?.aliases?.toString() || ""}
            </ListGroup.Item>

            <ListGroup.Item>
              Color de ojos: {heroData.appearance?.["eye-color"]}
            </ListGroup.Item>

            <ListGroup.Item>
              Color de cabello: {heroData.appearance?.["hair-color"]}
            </ListGroup.Item>

            <ListGroup.Item>
              Lugar de trabajo: {heroData.work?.occupation}
            </ListGroup.Item>
          </ListGroup>
        </Container>
      }
      modalfooter={
        <>
          <Button variant="primary" onClick={props.onHide}>
            Cerrar
          </Button>
        </>
      }
      show={props.show}
    />
  );
};

export default HeroDetailsModal;
