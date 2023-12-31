import{useState,useEffect} from 'react';
import Addmovie from './Addmovie';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {v4} from 'uuid';
import "./movies.css";
export default function Movies()
{
    const[movies,setData]=useState(null);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[status,setStatus]=useState(true);
    useEffect(()=>{
        const url='https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US';
        fetch(url)
        .then((response)=>{
          if(!response.ok){
            let errorObj=new Error('HTTP Error Occurred:'+response.status);
            throw errorObj;
          }
         return response.json();
        }
        ).then((actualData)=>{
        setData(actualData.results);
          setError(null);
        }).catch((err)=>{
          setError(err.message);
          setData(null);
        }).finally(()=>{
          setLoading(false);
        })
       },[])
       const handleClick=()=>
       {
          setStatus(false);
       }
       return(
        <>
        {status&&<div className='movie'>
          <br/>
          <h1><div className='hdiv'>List of Top Rated Movies</div></h1>
          <button onClick={handleClick}><div className='bdiv'>Add more movies</div></button>
         {loading && <div className='hdiv'>Loading. Please wait. . .</div>}
         {error &&(<div>{`There is a problem in loading the user data:${error}`}</div>)}
         <ul>
          {movies && movies.map((movie)=>(
            <div key={v4()}className='movie_box'>
            <li>
              {movie.video && <img className='movie_backdrop' src={`${movie.backdrop_path}`}alt='Not found' ></img>}
              {!movie.video && <img className='movie_backdrop' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}alt='Not found' ></img>}<br/><br/>
              <h3 className='head'>Title : </h3><h3 className='text'>{movie.original_title}</h3><br/><hr/><br/>
              <div className='size_overview'><h3 className='head'>Overview : </h3><h3 className='text'>{movie.overview}</h3></div><br/><hr/><br/>
              <h3 className='head'>Rating : </h3><h3 className='text'>{movie.vote_average}</h3><br/><hr/><br/>
              <h3 className='head'>Release date : </h3><h3 className='text'>{movie.release_date}</h3>
            </li>
            </div>
          ))}
         </ul>
        </div>}
        {!status&&<div><Addmovie movieDetail={movies}setDataMovie={setData} setStatus={setStatus}/></div>}
        </>
      )
}