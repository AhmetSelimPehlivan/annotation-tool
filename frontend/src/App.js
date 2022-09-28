import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense } from 'react';
import UserLogin from './Pages/UserLogin';

const WelcomePage = React.lazy(() => import('./Pages/WelcomePage'));
const EditPage = React.lazy(() => import('./Pages/EditPage'));
const BasketPage = React.lazy(() => import('./Pages/BasketPage'));
function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
          <Route path="/UserLogin" element={<UserLogin/>} />
          <Route path="/ImageSet" element={<WelcomePage />}/>
          <Route path="/Basket" element={<BasketPage />}/>
          <Route path="/" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
