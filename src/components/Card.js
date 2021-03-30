import React, { useState, useEffect } from 'react'
import notFoundImg from '../not-found.png'

export default function Card() {
    let [movie, setMovie] = useState([])
    let [searchInput, setSearchInput] = useState("")
    let [loading, setLoading] = useState(true)

    const getApiData = async () => {
        const API_KEY = '84babbf6'
        const API_URL = `https://www.omdbapi.com/?t=${searchInput}&apikey=${API_KEY}`
        const promise = await fetch(API_URL)
        const apiData = await promise.json()
        console.log(apiData)
        setMovie(apiData)
        setLoading(false)
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const apiCall = async () => {
        try {
            await getApiData()
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        apiCall()
    }, [searchInput])


    return (
        <div class="main-container">
            <div className="searchBar-container">
                <h1 className="title">MINI Movie db</h1>
                <p className="subtitle">Search for a movie!</p>
                <input className="inputBox" placeholder="movie name..." type="text" value={searchInput} onChange={handleChange} />
            </div>
            {movie.Response === "False" ? '' : <div className="card">
                <img src={movie.Poster !== "N/A" ? movie.Poster : notFoundImg} alt="Movie Poster" />
                <div className="movie-description-container">
                    <div className="main-info">
                        <h2 class="movie-title">{movie.Title} ({movie.Year})</h2>
                        <ul className="list">
                            <li className="list-item">{movie.Rated}</li>
                            <li className="list-item">{movie.Genre}</li>
                            <li className="list-item">{movie.Year}</li>
                            <li className="list-item">{movie.Runtime}</li>
                            <li className="list-item">{movie.Released}</li>
                        </ul>
                    </div>
                    <div className="more-info">
                        <p class="text-item">{movie.Plot}</p>
                        <p class="text-item"><span className="info-type">Director:</span> {movie.Director}</p>
                        <p class="text-item"><span className="info-type">Writer:</span> {movie.Writer}</p>
                        <p class="text-item"><span className="info-type">Actors:</span> {movie.Actors} ...</p>
                        <p class="text-item"><span className="info-type">Awards:</span> {movie.Awards}</p>
                        {loading ? <p class="text-item">Loading...</p> : movie.Ratings.map(el => <p class="text-item"><span className="info-type">{el.Source}:</span> <span class="score">{el.Value}</span></p>)}
                        <p class="text-item"><span className="info-type">IMdb Rating:</span> <span class="score">{movie.imdbRating}</span></p>
                        <p class="text-item"><span className="info-type">IMdb Votes:</span> <span class="score">{movie.imdbVotes}</span></p>
                    </div>
                </div>
            </div>}
        </div>
    )
}