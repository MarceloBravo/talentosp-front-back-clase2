import { Navigation } from "./routes/Navigation";
import { AuthProvider } from "./contexts/AuthContext";

import './App.css';

function App() {

  return (
    <AuthProvider>
        <div className="App">
          <Navigation/>
        </div>
    </AuthProvider>
  );
}

export default App;
