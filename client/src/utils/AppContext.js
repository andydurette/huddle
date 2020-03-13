import React, {useState, createContext} from 'react';
export const AppContext = createContext();
export const AppProvider = props => {

//Initially data called from API
 
let [authTest, setAuthTest] = useState(false); 


  return(
    <AppContext.Provider value={{ 
      authTested: [authTest, setAuthTest],
      }}>
      {props.children}
    </AppContext.Provider>
  );
}
