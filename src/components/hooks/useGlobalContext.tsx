import { createContext, useContext } from 'react';
import * as functions from '../../utils/utils';
import { WrapperProps } from '../types/types';

export const GlobalContext = createContext(functions);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: WrapperProps) => (
  <GlobalContext.Provider value={functions}>
    {children}
  </GlobalContext.Provider>
);

export default GlobalProvider;
