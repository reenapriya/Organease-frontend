
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  data: null,
  centre: [],
  hospital: [],
  hospitalGetOne:{},
  categories: [],
  organ: [],
  request:[],
  isLoggedIn: false,
};

export const UserDetailsContext = createContext();

export const useAuth = () => useContext(UserDetailsContext);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state, 
        data: action.payload.data,
        isLoggedIn: true 
      };
    case 'CENTREPROFILE':
      return { 
        ...state, 
        centre: Array.isArray(action.payload.centre) ? action.payload.centre : [] 
      };
    case 'HOSPITALPROFILE':
      return {
        ...state,
        hospital: Array.isArray(action.payload.hospital) ? action.payload.hospital : []
      };
    case 'CATEGORY':
      return {
        ...state,
        categories: Array.isArray(action.payload.categories) ? action.payload.categories : []
      };
    case 'ORGAN':
      return {
        ...state,
        organ: Array.isArray(action.payload.organ) ? action.payload.organ : []
      };
    case 'REQUEST':
      return {
        ...state,
        request: Array.isArray(action.payload.request) ? action.payload.request : []
      };

      case "HOSPITALGETONE":
        return {
          ...state,
          hospitalGetOne:action.payload
        }
     
    
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserDetailsContext.Provider value={{ 
        user: state.data,
        dispatch,
        centre: state.centre,
        hospital: state.hospital,
        categories: state.categories,
        organ: state.organ,
        request:state.request,
        isLoggedIn: state.isLoggedIn
      }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
