import React from "react";
import data from "./data.json";
import millify from 'millify';
import './Exchange.css'
import { Link } from "react-router-dom";

// const url = 'https://web-api.coinmarketcap.com/v1/exchange/listings/latest';

// const params = {
//   limit: 100,
//   convert: 'USD',
//   sort_dir: 'desc',
//   sort: 'volume_24h',
//   start: 1,
// };

// axios.get(url)
//   .then(response => {
//     const data = response.data;

//     // Extract the relevant data from the response
//     const rows = data.data.map(exchange => {
//       return {
//         Name: exchange.name,
//         Rank: exchange.num_market_pairs,
//         'Volume 24h': exchange.quote.USD.volume_24h,
//         'BTC Volume 24h': exchange.quote.BTC.volume_24h,
//         'Market share': exchange.quote.USD.market_share,
//       };
//     });

//     // Print the data to the console
//     console.log(JSON.stringify(rows, null, 2));
//   })
//   .catch(error => {
//     console.error(error);
//   });

function Exchanges() {
  data.sort((a, b) => a.rank - b.rank);


  return (
    <div className="exchange-container" >
      <div className="header-box" >
          <div className="exchange-rank">Rank</div>
          <div className="exchange-name">Name of Exchange</div>
          <div className="exchange-num">No. of coins</div>
          <div className="exchange-fiats">Fiat currencies available</div>
          <div className="exchange-volume">Monthly transaction volume in USD</div>
          <div className="exchange-score">Score /10</div>
        </div>
      {data.map((exchange) => (
        <Link to={`https://coinmarketcap.com/exchanges/${exchange.slug}`} target="_blank" key={exchange.rank} className="exchange-box" >
          <div className="exchange-rank">{exchange.rank}</div>
          <div className="exchange-name">{exchange.name}</div>
          <div className="exchange-num">{exchange.num_coins}</div>
          <div className="exchange-fiats">{exchange.fiats}</div>
          <div className="exchange-volume">{millify(exchange.quote.USD.volume_30d)}</div>
          <div className="exchange-score">{exchange.exchange_score}</div>
        </Link>
      ))}
    </div>
  );
}

export default Exchanges;
