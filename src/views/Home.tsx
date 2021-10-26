import React, { useEffect, useState } from "react";
import { HeroesTeamRootType } from "../store/types";
import Navbar from "../components/molecules/Navbar";
import HeroCard from "../components/molecules/HeroCard";
import { Col, Container, Row } from "react-bootstrap";
import DeleteModal from "../components/organisms/DeleteModal";
import { useDispatch } from "react-redux";
import {
  clearLocalStorage,
  getItem,
  LocalStorageKeys,
  saveItem,
} from "../helpers/localStorage";
import { UserAuthActions } from "../store/actions/auth";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { HeroesTeamActions } from "../store/actions/heroesTeam";
import RootContainer from "../components/layout/CustomContainer";
import { useTotalData } from "../hooks/useTotalData";
import { useWindowAndComponentSize } from "../hooks/useWindowSize";
import GlobalDataOffcanva from "../components/organisms/GlobalDataOffcanva";
import GlobalDataList from "../components/molecules/GlobalDataList";
import LogoutModal from "../components/organisms/LogoutModal";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Heroes grid
  const myTeam = useSelector(
    (state: HeroesTeamRootType) => state.heroTeamReducer.myTeam
  );

  const { globalStats, showStats, maxStat } = useTotalData(myTeam);

  // Delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [heroIndexToDelete, setHeroIndexToDelete] = useState(0);
  const [heroNameToDelete, setHeroNameToDelete] = useState<string | undefined>(
    ""
  );
  ///

  // Logout modal
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  // Global Data offcanvas
  const [openOffCanvas, setOpenOffCanvas] = useState(false);

  useEffect(() => {
    const storageData = JSON.parse(getItem(LocalStorageKeys.HEROES_INFO));

    if (storageData) {
      dispatch(HeroesTeamActions.modifyHero(storageData.data));
    }
    //eslint-disable-next-line
  }, []);

  const handleOpenSearchModal = () => {
    history.push("/search");
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
    dispatch(HeroesTeamActions.modifyHero([]));
    dispatch(UserAuthActions.logout());
    history.replace("/login");
  };

  const { windowSize } = useWindowAndComponentSize("#col-one");

  const handleDropDownClick = (key: any) => {
    if (key === "1") {
      setOpenOffCanvas(true);
    }

    if (key === "2") {
      history.push("/search");
    }

    if (key === "3") {
      setOpenLogoutModal(true);
    }
  };

  return (
    <RootContainer>
      <Navbar
        onOpenSearchModal={handleOpenSearchModal}
        onLogout={() => setOpenLogoutModal(true)}
        windowSize={windowSize}
        onDropDownClick={handleDropDownClick}
      />
      <Container
        fluid
        className="p-0"
        style={{
          boxSizing: "border-box",
          height: "calc(100vh - 60px)",
        }}
      >
        <Row className="w-100 h-100 p-0" style={{ margin: 0 }}>
          {showStats && windowSize.width > 768 && (
            <Col
              lg={3}
              md={3}
              xs={12}
              style={{
                borderRight: "1px solid lightgray",
                borderBottom: "1px solid lightgray",
              }}
              className="p-0"
              id="col-one"
            >
              <GlobalDataList maxStat={maxStat} globalStats={globalStats} />
            </Col>
          )}

          <Col
            xs={12}
            md={9}
            lg={9}
            style={{
              height: "100%",
              overflowX: "auto",
            }}
          >
            <Container className="p-0" style={{ height: "100%" }}>
              <Row
                className="w-100 h-100 d-flex justify-content-start align-items-start"
                style={{
                  boxSizing: "border-box",
                }}
              >
                {myTeam.map((heroe, index) => (
                  <Col xs={12} md={6} lg={4} sm={6} key={`hero${heroe.id}/col`}>
                    <HeroCard
                      onViewDetails={() => {
                        history.push({
                          pathname: `/details/${heroe.id}`,
                          state: { heroe },
                        });
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
          </Col>
        </Row>
      </Container>

      <GlobalDataOffcanva
        placement="bottom"
        open={openOffCanvas}
        onClose={() => setOpenOffCanvas(false)}
        globalStats={globalStats || []}
        maxStat={maxStat}
      />

      <LogoutModal
        show={openLogoutModal}
        onHide={() => setOpenLogoutModal(false)}
        onLogout={handleLogout}
      />

      <DeleteModal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        onDeleteHeroe={() => handleDeleteHero(heroIndexToDelete)}
        heroName={heroNameToDelete as string}
      />
    </RootContainer>
  );
};

export default Home;
