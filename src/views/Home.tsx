import React, { useEffect, useState } from "react";
import { searchHero } from "../helpers/serverRequests";
import { FetchResponseType } from "../store/types";
import Navbar from "../components/molecules/Navbar";
import HeroCard from "../components/molecules/HeroCard";
import { Col, Container, Row } from "react-bootstrap";
import { HeroType } from "./types";
import SearchModal from "../components/organisms/SearchModal";
import DeleteModal from "../components/organisms/DeleteModal";
import HeroDetailsModal from "../components/organisms/HeroDetailsModal";
import { useDispatch } from "react-redux";
import {
  clearLocalStorage,
  getItem,
  LocalStorageKeys,
  saveItem,
} from "../helpers/localStorage";
import { UserAuthActions } from "../store/actions/auth";
import { useHistory } from "react-router";
import { getRandomNumWithRange } from "../helpers/random";

// const sampleMap = ["Perro", "Perro", "Perro", "Perro", "Perro", "Perro"];

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Heroes grid
  const [heroesTeam, setHeroesTeam] = useState<HeroType[]>([]);

  // Search modal //
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchNoResults, setSearchNoResults] = useState(false);
  const [searchingIsLoading, setSearchingIsLoading] = useState(false);

  const [addNotAllowed, setAddNotAllowed] = useState<{
    error: boolean;
    message: string;
  }>({ error: false, message: "" });

  ///

  // Delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [heroIndexToDelete, setHeroIndexToDelete] = useState(0);
  const [heroNameToDelete, setHeroNameToDelete] = useState<string | undefined>(
    ""
  );
  ///

  // Details modal
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  const [heroDetails, setHeroDetails] = useState<HeroType>({});
  ///

  useEffect(() => {
    const storageData = JSON.parse(getItem(LocalStorageKeys.HEROES_INFO));

    if (storageData) {
      setHeroesTeam(storageData.data);
    }
  }, []);

  const handleOpenSearchModal = () => {
    setAddNotAllowed({
      error: false,
      message: "",
    });
    setOpenSearchModal(true);
  };

  const handleSearchHero = async (value: { searchValue: string }) => {
    const searchValue = value.searchValue;
    setSearchResults([]);
    setSearchNoResults(false);
    setSearchingIsLoading(true);
    try {
      const response = (await searchHero(searchValue)!) as FetchResponseType;
      if (response.status === 200 && response.data.response === "success") {
        const results = response.data.results;
        setSearchResults(results);
      }

      if (response.data.response === "error") {
        setSearchNoResults(true);
      }
      setSearchingIsLoading(false);
    } catch (error) {
      setSearchingIsLoading(false);
    }
  };

  const handleAddHero = (
    event: React.MouseEvent<HTMLElement>,
    hero: HeroType
  ) => {
    setAddNotAllowed({
      error: false,
      message: "",
    });

    if (heroesTeam.some((elem) => elem.id === hero.id)) {
      setAddNotAllowed({
        error: true,
        message: "Este heroe ya está en tu equipo",
      });
      return;
    }

    if (heroesTeam.length >= 6) {
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

    heroesTeam.forEach((elem) => {
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

    const storageData = { data: [...heroesTeam, tempData] };
    saveItem(LocalStorageKeys.HEROES_INFO, storageData);
    setHeroesTeam((prevState) => [...prevState, tempData]);
  };

  const handleDeleteHero = (index: number) => {
    const tempArray = [...heroesTeam];
    tempArray.splice(index, 1);

    const storageData = { data: tempArray };

    saveItem(LocalStorageKeys.HEROES_INFO, storageData);
    setHeroesTeam(tempArray);

    setAddNotAllowed({
      error: false,
      message: "",
    });

    setOpenDeleteModal(false);
  };

  const handleLogout = () => {
    clearLocalStorage();
    dispatch(UserAuthActions.logout());
    history.replace("/login");
  };

  return (
    <div
      className="d-flex flex-column vw-100 vh-100"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        boxSizing: "border-box",
        overflowX: "auto",
      }}
    >
      <Navbar
        onOpenSearchModal={handleOpenSearchModal}
        onLogout={handleLogout}
        heroData={heroesTeam}
      />
      <Container
        fluid
        className="w-100 p-0 m-0 d-flex justify-content-center align-items-start"
        style={{
          boxSizing: "border-box",
          height: "calc(100vh - 80px)",
          overflowX: "auto",
        }}
      >
        <Row
          className="w-100 d-flex justify-content-start align-items-start"
          style={{ boxSizing: "border-box" }}
        >
          {heroesTeam.map((heroe, index) => (
            <Col xs={12} md={6} lg={3} sm={6}>
              <HeroCard
                onViewDetails={() => {
                  setHeroDetails(heroe);
                  setOpenDetailsModal(true);
                }}
                onDeleteHero={() => {
                  setHeroIndexToDelete(index);
                  setHeroNameToDelete(heroe.name);
                  setOpenDeleteModal(true);
                }}
                imageSrc={heroe.image?.url}
                heroName={heroe.name}
                powerstats={heroe.powerstats}
                orientation={heroe.biography?.alignment}
                key={`hero${heroe.id}`}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <SearchModal
        searchingIsLoading={searchingIsLoading}
        openSearchModal={openSearchModal}
        onHide={() => setOpenSearchModal(false)}
        onSearchHero={handleSearchHero}
        onAddHero={handleAddHero}
        searchNoResults={searchNoResults}
        searchResults={searchResults}
        addError={addNotAllowed}
      />

      <DeleteModal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        onDeleteHeroe={() => handleDeleteHero(heroIndexToDelete)}
        heroName={heroNameToDelete as string}
      />

      <HeroDetailsModal
        show={openDetailsModal}
        onHide={() => setOpenDetailsModal(false)}
        heroData={heroDetails}
      />
    </div>
  );
};

export default Home;
