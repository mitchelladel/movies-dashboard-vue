<script>
import MovieCard from "../components/MovieCard.vue";
import { fetchMovies, searchMovie } from "../stores/movies";
import { Empty_SEARCH_URL } from "../Utils/constants";

export default {
  components: {
    MovieCard,
  },
  name: "get-movies",
  data() {
    return {
      movies: null,
      movieText: "",
      filteredMovies: null,
      genres: null,
      genre: "",
    };
  },
  async mounted() {
    const data = await fetchMovies();

    this.movies = data;
    this.filteredMovies = data;

    const genres = ["All"];
    this.movies?.forEach((element, index, array) => {
      element?.genres.forEach((genre, index, array) => {
        if (genres.includes(genre)) return;
        genres.push(genre);
      });
    });
    this.genres = genres;
  },

  methods: {
    handleChange: function () {
      const filtered = this.movies.filter((movie) => {
        return movie.name.toLowerCase().includes(this.movieText.toLowerCase());
      });
      this.filteredMovies = filtered;
    },

    getSelectedGenre: function () {
      var e = document.getElementById("movies-genres");
      var value = e.value;
      this.selectedGenre = value;
      if (value === "All") {
        this.filteredMovies = this.movies;
        return;
      }
      const filtered = this.movies?.filter((movie) => {
        return movie?.genres.includes(value);
      });
      this.filteredMovies = filtered;
    },
    searchForMovie: async function (event) {
      if (event.key === "Enter") {
        const response = await searchMovie(this.movieText);
        console.log("response", response);

        try {
          if (response.id && response.url) {
            window.open(response.url, "_blank");
          }
        } catch {
          window.open(Empty_SEARCH_URL, "_blank");
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="controller">
      <input
        v-model="movieText"
        placeholder="Search Movie"
        v-on:input="handleChange()"
        class="input-field"
        id="input-filed"
        @keydown="searchForMovie"
      />

      <label for="dog-names">Genre</label>
      <select
        name="movies-genres"
        id="movies-genres"
        v-model="genre"
        v-on:input="getSelectedGenre"
        v-bind:value="genre"
        v-bind:key="genre"
      >
        <option
          v-for="genre in genres"
          key="genre"
          :value="genre"
          id="movie-selected"
        >
          {{ genre }}
        </option>
      </select>
    </div>

    <div class="movie-dashboard-row">
      <div v-for="movie in filteredMovies" key="movie.id">
        <MovieCard
          :img="movie.image.medium"
          :url="movie.url"
          :rating="movie.rating.average"
          :genres="movie.genres"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-dashboard-row {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100vh;
  background: black;
  overflow: auto;
}

.input-field {
  margin-bottom: 30px;
  border: 3px solid;
  border-radius: 3px;
}
#movies-genres {
  border-radius: 3px;
}
.controller {
  text-align: justify;
}
</style>