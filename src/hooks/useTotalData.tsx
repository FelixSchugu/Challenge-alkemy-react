import { useState, useEffect } from "react";
import { HeroType } from "../views/types";

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

export const useTotalData = (heroData: HeroType[]) => {
  const [globalStats, setGlobalStats] =
    useState<{ name: string; value: string }[]>();

  const [maxStat, setMaxStat] = useState({ name: "", value: 0 });
  const [showStats, setShowStats] = useState(false);

  //   const heroData = props.heroData;

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
        if (
          (globalData as any)[elem] > maxData.value &&
          elem !== "avgWeight" &&
          elem !== "avgHeight"
        ) {
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
      setMaxStat({ name: "", value: 0 });
      setShowStats(false);
    }
  }, [heroData]);

  return {
    globalStats,
    maxStat,
    showStats,
  };
};
