import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { AuthContext } from "./contexts/AuthProvider";
import { RequireAuth } from "./contexts/RequireAuth";
import { Home } from "./pages/Home";
import { Login } from './pages/Login/index';
import { Register } from './pages/Register/index';
import { Http } from './pages/Http/index';
import { HttpImage } from './pages/HttpImage/index';
import { Dog } from "./pages/Dog";
import { Clients } from './pages/Clients';
import { ClientsAdd } from './pages/ClientsAdd/index';
import { ClientsEdit } from './pages/ClientsEdit/index';


function App() {
  const {isLoading} = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {!isLoading &&
        <>
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/https" element={<RequireAuth><Http /></RequireAuth>} />
          <Route path="/https/:code" element={<RequireAuth><HttpImage /></RequireAuth>} />
          <Route path="/dogs" element={<RequireAuth><Dog /></RequireAuth>} />
          <Route path="/users" element={<RequireAuth><Clients /></RequireAuth>} />
          <Route path="/users/add" element={<RequireAuth><ClientsAdd /></RequireAuth>} />
          <Route path="/users/:id" element={<RequireAuth><ClientsEdit /></RequireAuth>} />
        </>
      }
      
    </Routes>
  );
}

export default App;
