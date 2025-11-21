import { useState, createContext } from "react";
export const MainContext = createContext();
const Context = (props) => {
  const [user, setUser] = useState({});
  const [baseUrl, setBaseUrl] = useState('https://mydlv.onrender.com/api/v1/');
  
  // const getToken = () => {
  //   const tokenString = sessionStorage.getItem('token');
  //   try {
  //     // Only parse if tokenString exists
  //     return tokenString ? JSON.parse(tokenString) : null;
  //   } catch (error) {
  //     console.error("Failed to parse token:", error);
  //     return null;
  //   }
  // }; 
    
 
    const [token, setToken] = useState(null);
    
    
    const contextValue = 
    {
      
      
      baseUrl,
      user,
      setUser,
      setToken,
      token
    }
  return (
    <MainContext.Provider value={contextValue}>{props.children}</MainContext.Provider> 
  )
}

export default Context