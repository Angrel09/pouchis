import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getPet } from '../api/pouApi';
import { DEFAULT_PET_ID } from '../utils/constants';

const PetContext = createContext();

const initialState = {
  pet: null,
  loading: true,
  error: null,
};

const petReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, pet: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_PET':
      return { ...state, pet: action.payload };
    default:
      return state;
  }
};

export const PetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(petReducer, initialState);

  const fetchPet = async (id = DEFAULT_PET_ID) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const { data } = await getPet(id);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const updatePetData = (newPetData) => {
    dispatch({ type: 'UPDATE_PET', payload: newPetData });
  };

  useEffect(() => {
    fetchPet();
  }, []);

  return (
    <PetContext.Provider value={{ ...state, fetchPet, updatePetData }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext debe ser usado dentro de un PetProvider');
  }
  return context;
};
