import { useState } from "react";
import "./movieApp.css";

export const MovieApp = () => {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); 

  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const apiKey = "apiKey";

  const handleInputChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const response = await fetch(
        `${urlBase}?query=${search}&api_key=${apiKey}&language=es-ES`
      );
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const data = await response.json();
      setMovieList(data.results); 
    } catch (error) {
      setError("Ha ocurrido un error al buscar películas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Buscador de Películas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribí una película"
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Buscando...</p>}
      {error && <p className="error">{error}</p>}
      {movieList.length > 0 && (
        <div className="movie-list">
          {movieList.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      )}
      {!loading && searched && movieList.length === 0 && !error && (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};
