import React, { useEffect, useState } from 'react';
import { AnimeCard } from './components/AnimeCard';
import './App.css';

export interface IAnime {
  i?: number;
  title: string;
  image_url: string;
  episodes: number;
  synopsis: string;
  score: number;
  favorites?: any;
  setFavorites?: any;
}

export const App = () => {
  // const [likedAnime, setLikedAnime] = useState<Array<IAnime>>([]);
  // const [dislikedAnime, setDislikedAnime] = useState<Array<IAnime>>([]);
  const [query, setQuery] = useState<string>('naruto');
  const [results, setResults] = useState<Array<IAnime>>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Array<IAnime>>([]);

  // Fetch anime data on page load.
  useEffect(() => {
    fetchAnimeData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  useEffect(() => {
    console.log(showFavorites);
  }, [showFavorites]);

  // Testing useEffect.
  // useEffect(() => {
  //   console.log(query);
  // }, [query]);

  const fetchAnimeData = (): void => {
    setShowFavorites(false);

    // Define the config we'll need for our Api request
    const url = `https://api.jikan.moe/v3/search/anime?q=${query}`;

    // Make the HTTP Api request
    fetch(url)
      .then((response: Response) => response.json())
      .then((data) => {
        setResults([...data.results]);
      })
      .catch((error) => {
        alert('Error, check console');
        console.error(error);
      });
  };

  const toggleFavoritesSection = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="font-sans antialiased min-h-screen  bg-gray-100 text-gray-900 py-8 flex flex-col place-items-center">
      <div className="text-center flex flex-col space-y-8 w-7/12 lg:w-5/12 h-full">
        {/* Search */}
        <div className="flex space-x-4 justify-center">
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border focus:outline-none rounded-l-lg p-2"
            />
            <button onClick={fetchAnimeData} className="border bg-gray-200 rounded-r-lg p-2">
              Search
            </button>
          </div>
          <button onClick={toggleFavoritesSection} className="border bg-gray-200 rounded-lg p-2">
            Favorites
          </button>
        </div>

        {/* Favorites or results */}
        <div className="flex flex-col space-y-8">
          {showFavorites &&
            favorites.map((result, i) => {
              return (
                <AnimeCard
                  key={i}
                  image_url={result.image_url}
                  title={result.title}
                  score={result.score}
                  episodes={result.episodes}
                  synopsis={result.synopsis}
                ></AnimeCard>
              );
            })}
          {!showFavorites &&
            results.map((result, i) => {
              return (
                <AnimeCard
                  key={i}
                  image_url={result.image_url}
                  title={result.title}
                  score={result.score}
                  episodes={result.episodes}
                  synopsis={result.synopsis}
                  favorites={favorites}
                  setFavorites={setFavorites}
                ></AnimeCard>
              );
            })}
        </div>
      </div>
    </div>
  );
};

// class App extends React.Component {
//   fetchAnimeData = () => {
//     // Define the config we'll need for our Api request
//     let url = 'https://api.jikan.moe/v3/anime/1';
//     // Make the HTTP Api request
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => {
//         alert('Error, check console');
//         console.error(error);
//       });
//   };
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <button onClick={this.fetchAnimeData}>fetch</button>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
