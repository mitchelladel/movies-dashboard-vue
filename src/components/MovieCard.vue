<script setup>
defineProps({
  img: {
    type: String,
    required: false,
  },

  genres: {
    type: Array,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="card">
    <a v-bind:href="url" target="_blank" rel="noopener">
      <img v-bind:src="img" test-id="#img" alt="movie-img" color="black" />

      <div class="movie-info">
        <div class="column">{{ rating }}</div>
        <div class="column" v-for="genre in genres" key="genre">
          {{ genre }}
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.card {
  padding: 20px;
  color: black;
  cursor: pointer;
  border-radius: 3px;

  transition: all 0.2s ease-in-out;
}

.movie-info{
    display: flex;
    justify-content: space-around;
}

a{
    color: white;
}

.card:hover {
  background: gray;
  color: white;
  transform: scale(1.1);
  z-index: 1;
}
</style>