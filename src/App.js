import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import CryptoDetails from "./components/CryptoDetails";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Exchanges from "./components/Exchanges";
import Homepage from "./components/Homepage";
import News from "./components/News";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        
        
      </>
      <div className="main">
        <Layout>
          <Routes>
            <Route exact path="/" element={
              <Homepage />
            }
            />
            <Route exact path="/exchanges" element={
              <Exchanges />
            }
            />
            <Route exact path="/crypto" element={
              <Cryptocurrencies />
            }
            />
            <Route exact path="/crypto/:coinID" element={
              <CryptoDetails />
            }
            />
            <Route path="/search/:query" element={
              <Search/>

            }

/>
            <Route exact path="/news" element={
              <News />
            }
            />
          </Routes>
        </Layout>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
