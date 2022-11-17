import { Routes, Route } from "react-router-dom";
import React, { Suspense, useContext } from 'react';
import { AuthContext } from "./Context/AuthContext"

const UserLogin = React.lazy(() => import('./Pages/UserLogin'));
const WelcomePage = React.lazy(() => import('./Pages/WelcomePage'));
const EditPage = React.lazy(() => import('./Pages/EditPage'));
const BasketPage = React.lazy(() => import('./Pages/BasketPage'));
function App() {
  const authContext = useContext(AuthContext);
  console.log("auth ",authContext)
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<UserLogin/>}/>
        <Route path="/ImageSet" element={<WelcomePage />}/>
        <Route path="/Basket" element={<BasketPage />}/>
        <Route path="/Edit" element={<EditPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
