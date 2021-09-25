import { applyMiddleware, createStore } from "redux";
import { compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas";
import { rootReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
