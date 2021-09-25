import { Button, Container } from "react-bootstrap";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { PowerStatsType } from "../../views/types";

type CardType = {
  imageSrc?: string;
  heroName?: string;
  powerstats?: PowerStatsType;
  onViewDetails: () => void;
  onDeleteHero: () => void;
};

const HeroCard: React.FC<CardType> = (props) => {
  const powerstats = props.powerstats;

  return (
    <Card className="shadow-sm" style={{ width: "100%", margin: "10px" }}>
      <Card.Img height="300px" variant="top" src={props.imageSrc} />
      <Card.Body>
        <Card.Title>{props.heroName}</Card.Title>

        <ListGroup variant="flush" style={{ fontSize: "14px" }}>
          <ListGroup.Item>
            Inteligencia: {powerstats?.intelligence}
          </ListGroup.Item>
          <ListGroup.Item>Fuerza: {powerstats?.strength}</ListGroup.Item>
          <ListGroup.Item>Velocidad: {powerstats?.speed}</ListGroup.Item>
          <ListGroup.Item>Durabilidad: {powerstats?.durability}</ListGroup.Item>
          <ListGroup.Item>Poder: {powerstats?.power}</ListGroup.Item>
          <ListGroup.Item>Combate: {powerstats?.combat}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Container className="w-100 p-2 d-flex flex-row align-items-center justify-content-between">
        <Button variant="outline-primary" onClick={props.onViewDetails}>
          Detalles
        </Button>
        <Button variant="danger" onClick={props.onDeleteHero}>
          Eliminar{" "}
        </Button>
      </Container>
    </Card>
  );
};

export default HeroCard;
