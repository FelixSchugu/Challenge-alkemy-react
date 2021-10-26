import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Styles from "./styles/Styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageKeys, getItem } from "./helpers/localStorage/index";
import { AuthRootState } from "./store/types";
import { UserAuthActions } from "./store/actions/auth";

import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const isAuth = useSelector(
    (state: AuthRootState) => state.authReducer.isAuth
  );

  // Importante para que ande el router desde la barra de dirección del navegador
  const [isLoading, setIsLoading] = useState(true);
  //

  const dispatch = useDispatch();

  const initializeApp = async () => {
    const token = await JSON.parse(getItem(LocalStorageKeys.TOKEN));

    if (token) {
      dispatch(UserAuthActions.authWithToken());
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    initializeApp();
  
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Router>
        {isAuth && !isLoading && <PrivateRoutes />}
        {!isAuth && !isLoading && <PublicRoutes />}
      </Router>
      <Styles />
    </>
  );
}

export default App;
