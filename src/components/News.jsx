import React, { useEffect, useState } from "react";
import useFetchData from "../services/newsApi";
import { Link } from "react-router-dom";
import moment from "moment";
import "./News.css";

function News({ query }) {
  const { data, loading, error } = useFetchData("crypto", 100);
  const [news, setNews] = useState([]);
  console.log("query " + query);
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  console.log("divider");
  useEffect(() => {
    if (data && data?.value) {
      setNews(data?.value);
    }
  }, [data]);
  console.log(news);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!news) {
    return <div>Loading...</div>;
  }
  console.log(news);
  if (query) {
    return (
      <div className="container">
        {news.filter(
          (card) =>
            card.name.toLowerCase().includes(query.toLowerCase()) ||
            card.description.toLowerCase().includes(query.toLowerCase())
        ).length === 0 ? (
          <div>Nothing here</div>
        ) : (
          <div className="row-fuckbootstrap">
            {news
              .filter(
                (card) =>
                  card.name.toLowerCase().includes(query.toLowerCase()) ||
                  card.description.toLowerCase().includes(query.toLowerCase())
              )
              .map((card, index) => (
                <Link
                  to={card.url}
                  target="_blank"
                  key={index}
                  className="news-card-body"
                >
                  <div className="card-header">
                    <img
                      className="card-img-top"
                      src={card?.image?.thumbnail?.contentUrl || demoImage}
                      alt={card.name}
                      style={{ maxHeight: "80%", maxWidth: "40%" }}
                    />

                    <h6 className="card-title">{card.name}</h6>
                  </div>
                  <p className="card-text">
                    {card.description.length > 150
                      ? card.description.substring(0, 150) + "..."
                      : card.description}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {moment(card.datePublished).startOf("ss").fromNow()}
                    </small>
                  </p>
                </Link>
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Latest Crypto News</h3>

      <div className="row-fuckbootstrap">
        {news.map((card, index) => (
          <Link to={card.url} target="_blank" key={index} className="news-card-body">
            <div className="card-header">
              <img
                className="card-img-top"
                src={card?.image?.thumbnail?.contentUrl || demoImage}
                alt={card.name}
                style={{ maxHeight: "80%", maxWidth: "40%" }}
              />

              <h6 className="card-title">{card.name}</h6>
            </div>
            <p className="card-text">
              {card.description.length > 150
                ? card.description.substring(0, 150) + "..."
                : card.description}
            </p>
            <p className="card-text">
              <small className="text-muted">
                {moment(card.datePublished).startOf("ss").fromNow()}
              </small>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default News;
