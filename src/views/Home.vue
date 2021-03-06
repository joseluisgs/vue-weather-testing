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
import Servicio from '@/services/Weather';
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
  }),
  // Ciclo de validate
  // Al crearme
  created() {
    // comprobamos la API KEY
    if (!Servicio.getKey()) {
      this.messageType = 'Error';
      this.messageToDisplay = 'Error! No OpenWeather.org API KEY';
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
      // Obtenemos la respuesta
      try {
        const response = await Servicio.getInfo(inputCity);
        // Respuesta correcta
        this.messageType = 'Success';
        this.messageToDisplay = `Success! Meto Info from ${response.name}`;
        // Procesamos los datos
        this.weatherData.city = response.name;
        this.weatherData.weatherSummary = response.weather[0].main;
        this.weatherData.weatherDescription = response.weather[0].description;
        this.weatherData.currentTemperature = response.main.temp;
        this.weatherData.lowTemperature = response.main.tempMin;
        this.weatherData.highTemperature = response.main.tempMax;
        this.validWeatherData = true;
      } catch (error) {
        // Si hay error
        this.messageType = 'Error';
        this.messageToDisplay = `ERROR! Can't find info from ${inputCity}!`;
        console.log(error.message);
        // this.resetData();
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
