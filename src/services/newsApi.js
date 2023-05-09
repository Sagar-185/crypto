import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (q, count) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search?',
    params: {
        q,
        count,
        freshness: 'Day',
        textFormat: 'Raw',
        safeSearch: 'Off'
      },
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '4530319771msh126b09f1d1d51aep133738jsn69f17cd9a002',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.request(options);
        // console.log('data is in')
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { data, loading, error };
};

export default useFetchData;
