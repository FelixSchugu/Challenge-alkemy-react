import React, { useEffect, useState } from "react";
import { searchHero } from "../helpers/serverRequests";
import { FetchResponseType, HeroesTeamRootType } from "../store/types";
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
import { useSelector } from "react-redux";
import { HeroesTeamActions } from "../store/actions/heroesTeam";

// const sampleMap = ["Perro", "Perro", "Perro", "Perro", "Perro", "Perro"];

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Heroes grid
  const [heroesTeam, setHeroesTeam] = useState<HeroType[]>([]);

  const myTeam = useSelector(
    (state: HeroesTeamRootType) => state.heroTeamReducer.myTeam
  );

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
      dispatch(HeroesTeamActions.modifyHero(storageData.data));
    }
  }, []);

  const handleOpenSearchModal = () => {
    history.push("/search");
    // setOpenSearchModal(true);
  };

  const handleDeleteHero = (index: number) => {
    const tempArray = [...myTeam];
    tempArray.splice(index, 1);

    const newData = { data: tempArray };

    saveItem(LocalStorageKeys.HEROES_INFO, newData);
    dispatch(HeroesTeamActions.modifyHero(tempArray));

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
        heroData={myTeam}
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
          {myTeam.map((heroe, index) => (
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
