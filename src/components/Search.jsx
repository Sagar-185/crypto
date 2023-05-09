import React from 'react'
import { useParams } from "react-router-dom";
import News from './News';

function Search() {
    const { query } = useParams();
    console.log(query)
  return (
    <>
    <div className='news-search' > <News query={query}/> </div>
    
    </>
  )
}

export default Search