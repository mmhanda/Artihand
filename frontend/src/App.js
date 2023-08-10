import React from "react";
import Header from "./components/Heard";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return(
    <>
      <Header/>
      <main className="py-3">
        <Container>
        <Outlet/>
        </Container>
      </main>
      <Footer/>
    </>
  );
};

export default App;