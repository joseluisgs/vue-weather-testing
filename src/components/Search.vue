<template>
  <div class="weather-search">
    <div class="weather-search-title">
      <h2>Weather Search</h2>
    </div>
    <div class="weather-search-input">
      <label for="cityInput">City:</label>
      <input
        type="text"
        id="cityInput"
        v-model.trim="inputCity"
        placeholder="Enter a city name..."
      />
      <br />
      <div class="weather-search-buttons">
        <button type="submit" @click="searchCity" :disabled="searchDisabled">Search</button>
        <button type="reset" @click="clearCity" :disabled="clearDisabled">Clear</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Search',
  // Mis datos
  data: () => ({
    // input Ciudad
    inputCity: '',
  }),
  // Propiedades computadas
  computed: {
    // Desactiva el buscador
    searchDisabled(): boolean {
      return !this.inputCity;
    },
    // Limpia el buscador
    clearDisabled(): boolean {
      return !this.inputCity;
    },
  },
  // Mis métodos
  methods: {
    // lanza el evento search-city con el valor de inputCity
    searchCity() {
      this.$emit('search-city', this.inputCity);
    },
    // limpia el inputCity
    clearCity() {
      // this.$emit('reset-city')
      this.inputCity = '';
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weather-search {
  margin: auto;
}

.weather-search-title h2 {
  text-align: center;
  margin-bottom: 0.5em;
}

.weather-search-buttons {
  margin: 0.5em;
}

.weather-search-input {
  text-align: center;
}

.weather-search-input label {
  font-size: 1.35em;
  margin-right: 0.5em;
}

.weather-search-input input {
  font-size: 1.1em;
}

.weather-search-buttons button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  margin: 6px;
}

.weather-search-buttons button:hover {
  color: rgb(94, 255, 215);
  cursor: pointer;
}

.weather-search-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
