import React, { useEffect, useState } from "react";
import RootContainer from "../components/layout/CustomContainer";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from "formik";
import { searchValidationSchema } from "../helpers/formValidations/searchValidations";
import FormInput from "../components/atoms/FormInput";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { HeroesTeamRootType, SearchRootType } from "../store/types";
import { SearchHeroActions } from "../store/actions/searchHeroes";
import SearchCoincidenceCard from "../components/molecules/SearchCoincidenceCard";
import { useHistory } from "react-router";
import { HeroType } from "./types";
import { getRandomNumWithRange } from "../helpers/random";
import { LocalStorageKeys, saveItem } from "../helpers/localStorage";
import { HeroesTeamActions } from "../store/actions/heroesTeam";

const HeroSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [addNotAllowed, setAddNotAllowed] = useState({
    error: false,
    message: "",
  });

  const { isLoading, noResults, searchCoincidences } = useSelector(
    (state: SearchRootType) => state.searchHeroReducer
  );

  const myTeam = useSelector(
    (state: HeroesTeamRootType) => state.heroTeamReducer.myTeam
  );

  useEffect(() => {
    console.log(myTeam);
  }, [myTeam]);

  const handleSearch = (value: { searchValue: string }) => {
    dispatch(SearchHeroActions.searchHero(value.searchValue));
  };

  const handleAddHero = (event: any, hero: HeroType) => {
    console.log(hero);

    setAddNotAllowed({
      error: false,
      message: "",
    });

    if (myTeam.some((elem) => elem.id === hero.id)) {
      setAddNotAllowed({
        error: true,
        message: "Este heroe ya está en tu equipo",
      });
      return;
    }

    if (myTeam.length >= 6) {
      setAddNotAllowed({
        error: true,
        message: "Solo puedes tener 6 heroes en tu equipo",
      });
      return;
    }

    const tempData = hero;

    for (const elem in tempData.powerstats) {
      if (tempData.powerstats[elem] === "null") {
        tempData.powerstats[elem] = String(getRandomNumWithRange(20, 100));
      }
    }

    if (tempData.biography?.alignment === "-") {
      tempData.biography.alignment = "good";
    }

    let badHeroes = 0;
    let goodHeroes = 0;

    myTeam.forEach((elem) => {
      if (elem.biography?.alignment === "good") {
        ++goodHeroes;
      }

      if (elem.biography?.alignment === "bad") {
        ++badHeroes;
      }
    });

    if (hero.biography?.alignment === "good" && goodHeroes >= 3) {
      setAddNotAllowed({
        error: true,
        message: "Solo puedes tener 3 heroes buenos en tu equipo",
      });
      return;
    }

    if (hero.biography?.alignment === "bad" && badHeroes >= 3) {
      setAddNotAllowed({
        error: true,
        message: "Solo puedes tener 3 villanos en tu equipo",
      });
      return;
    }

    if (
      tempData.appearance?.weight[1] === "-" ||
      tempData.appearance?.weight[1] === "0 kg"
    ) {
      const newWeight = `${getRandomNumWithRange(50, 80)} kg`;
      tempData.appearance.weight[1] = newWeight;
    }

    if (
      tempData.appearance?.height[1] === "-" ||
      tempData.appearance?.height[1] === "0 cm"
    ) {
      const newHeight = `${getRandomNumWithRange(150, 190)} cm`;
      tempData.appearance.height[1] = newHeight;
    }

    const newData = { data: [...myTeam, tempData] };
    saveItem(LocalStorageKeys.HEROES_INFO, newData);
    // setHeroesTeam((prevState) => [...prevState, tempData]);

    dispatch(HeroesTeamActions.modifyHero(newData.data));
  };

  return (
    <RootContainer>
      <Container
        className="w-75 h-auto p-4 bg-white shadow-sm d-grid"
        style={{ margin: "auto", border: "1px solid lightgray" }}
      >
        <h2 className="mx-auto">Buscar Heroe</h2>

        <Row>
          <Formik
            initialValues={{ searchValue: "" }}
            validateOnChange={false}
            onSubmit={isLoading ? () => {} : handleSearch}
            validateOnBlur={false}
            validationSchema={searchValidationSchema}
          >
            {({ handleChange, errors, values, touched }) => (
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
                  {isLoading ? "Buscando heroes..." : "Buscar"}
                </Button>
              </Form>
            )}
          </Formik>
        </Row>
        <Container
          className="mt-3 border"
          style={{
            maxHeight: "45vh",
            overflowX: "auto",
          }}
        >
          <Row>
            {searchCoincidences &&
              searchCoincidences.map((result, index) => (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  sm={6}
                  key={`${result.name}${index}colRes`}
                >
                  <SearchCoincidenceCard
                    heroName={result.name}
                    imgSrc={result.image.url}
                    onAdd={(event) => handleAddHero(event, result)}
                    key={`${result.name}${index}`}
                  />
                </Col>
              ))}
          </Row>
          {noResults && (
            <Row style={{ margin: "10px 0px" }}>
              <p style={{ margin: "auto", textAlign: "center" }}>
                No se encontraron resultados...
              </p>
            </Row>
          )}
        </Container>

        <Row>
          <Col>
            {addNotAllowed.error && (
              <p className="text-danger">{addNotAllowed.message}</p>
            )}
          </Col>
        </Row>

        <Row>
          <p className="mt-2">
            *Los heroes que no tengan un bando o alineación definidas tendrán la
            alineación buena por defecto. <br />
            *Los heroes que no tengan stats (null) se le les asignará un valor
            aleatorio entre 20 y 100. <br />
            *Los heroes que no tengan un peso y altura definido de les asignará,
            el valor aleatorio de entre 50kg y 80kg para el peso y entre 150cm y
            190 cm para la altura.
          </p>
        </Row>

        <Row>
          <Col>
            <Button onClick={() => history.push("/home")} variant="primary">
              Volver a home
            </Button>
          </Col>
        </Row>
      </Container>
    </RootContainer>
  );
};

export default HeroSearch;
