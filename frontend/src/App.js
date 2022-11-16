import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense } from 'react';
import UserLogin from './Pages/UserLogin';
import RequireAuth from "./RequireAuth";
import { ROLES } from './Constants/roles';

const WelcomePage = React.lazy(() => import('./Pages/WelcomePage'));
const EditPage = React.lazy(() => import('./Pages/EditPage'));
const BasketPage = React.lazy(() => import('./Pages/BasketPage'));
function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<UserLogin/>} />
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route path="/ImageSet" element={<WelcomePage />}/>
            <Route path="/Basket" element={<BasketPage />}/>
            <Route path="/Edit" element={<EditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
