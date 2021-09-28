type BiographyType = {
  "full-name"?: string;
  "alter-egos"?: string;
  aliases?: string[];
  "place-of-birth"?: string;
  "first-appearance"?: string;
  publisher?: string;
  alignment?: string;
};

type AppearanceType = {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  "eye-color": string;
  "hair-color": string;
};

export type PowerStatsType = {
  [intelligence: string]: string;
  strength: string;
  speed: string;
  durability: string;
  power: string; 
  combat: string;
};

type WorkType = {
  occupation?: string;
  base?: string;
};

type ConnectionsType = {
  "group-affiliation"?: string;
  relatives?: string;
};

type ImageType = {
  url?: string;
};

export type HeroType = {
  appearance?: AppearanceType;
  biography?: BiographyType;
  connections?: ConnectionsType;
  id?: string;
  image?: ImageType;
  name?: string;
  powerstats?: PowerStatsType;
  work?: WorkType;
};
