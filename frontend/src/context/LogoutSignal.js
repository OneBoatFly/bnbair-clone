// import {createContext, useContext, useState} from 'react';

// const LogoutContext = createContext();

// export const useLogout = () => useContext(LogoutContext);

// export default function LogoutProvider({children}) {
//     const [clickedLogout, setClickedLogout] = useState(false);

//     return (
//         <LogoutContext.Provider value={{clickedLogout, setClickedLogout}}>
//             { children }
//         </LogoutContext.Provider>
//     )
// }