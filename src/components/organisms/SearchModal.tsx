import React, { MutableRefObject } from "react";
import CustomModal from "../molecules/CustomModal";
import FormInput from "../atoms/FormInput";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { HeroType } from "../../views/types";

type SearchModalTypes = {
  openSearchModal: boolean;
  searchHeroRef: MutableRefObject<HTMLInputElement | null>;
  searchingIsLoading: boolean;
  disableSearchBtn: boolean;
  onSearchInputChange: () => void;
  onSearchHero: () => void;
  searchResults: any[];
  searchNoResults: boolean;
  onAddHero: (event: React.MouseEvent<HTMLElement>, hero: HeroType) => void;
  onHide: () => void;
};

const SearchModal: React.FC<SearchModalTypes> = (props) => {
  return (
    <CustomModal
      show={props.openSearchModal}
      modaltitle={"Buscar heroes"}
      modalbody={
        <>
          <FormInput
            inputRef={props.searchHeroRef}
            type="text"
            label="Ingrese el nombre del heroe a buscar"
            onChange={props.onSearchInputChange}
          />
          <Button
            onClick={props.searchingIsLoading ? () => {} : props.onSearchHero}
            variant="primary"
            disabled={props.disableSearchBtn}
          >
            {props.searchingIsLoading ? "Buscando heroes..." : "Buscar"}
          </Button>
          {props.searchResults.length > 0 && (
            <h4 className="mt-2">Resultados: </h4>
          )}
          <Container
            className="mt-2 border"
            style={{ maxHeight: "50vh", overflowX: "auto" }}
          >
            {props.searchNoResults && (
              <div className="w-100">
                <p style={{ margin: "auto", textAlign: "center" }}>
                  No se encontraron resultados...
                </p>
              </div>
            )}
            {props.searchResults.map((result) => (
              <Row
                className="w-100 "
                style={{ height: "50px", margin: "10px 0px" }}
              >
                <Col
                  className="d-flex bg-white flex-row align-items-center justify-content-start shadow-sm"
                  style={{
                    border: "1px solid lightgray",
                  }}
                >
                  <Image
                    thumbnail
                    width="30"
                    src={result.image.url}
                    alt={result.name}
                  />
                  <h5 style={{ margin: "0px 0px 0px 10px" }}>{result.name}</h5>
                  <Button
                    style={{ marginLeft: "auto" }}
                    variant="secondary"
                    onClick={(event) => props.onAddHero(event, result)}
                  >
                    Agregar al equipo
                  </Button>
                </Col>
              </Row>
            ))}
          </Container>
          <p className="mt-2" >
            *Los heroes que no tengan un bando o alineación definidas tendrán
            la alineación buena por defecto. <br></br>
            *Los heroes que no tengan stats (null) se le les asignará el valor 50.
          </p>
        </>
      }
      modalfooter={
        <Button variant="outline-primary" onClick={props.onHide}>
          Salir
        </Button>
      }
      onHide={props.onHide}
    />
  );
};

export default SearchModal;
