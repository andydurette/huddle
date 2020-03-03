import React, {useState, createContext} from 'react';

export const AppContext = createContext();

export const AppProvider = props => {

//Initially data called from API
const [responsibility, setResponsibility] = useState({}); 

  return(
    <AppContext.Provider value={{ 
      responsibilities: [responsibility, setResponsibility],
      }}>
      {props.children}
    </AppContext.Provider>
  );
}
