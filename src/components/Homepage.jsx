import React, { useState, useEffect } from "react";
import "./CryptoDetails.css";
import millify from "millify";
import useGetCryptosQuery from "../services/cryptoApi";
import Loader from "./Loader";

function Homepage() {
  const { data, loading, error } = useGetCryptosQuery(100);
  const [globalData, setGlobalData] = useState([]);

  useEffect(() => {
    if (data && data.data && data?.data?.stats) {
      setGlobalData(data?.data?.stats);
    }
  }, [data]);
  if (loading) {
    return <Loader/>;
  }
  console.log("globalDate");
  console.log(data);
  return (
    <div>
      <h2 className="heading">
        Global Crypto Stats
      </h2>

      <div className="stat-container">
      <div className="coin-detail-container">
      <div className="global-stat-handling-container">
          <div className="stat-handler">
            <div className="coin-stat-name">Total Cryptocurrencies</div>
            <div className="coin-stat-value">{globalData.total}</div>
          </div>

          <div className="stat-handler">
            <div className="coin-stat-name">Total Exchanges</div>
            <div className="coin-stat-value">{globalData.totalExchanges}</div>
          </div>
          <div className="stat-handler">
            <div className="coin-stat-name">Total Market Cap:</div>
            <div className="coin-stat-value">${millify(globalData.totalMarketCap)}</div>
          </div>
        </div>
        </div>

        <div className="coin-detail-container">
        <div className="global-stat-handling-container">
          <div className="stat-handler">
            <div className="coin-stat-name">Total 24h Volume</div>
            <div className="coin-stat-value">${millify(globalData.total24hVolume)}</div>
          </div>

          <div className="stat-handler">
            <div className="coin-stat-name">Total Coins</div>
            <div className="coin-stat-value">{globalData.totalCoins}</div>
          </div>

          <div className="stat-handler">
            <div className="coin-stat-name">Total Markets</div>
            <div className="coin-stat-value">{globalData.totalMarkets}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
