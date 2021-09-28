import React from "react";
import CustomModal from "../molecules/CustomModal";
import FormInput from "../atoms/FormInput";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { HeroType } from "../../views/types";
import { Form, Formik } from "formik";
import { searchValidationSchema } from "../../helpers/formValidations/searchValidations";

type SearchModalTypes = {
  openSearchModal: boolean;
  searchingIsLoading: boolean;
  onSearchHero: (values: { searchValue: string }) => void;
  searchResults: any[];
  searchNoResults: boolean;
  onAddHero: (event: React.MouseEvent<HTMLElement>, hero: HeroType) => void;
  onHide: () => void;
  addError: { message: string; error: boolean };
};

const SearchModal: React.FC<SearchModalTypes> = (props) => {
  return (
    <CustomModal
      show={props.openSearchModal}
      modaltitle={"Buscar heroes"}
      modalbody={
        <>
          <Formik
            initialValues={{ searchValue: "" }}
            onSubmit={props.searchingIsLoading ? () => {} : props.onSearchHero}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={searchValidationSchema}
            render={({ handleChange, values, errors, touched }) => (
              <Form>
                <FormInput
                  type="text"
                  name="searchValue"
                  label="Ingrese el nombre del heroe a buscar"
                  onChange={handleChange}
                  value={values.searchValue}
                  isInvalid={!!errors.searchValue && !!touched.searchValue}
                  errorText={errors.searchValue}
                />
                <Button type="submit" variant="primary">
                  {props.searchingIsLoading ? "Buscando heroes..." : "Buscar"}
                </Button>
              </Form>
            )}
          />
          {props.searchResults.length > 0 && (
            <h4 className="mt-2">Resultados: </h4>
          )}
          <Container
            className="mt-2 border"
            style={{ maxHeight: "45vh", overflowX: "auto" }}
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
                key={`result${result.id}${result.name}`}
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
                    Agregar
                  </Button>
                </Col>
              </Row>
            ))}
          </Container>
          <p className="mt-2">
            *Los heroes que no tengan un bando o alineación definidas tendrán la
            alineación buena por defecto. <br />
            *Los heroes que no tengan stats (null) se le les asignará un valor
            aleatorio entre 20 y 100. <br />
            *Los heroes que no tengan un peso y altura definido de les asignará,
            el valor aleatorio de entre 50kg y 80kg para el peso y entre 150cm y
            190 cm para la altura.
          </p>
          {props.addError.error && (
            <p className="text-danger">{props.addError.message}</p>
          )}

          {props.addError.error && props.addError.message === "CORS" && (
            <p className="text-danger">
              Error de red, si es debido al cors puede solucionarlo bajando esta
              extension. <br />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino"
              >
                Cors Unblock (Google Chrome)
              </a>
            </p>
          )}
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
