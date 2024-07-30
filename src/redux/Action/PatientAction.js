import axios from "../../config/axios";
export const ADD_PATIENT = "ADD_PATIENT";
export const UPDATE_PATIENT="UPDATE_PATIENT"

export const FETCH_PATIENTS = "FETCH_PATIENTS";

export const addPatient = (patient) => {
    return {
        type: ADD_PATIENT,
        payload: patient,
    };
};

export const updatePatient = (patient) => {
    return {
        type: UPDATE_PATIENT,
        payload: patient
    };
};



export const fetchPatients = () => async (dispatch) => {
    const response = await axios.get('/patientShowAll', {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    dispatch({
        type: FETCH_PATIENTS,
        payload: response.data,
    });
};