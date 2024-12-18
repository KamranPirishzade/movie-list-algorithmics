
import React, { use, useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";

export default function Movies() {
  const [search, setSearch] = useState('');
  const [movieData, setData] = useState([]);
  const [error, setError] = useState(null);
  const [movieList,setList]=useState([]);
  const [movieId,setIDs]=useState([]);
  const [saved,setSave]=useState(false);
  const [listName,setListName]=useState("")
  const navigate=useNavigate();

  const goToList=()=>{
    navigate("/list",{state:{movieList}})
  }



  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=dcf39aeb&s=lego`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === 'True') {
          setData(data.Search.slice(0, 10));
          setError(null);
        } else {
          setData([]);
          setError(data.Error || 'An error occurred.');
        }
      })
      .catch((err) => {
        setError('Failed to fetch default movies. Please try again later.');
        console.error(err);
      });
  }, []);

  function searchMovie(e) {
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?apikey=dcf39aeb&s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setData(data.Search || []);
          setError(null);
        } else {
          setData([]);
          setError(data.Error || "An error occurred.");
        }
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      });
  }

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const addMovie=(movie)=>{
    setList((movieList)=>{
      const updatedList=[...movieList,movie]
      console.log(updatedList)
      return updatedList
    })
    setIDs((prevIds=>[...prevIds,movie.imdbID]))
    console.log(movieId)
  }

  const checkMovieAdded=(movie)=>movieId.includes(movie)

  const removeFromList=(id)=>{
    const newList=movieList.filter(movie=>movie.imdbID!=id);
    setList(newList);
    setIDs(newList.map((movie)=>movie.imdbID))
  }

  const saveList=(e)=>{
    e.preventDefault();
    e.target.style.pointerEvents="none";
    localStorage.setItem('savedMovieList', JSON.stringify(movieList));
    localStorage.setItem('listName', listName);
    console.log(listName)
    setSave(true);
  }

  return (
    <div className='container'>
      <form className='search-form' onSubmit={searchMovie}>
        <input
          type="text"
          value={search}
          onChange={handleSearchInput}
          placeholder="Movie name"
          required
        />
        <button type="submit">Search</button>
      </form>

      <div className="movie-and-list">
        <div className="movies">
        {error && <div className='movie-item'><p className="error">{error}</p></div>}
          {movieData.length > 0 ? (
            movieData.map((movie) => (
              <div key={movie.imdbID} className="movie-item">
                <div className='title-year'>
                <div>
                  <h2>{movie.Title}</h2>
                  <p>{movie.Year}</p>
                  {(!checkMovieAdded(movie.imdbID)&&!saved)?(
                <button onClick={()=>{
                  addMovie(movie)
                }} className='add-btn'>+</button>
                ):(<div className='holder'></div>)}
                </div>
                </div>
                {movie.Poster !== "N/A" && (
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                )}

              </div>
            ))
          ) : (
            !error && <div className='movie-item'><p>No movies found. Try searching for something else.</p></div>
          )}
        </div>
        <div className="user-list">
          <form onSubmit={saveList} className='user-list-form'>
            <input type='text' placeholder='List Name...' onChange={(e)=>setListName(e.target.value)} value={listName} required/>
            {movieList.map((movie)=>(
                <div key={movie.imdbID} className='list-item'>
                  <p>{movie.Title}({movie.Year})</p>
                  <button onClick={()=>{
                    removeFromList(movie.imdbID)
                  }}>x</button>
                </div>
              )
            )}
            {movieList.length>0&&!saved?<button  className='save-btn'>Save List</button>:null}
          </form>
          {saved?<button className='go-btn' onClick={goToList}>Go list</button>:null}
        </div>
      </div>  
    </div>
  );
}

