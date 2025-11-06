import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginRoute, registerRoute, Routeindex } from "./Routes/Route";
import Layout from "./Layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Routeindex} element={<Layout />}>
          <Route index element={<Index />} />
        </Route>

        <Route path={registerRoute} element={ <SignIn /> } />
        <Route path={LoginRoute} element={ <Login /> } />

      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
