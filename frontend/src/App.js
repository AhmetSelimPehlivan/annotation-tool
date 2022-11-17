import { Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';

const UserLogin = React.lazy(() => import('./Pages/UserLogin'));
const WelcomePage = React.lazy(() => import('./Pages/WelcomePage'));
const EditPage = React.lazy(() => import('./Pages/EditPage'));
const BasketPage = React.lazy(() => import('./Pages/BasketPage'));
function App() {

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
