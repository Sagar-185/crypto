import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import useGetCryptoDetail from "../services/cryptoDetail";
import useDetCoinDetails from "../services/coinApi";
import LineChart from "./LineChart";
import millify from "millify";
import "./CryptoDetails.css";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  ShoppingCartOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Loader from "./Loader";
// const demoImage =
//   "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
function CryptoDetails() {
  const { coinID } = useParams();
  // console.log('coinId ' + coinID)
  const [timeStamp, setTimeStamp] = useState("7d");

  const [cryptoData1, setCryptoData1] = useState([]);
  const [cryptoData2, setCryptoData2] = useState([]);
  const [cryptoData3, setCryptoData3] = useState([]);
  const [cryptoData4, setCryptoData4] = useState([]);
  const [cryptoData5, setCryptoData5] = useState([]);
  const [cryptoData6, setCryptoData6] = useState([]);
  const [cryptoData7, setCryptoData7] = useState([]);
  const cryptoDataArray = [
    useGetCryptoDetail(coinID, "3h"),
    useGetCryptoDetail(coinID, "24h"),
    useGetCryptoDetail(coinID, "7d"),
    useGetCryptoDetail(coinID, "30d"),
    useGetCryptoDetail(coinID, "3m"),
    useGetCryptoDetail(coinID, "1y"),
    useGetCryptoDetail(coinID, "5y"),
  ];
  
  // console.log('History data for first element in array '+ cryptoData[0]?.data?.data?.history);
  const { data: a8, error: errorCoin, loading } = useDetCoinDetails(coinID);


  // console.log('coinApi data '+a8)
  const [coinDetail, setCoinDetail] = useState([]);

  useEffect(() => {
    if (
      cryptoDataArray[0] &&
      cryptoDataArray[0]?.data &&
      cryptoDataArray[0]?.data?.data?.history
    ) {
      setCryptoData1(cryptoDataArray[0]?.data?.data?.history);
      console.log("History 1")
    }
  }, [cryptoDataArray[0]]);
  useEffect(() => {
    if (
      cryptoDataArray[1] &&
      cryptoDataArray[1]?.data &&
      cryptoDataArray[1]?.data?.data?.history
    ) {
      setCryptoData2(cryptoDataArray[1]?.data?.data?.history);
      console.log("History 2")
    }
  }, [cryptoDataArray[1]]);
  useEffect(() => {
    if (
      cryptoDataArray[2] &&
      cryptoDataArray[2]?.data &&
      cryptoDataArray[2]?.data?.data?.history
    ) {
      setCryptoData3(cryptoDataArray[2]?.data?.data?.history);
      console.log("History 3")
    }
  }, [cryptoDataArray[2]]);
  useEffect(() => {
    if (
      cryptoDataArray[3] &&
      cryptoDataArray[3]?.data &&
      cryptoDataArray[3]?.data?.data?.history
    ) {
      setCryptoData4(cryptoDataArray[3]?.data?.data?.history);
      console.log("History 4")
    }
  }, [cryptoDataArray[3]]);
  useEffect(() => {
    if (
      cryptoDataArray[4] &&
      cryptoDataArray[4]?.data &&
      cryptoDataArray[4]?.data?.data?.history
    ) {
      setCryptoData5(cryptoDataArray[4]?.data?.data?.history);
      console.log("History 5")
    }
  }, [cryptoDataArray[4]]);
  useEffect(() => {
    if (
      cryptoDataArray[5] &&
      cryptoDataArray[5]?.data &&
      cryptoDataArray[5]?.data?.data?.history
    ) {
      setCryptoData6(cryptoDataArray[5]?.data?.data?.history);
      console.log("History 6")
    }
  }, [cryptoDataArray[5]]);
  useEffect(() => {
    if (
      cryptoDataArray[6] &&
      cryptoDataArray[6]?.data &&
      cryptoDataArray[6]?.data?.data?.history
    ) {
      setCryptoData7(cryptoDataArray[6]?.data?.data?.history);
      console.log("History 7")
    }
  }, [cryptoDataArray[6]]);

  const timeIntervals = [
    { label: "3h", value: "3h" },
    { label: "24h", value: "24h" },
    { label: "7d", value: "7d" },
    { label: "30d", value: "30d" },
    { label: "3m", value: "3m" },
    { label: "1y", value: "1y" },
    { label: "5y", value: "5y" },
  ];
  
  useEffect(() => {
    if (a8 && a8?.data && a8?.data?.coin) {
      setCoinDetail(a8?.data?.coin);
      console.log("Coin Detail set")
    }
  }, [a8]);
  
  


  if (loading) {
    return <Loader />;
  }
  

  const stats = [
    {
      title: "Price to USD",
      value: `$${coinDetail?.price && millify(coinDetail?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinDetail?.rank, icon: <NumberOutlined /> },
    {
      title: "All time High",
      value: `$${coinDetail?.allTimeHigh?.price && millify(coinDetail?.allTimeHigh?.price)}`,
      icon: <ThunderboltOutlined />,
    }, //24hVolume
    {
      title: "Market Cap",
      value: `$${coinDetail?.marketCap && millify(coinDetail?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$${
        coinDetail?.allTimeHigh?.price &&
        millify(coinDetail?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  // console.log(coinDetail);
  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinDetail?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinDetail?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coinDetail?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Total Supply",
      value: `$${
        coinDetail?.supply?.total && millify(coinDetail?.supply?.total)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$${
        coinDetail?.supply?.circulating &&
        millify(coinDetail?.supply?.circulating)
      }`,
      icon: <PlusCircleOutlined />,
    },
  ];
  // console.log(cryptoData7);
  // console.log('HTMPParser test' + coinDetail.description)

  return (
    <>
    
      <div className="stat-container">
        
        <div className="coin-detail-container">
          <div className="coin-handling-container">
            <h2>Currency : {coinDetail.name}</h2>
            <h6>{coinDetail.name} live datails</h6>
          </div>
          <div className="stat-handling-container">
            {stats.map(({ title, value, icon }) => (
              <div className="stat-handler">
                <div className="coin-stat-name">
                  {icon} &nbsp; {title}
                </div>
                <div className="coin-stat-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="coin-detail-container">
          <div className="coin-handling-container">
            <h2>General Stats</h2>
            <p>Other live datails</p>
          </div>
          <div className="stat-handling-container">
            {genericStats.map(({ title, value, icon }) => (
              <div className="stat-handler">
                <div className="coin-stat-name">
                  {icon}&nbsp;{title}
                </div>
                <div className="coin-stat-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="currency-description" >{coinDetail.description}</p>

      <div className="time-dropdown">
        <select
          value={timeStamp}
          onChange={(e) => setTimeStamp(e.target.value)}
        >
          {timeIntervals.map((interval) => (
            <option key={interval.value} value={interval.value}>
              {interval.label}
            </option>
          ))}
        </select>
      </div>
      <div className="coin-history-container">
        <div className="chart-area">
          {timeStamp === "3h" && (
            <LineChart
              coinHistory={cryptoData1}
              currentPrice={coinDetail.price}
              coinName={coinDetail.name}
            />
          )}
          {timeStamp === "24h" && (
            <LineChart
              coinHistory={cryptoData2}
              currentPrice={coinDetail.price}
              coinName={coinDetail.name}
            />
          )}
          {timeStamp === "7d" && (
            <LineChart
              coinHistory={cryptoData3}
              currentPrice={coinDetail.price}
              coinName={coinDetail.name}
            />
          )}
          {timeStamp === "30d" && (
            <LineChart
              coinHistory={cryptoData4}
              currentPrice={coinDetail.price}
              coinName={coinDetail.name}
            />
          )}
          {timeStamp === "3m" && (
            <LineChart
              coinHistory={cryptoData5}
              currentPrice={coinDetail.price}
              coinName={coinDetail.name}
            />
          )}
          {timeStamp === "1y" && (
            <LineChart
              coinHistory={cryptoData6}
              currentPrice={coinDetail.price}
              coinName={coinDetail.name}
            />
          )}
          {timeStamp === "5y" && (
            <LineChart
              coinHistory={cryptoData7}
              currentPrice={coinDetail.price}
              coinName={coinDetail.name}
            />
          )}
        </div>
        <div className="coin-links">
          {coinDetail &&
            coinDetail.links &&
            coinDetail.links.map((link) => (
              <div className="coin-link">
                <div className="link-name">{link.type}</div>
                <Link to={link.url} target="_blank">{link.name.slice(0, 20)}</Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default CryptoDetails;
