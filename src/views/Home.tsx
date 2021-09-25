import React, { useEffect, useRef, useState } from "react";
import { searchHero } from "../helpers/serverRequests";
import { FetchResponseType } from "../store/types";
import Navbar from "../components/molecules/Navbar";
import HeroCard from "../components/molecules/HeroCard";
import { Col, Container, Row } from "react-bootstrap";
import { HeroType } from "./types";
import SearchModal from "../components/organisms/SearchModal";
import DeleteModal from "../components/organisms/DeleteModal";
import HeroDetailsModal from "../components/organisms/HeroDetailsModal";

// const sampleMap = ["Perro", "Perro", "Perro", "Perro", "Perro", "Perro"];

const Home = () => {
  const [heroesTeam, setHeroesTeam] = useState<HeroType[]>([]);

  // Search modal //
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [disableSearchBtn, setDisableSearchBtn] = useState<boolean>(true);
  const [searchNoResults, setSearchNoResults] = useState<boolean>(false);
  const [searchingIsLoading, setSearchingIsLoading] = useState<boolean>(false);
  const searchHeroRef = useRef<HTMLInputElement>(null);

  const [unMatchTeamError, setUnMatchTeamError] = useState({
    error: false,
    message: "",
  });

  ///

  // Delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [heroIndexToDelete, setHeroIndexToDelete] = useState<number>(0);
  ///

  // Details modal
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  const [heroDetails, setHeroDetails] = useState<HeroType>({});
  ///

  const searchHeroByName = async () => {
    try {
      const response = (await searchHero("venom")!) as FetchResponseType;

      if (response.status === 200) {
        setHeroesTeam(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //searchHeroByName();
    
  }, []);

  const handleSearchHero = async () => {
    const searchValue = searchHeroRef!.current!.value;
    setSearchResults([]);
    setSearchNoResults(false);
    setSearchingIsLoading(true);
    try {
      const response = (await searchHero(searchValue)!) as FetchResponseType;
      console.log(response.data);
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
    let badHeroes = 0
    let godHeroes = 0

    

    setHeroesTeam((prevState) => [...prevState, hero]);
  };

  const handleViewDetails = (index: number) => {};

  const handleDeleteHero = (index: number) => {
    const tempArray = [...heroesTeam];
    tempArray.splice(index, 1);
    setHeroesTeam(tempArray);
    setOpenDeleteModal(false);
  };

  const handleLogout = () => {};

  return (
    <div
      className="vw-100 vh-100"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        boxSizing: "border-box",
        overflowX: "auto",
      }}
    >
      <Navbar
        onOpenSearchModal={() => setOpenSearchModal(true)}
        onLogout={handleLogout}
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
                  setOpenDeleteModal(true);
                }}
                imageSrc={heroe.image?.url}
                heroName={heroe.name}
                powerstats={heroe.powerstats}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <SearchModal
        searchingIsLoading={searchingIsLoading}
        disableSearchBtn={disableSearchBtn}
        openSearchModal={openSearchModal}
        onHide={() => setOpenSearchModal(false)}
        onSearchHero={handleSearchHero}
        searchHeroRef={searchHeroRef}
        onAddHero={handleAddHero}
        onSearchInputChange={() => {
          const searchRef = searchHeroRef.current?.value;
          setDisableSearchBtn(!searchRef);
        }}
        searchNoResults={searchNoResults}
        searchResults={searchResults}
      />

      <DeleteModal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        onDeleteHeroe={() => handleDeleteHero(heroIndexToDelete)}
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
