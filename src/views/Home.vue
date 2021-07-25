<template>
  <div id="home" class="grid-container">
    <!-- Heade con propiedad de título -->
    <app-header class="header" :title="title"></app-header>
    <!-- Banner con propiedades mensaje y tipo, y que procesa el evento clear-banner -->
    <app-banner
      class="banner"
      :bannerMessage="messageToDisplay"
      :bannerType="messageType"
      @clear-banner="clearMessage"
    ></app-banner>
    <!-- Buscador, emite el evento pasando la ciudd que tiene -->
    <app-weather-search class="weather-search" @search-city="searchCity"></app-weather-search>
    <!-- Resultados del tiempo -->
    <app-weather-results
      class="weather-results"
      v-bind="weatherData"
      v-if="validWeatherData"
      v-on:clear-weather-data="resetData"
    ></app-weather-results>
    <!-- Footer con propieda de mensaje -->
    <app-footer class="footer" :message="footerMessage"></app-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Banner from '@/components/Banner.vue';
import Search from '@/components/Search.vue';
import Weather from '@/components/Weather.vue';

export default defineComponent({
  name: 'Home',
  // Mis componentes
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-banner': Banner,
    'app-weather-search': Search,
    'app-weather-results': Weather,
  },
  // Mis datos
  data: () => ({
    // Título de la App
    title: 'Vue Weather App',
    // Mensaje del Footer
    footerMessage: 'joseluisgs 2021',
    // Mensaje del banner
    messageToDisplay: '',
    // Tipo del banner (Info, Success o Error)
    messageType: 'Info',
    // Objeto de información meteorológica openweathermap.org
    weatherData: {
      city: '',
      weatherSummary: '',
      weatherDescription: '',
      currentTemperature: 0.0,
      highTemperature: 0.0,
      lowTemperature: 0.0,
    },
    // Nos indica si los datos se han cargado
    validWeatherData: false,
    // API key openweathermap.org
    openweathermapApiKey: 'b3435b6ecd502d0fbf9605a5f8b3343d',
  }),
  // Ciclo de validate
  // Al crearme
  created() {
    // comprobamos la API KEY
    if (this.openweathermapApiKey === '') {
      this.messageType = 'Error';
      this.messageToDisplay = '¡Error! No se dispone de la API Key de OpenWeather.org';
    }
  },
  // Mis métodos
  methods: {
    // Limpia el banner
    clearMessage() {
      this.messageToDisplay = '';
      this.messageType = 'Info';
    },
    // Busca una ciudad. Maneja el evento search-city
    async searchCity(inputCity: string) {
      console.log(inputCity);
      const lang = 'es';
      const units = 'metric';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}
        &units=${units}&lang=${lang}&APPID=${this.openweathermapApiKey}`;
      // Obtenemos la respuesta
      try {
        const response = await axios.get(url);
        // Respuesta correcta
        this.messageType = 'Success';
        this.messageToDisplay = `¡Éxito! Información meteorológica recibida de ${response.data.name}!`;
        console.log(response);
        // Procesamos los datos
        this.weatherData.city = response.data.name;
        this.weatherData.weatherSummary = response.data.weather[0].main;
        this.weatherData.weatherDescription = response.data.weather[0].description;
        this.weatherData.currentTemperature = response.data.main.temp;
        this.weatherData.lowTemperature = response.data.main.temp_min;
        this.weatherData.highTemperature = response.data.main.temp_max;
        this.validWeatherData = true;
      } catch (error) {
        // Si hay error
        this.messageType = 'Error';
        this.messageToDisplay = `¡ERROR! No se ha podido conseguir información meteorlógica de ${inputCity}!`;
        console.log(error.message);
        this.resetData();
      } finally {
        console.log('¡HTTP GET Listo!');
      }
    },
    // Limpia los datos
    resetData() {
      this.weatherData = {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        lowTemperature: 0.0,
        highTemperature: 0.0,
      };
      this.validWeatherData = false;
      this.messageType = 'Info';
      this.messageToDisplay = '';
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
  box-sizing:border-box;
  padding: 0;
  margin: 0;
}

body {
  background: #f1f3f5;
  font-family: segoe ui,helvetica neue,sans-serif;
  color: #345;
  overflow-x: hidden;
}

/* CSS Grid Styling
*******************/
.header {
  grid-area: header;
}
.banner {
  grid-area: banner;
}
.weather-search {
  grid-area: search;
}
.weather-results {
  grid-area: results;
}
.footer {
  grid-area: footer;
}
.grid-container {
  display: grid;
  grid-template-columns: 10% 35% 35% 10%;
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 10px;
  max-width: 1080px;
  margin: auto;
  grid-template-areas:
    "header   header     header    header"
    "banner   banner     banner    banner"
    "...      search     search    ..."
    "...      results    results   ..."
    "footer   footer     footer    footer";
}
</style>
