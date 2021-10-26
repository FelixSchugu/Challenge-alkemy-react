import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import RootContainer from "../components/layout/CustomContainer";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { HeroType } from "./types";

const HeroDetails = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation<any>();

  const [heroData, setHeroData] = useState<HeroType>({});
  const [hasHeroData, setHasHeroData] = useState(false);

  useEffect(() => {
    if (location?.state?.heroe) {
      setHeroData(location?.state?.heroe);
      setHasHeroData(true);
    }
  }, [location]);

  return (
    <RootContainer>
      <Container
        className="w-100 h-auto p-4 bg-white shadow-sm d-grid"
        style={{
          margin: "auto",
          border: "1px solid lightgray",
          maxWidth: "550px",
        }}
      >
        <h2 className="mx-auto">Detalles</h2>
        {hasHeroData && (
          <Container className="p-0">
            <h2>{heroData.name}</h2>
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
        )}

        {!hasHeroData && (
          <Container className="d-flex">
            <p>
              No se encontraron los detalles de este heroe. Por favor vaya a
              home e inténtelo de nuevo
            </p>
          </Container>
        )}
        <Container>
          <Row>
            <Col>
              <Button
                onClick={() =>
                  history.replace({ pathname: "/home", state: {} })
                }
                variant="primary"
              >
                Volver a home
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </RootContainer>
  );
};

export default HeroDetails;
