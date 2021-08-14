import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchContextProvider from "./context/SearchContext";
import TopRated from "./pages/topRated/TopRated";
import Discover from "./pages/discover/Discover";
import Popular from "./pages/popular/Popular";
import Upcoming from "./pages/upcoming/Upcoming";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import Navbar from "./components/navbar/Navbar";
import NowPlaying from "./pages/nowPlaying/NowPlaying";
import Search from "./pages/search/Search";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <SearchContextProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Discover} />
            <Route path="/React.js-movies" component={Discover} />
            <Route path="/popular" component={Popular} />
            <Route path="/top-rated" component={TopRated} />
            <Route path="/upcoming" component={Upcoming} />
            <Route path="/now-playing" component={NowPlaying} />
            <Route path="/search" component={Search} />
            <Route path="/movie/:id" component={MovieDetails} />
          </Switch>
        </div>
      </SearchContextProvider>
    </BrowserRouter>
  );
}

export default App;
