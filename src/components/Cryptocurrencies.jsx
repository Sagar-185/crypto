import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetCryptosQuery from "../services/cryptoApi";
import millify from 'millify';
function Cryptocurrencies({query}) {
  const { data, loading } = useGetCryptosQuery(100);
  const [searchTerm, setSearchTerm] = useState('')

  const [cryptos, setCryptos] = useState([]);
  console.log("query " + query);
  // console.log('coin data loaded? '+ data?.data?.coins);
  // console.log("divider");
  useEffect(() => {
    if (data && data.data && data?.data?.coins) {
      setCryptos(data?.data?.coins);
    }
  }, [data]);
  useEffect(()=>{
    const filtered = data?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filtered)
  }, [data, searchTerm])
  
  // console.log(cryptos);
  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="container">
      <div className="search-crypto">
          <input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      <div className="row">
        {cryptos &&
          cryptos.map((crypto) => (
            <div className="col-md-3 mt-4" key={crypto.uuid}>

              <div className="card card-content">
                <div className="card-header" style={{ backgroundColor: "whitesmoke" }} >
                  <div className="symbol" >{crypto.symbol}</div>
                  <div className="image" >
                    <img
                      src={crypto.iconUrl}
                      alt="Card Image"
                      className="card-image"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title">{crypto.name}</h6>
                  <p className="card-text">price: ${millify(crypto.price)}</p>
                  <p className="card-text">change: {millify(crypto.change)}%</p>
                  <p className="card-text">Market Cap: ${millify(crypto.marketCap)}</p>
                  <Link key={crypto.uuid} to={`/crypto/${crypto.uuid}`} className="btn btn-primary">

                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

  );
}

export default Cryptocurrencies;
