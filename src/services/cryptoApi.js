import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCryptosQuery = ( count) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit:count,
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': '4530319771msh126b09f1d1d51aep133738jsn69f17cd9a002',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    useEffect(() => {
        const fetchCoins = async () => {
          try {
            const response = await axios.request(options);
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
    
        fetchCoins();
      }, []);
      return { data, loading, error };
    }

export default useGetCryptosQuery;

