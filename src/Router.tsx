import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import GlobalStyle from "./Global.styled";
import { Home } from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';

export const Router = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <GlobalStyle />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
