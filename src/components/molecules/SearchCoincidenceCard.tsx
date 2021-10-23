import React from "react";
import { Card, Image, Button } from "react-bootstrap";

type SearchCardTypes = {
  imgSrc?: string;
  heroName?: string;
  onAdd: (event: any) => void;
};

const SearchCoincidenceCard: React.FC<SearchCardTypes> = (props) => {
  return (
    <Card className="shadow-sm" style={{ height: "250px", margin: "10px" }}>
      <Image
        className="mx-auto"
        thumbnail
        width="70"
        height="100px"
        src={props.imgSrc}
        alt={props.heroName}
      />
      <Card.Body>
        <Card.Title>{props.heroName}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button
          style={{ marginLeft: "auto" }}
          variant="secondary"
          onClick={props.onAdd}
        >
          Agregar
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default SearchCoincidenceCard;
