export enum LocalStorageKeys {
  TOKEN = "token",
  HEROES_INFO = "heroes-info",
}

export const saveItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

export const getItem = (key: string): any => {
  const item = localStorage.getItem(key);
  return item;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
