import React, { useEffect,useState } from 'react'
import './List.css';


export default function List() {

    const [updatedMovieList, setMovieList] = useState([]);
    const [listName,setListName]=useState("")
    useEffect(() => {
      const savedList = JSON.parse(localStorage.getItem('savedMovieList')) || [];
      const savedName=localStorage.getItem("listName")||"";
      setMovieList(savedList);
      setListName(savedName)
    }, []);

    const url="https://www.imdb.com/title/"


  return (
    <div>
        <h1>{listName}</h1>
        <div  className='my-list'>
        {updatedMovieList.length>0?updatedMovieList.map(movie=>(
            <div className='movie'>
                {movie.Poster !== "N/A" && (
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                )}
                <div>
                <h2>{movie.Title}({movie.Year})</h2>
                <a className="imdb-link" href={url+movie.imdbID}>Go to IMDB page</a>
                </div>
            </div>
        )):<p className='empty-message'>Your list is empty. Add some movies!</p>}
        </div>
    </div>
  )
}

