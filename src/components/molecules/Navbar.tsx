import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { HeroType } from "../../views/types";
import { Col, Row } from "react-bootstrap";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as LogoutIcon } from "bootstrap-icons/icons/box-arrow-right.svg";

type NavbarTypes = {
  onOpenSearchModal: () => void;
  onLogout: () => void;
  heroData: HeroType[];
};

const spanishWord = {
  strength: "Fuerza",
  speed: "Velocidad",
  intelligence: "Inteligencia",
  combat: "Combate",
  durability: "Durabilidad",
  power: "Poder",
  avgWeight: "Prom. peso",
  avgHeight: "Prom. altura",
};

const Navbar: React.FC<NavbarTypes> = (props) => {
  const [globalStats, setGlobalStats] = useState<
    { name: string; value: string }[]
  >();

  const [maxStat, setMaxStat] = useState({ name: "", value: 0 });
  const [showStats, setShowStats] = useState(false);

  const heroData = props.heroData;

  useEffect(() => {
    const globalData = {
      intelligence: 0,
      strength: 0,
      speed: 0,
      combat: 0,
      durability: 0,
      power: 0,
      avgWeight: 0,
      avgHeight: 0,
    };

    let totalWeight = 0;
    let totalHeight = 0;

    if (heroData.length > 0) {
      heroData.forEach((hero) => {
        const weight = hero.appearance?.weight[1].split(" ")[0];
        const height = hero.appearance?.height[1].split(" ")[0];

        totalWeight += Number(weight);
        totalHeight += Number(height);

        globalData.intelligence += Number(hero?.powerstats?.intelligence);
        globalData.strength += Number(hero.powerstats?.strength);
        globalData.speed += Number(hero.powerstats?.speed);
        globalData.combat += Number(hero.powerstats?.combat);
        globalData.durability += Number(hero.powerstats?.durability);
        globalData.power += Number(hero.powerstats?.power);
      });

      globalData.avgWeight = +(totalWeight / heroData.length).toFixed(2);
      globalData.avgHeight = +(totalHeight / heroData.length).toFixed(2); 

      const newArr: any[] = [];
      const maxData = { name: "", value: 0 };
      for (const elem in globalData) {
        if ((globalData as any)[elem] > maxData.value) {
          maxData.name = (spanishWord as any)[elem];
          maxData.value = (globalData as any)[elem];
        }

        newArr.push({
          name: (spanishWord as any)[elem],
          value: (globalData as any)[elem],
        });
      }

      setGlobalStats(newArr);
      setMaxStat(maxData);
      setShowStats(true);
    } else {
      setGlobalStats([]);
      setShowStats(false);
    }
  }, [heroData]);

  return (
    <nav
      className="d-flex flex-column p-2 justify-content-between align-items-center bg-white w-100 shadow-sm"
      style={{
        height: "auto",
        boxSizing: "border-box",
        borderBottom: "1px solid lightgray",
      }}
    >
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        <Button
          className="sm-h6 text-white"
          onClick={props.onOpenSearchModal}
          variant="primary"
        >
          <SearchIcon width="40px" height="30px" />
        </Button>

        <h2>Mi equipo</h2>

        <Button onClick={props.onLogout} variant="outline-primary">
          <LogoutIcon width="40px" height="30px" />
        </Button>
      </div>
      {showStats && (
        <div
          className="mt-2 p-1 w-100 border"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <Row>
            <h4 style={{ fontSize: "20px" }}>
              Tipo de equipo: {maxStat.name} ({maxStat.value})
            </h4>
          </Row>
          <Row>
            {globalStats?.map((elem, index) => (
              <Col key={`${index}asd${elem.name}${elem.value}`}>
                <h5
                  key={`${index}${elem.name}${elem.value}`}
                  style={{ fontSize: "15px", margin: "5px" }}
                >
                  {elem?.name}: {elem?.value}
                </h5>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
