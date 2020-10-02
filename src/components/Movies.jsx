import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./Common/ListGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./Common/Pagination";
import paginate from "../Utils/Paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./Common/SearchBox";
import { Animated } from "react-animated-css";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "_id", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: gotGenres } = await getGenres();
    const { data: gotMovies } = await getMovies();
    // console.log(gotGenres, gotMovies);
    const genres = [{ _id: "", name: "All Genres" }, ...gotGenres];
    this.setState({
      movies: gotMovies,
      genres: genres,
    });
  }

  handleDelete = async (_id) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((movie) => movie._id !== _id);
    this.setState({ movies });
    try {
      await deleteMovie(_id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast.error("Movie already deleted!");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNo) => {
    this.setState({ currentPage: pageNo });
  };

  handleGenreSelect = (genre) => {
    this.handlePageChange(1);
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
    this.handlePageChange(1);
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    // first filter, then sort, and then paginate the movies
    let filteredMovies = movies;
    if (searchQuery) {
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = movies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const itemsCount = filteredMovies.length;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const paginatedMovies = paginate(sortedMovies, pageSize, currentPage);
    return { itemsCount, data: paginatedMovies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { itemsCount, data } = this.getPagedData();
    const { user } = this.props;

    return (
      <Animated
        animationIn="fadeInUp"
        animationOut="fadeOut"
        animationInDuration={350}
        animationOutDuration={350}
        isVisible={true}
      >
        <div className="row mt-4">
          <div className="col-md-3 mb-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-md-9">
            {user && (
              <Link to="/movies/add" className="btn btn-primary mb-3">
                Add a movie
              </Link>
            )}
            <h4 className="mb-3">There are {itemsCount} movies available.</h4>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={data}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={itemsCount}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>
        </div>
      </Animated>
    );
  }
}

export default Movies;
