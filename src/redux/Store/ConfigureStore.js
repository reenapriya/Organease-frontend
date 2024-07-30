
import { createStore, combineReducers,applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import PatientReducer from "../Reducer/PatientReducer";

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            patient: PatientReducer,
        }),
        applyMiddleware(thunk) 
    );
    return store;
};

export default ConfigureStore;
