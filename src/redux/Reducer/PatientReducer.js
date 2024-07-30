
import { ADD_PATIENT, UPDATE_PATIENT ,FETCH_PATIENTS} from "../Action/PatientAction";

const initialState = {
    data: [],
};

export default function PatientReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_PATIENTS:{
            console.log('FETCH_PATIENTS payload:', action.payload);
            return {
                
                ...state,
                data: Array.isArray(action.payload) ? action.payload : [],
            };}
        case ADD_PATIENT: {
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        }
        case UPDATE_PATIENT: {
            return {
                ...state,
                data: state.data.map((patient) =>
                    patient._id === action.payload._id ? action.payload : patient
                ),
            };
        }
        
        default: {
            return state;
        }
    }
}
