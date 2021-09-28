import axios from "axios";

type UserType = {
  email: string;
  password: string;
};

const token = process.env.REACT_APP_HERO_TOKEN;

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_LOGIN_API,
});

const heroDataInstance = axios.create({
  baseURL: process.env.REACT_APP_HERO_API,
});

export const authUser = (user: UserType): any =>
  authInstance.request({ method: "POST", data: user });

export const searchHero = async (name: string) => {
  try {
    const response = await heroDataInstance.request({
      method: "GET",
      url: `${token}/search/${name}/`,
    });
    return response;
  } catch (error) {
    return error;
  }
};
