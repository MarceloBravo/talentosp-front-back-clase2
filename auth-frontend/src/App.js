import { createContext, useState } from "react";
import { Navigation } from "./routes/Navigation";

import './App.css';

const userContext = createContext(null);

function App() {
  const [ userSession, setUserSession ] = useState(null);

  return (
    <userContext.Provider value={{ userSession, setUserSession }}>
        <div className="App">
          <Navigation/>
        </div>
    </userContext.Provider>
  );
}

export default App;
