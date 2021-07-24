<template>
  <div class="home">
    <!-- Heade con propiedad de título -->
    <app-header class="header" :title="title"></app-header>
    <!-- Banner con propiedades mensaje y tipo, y que procesa el evento clear-banner -->
    <app-banner
      class="banner"
      :bannerMessage="messageToDisplay"
      :bannerType="messageType"
      @clear-banner="clearMessage"
    ></app-banner>
    <app-weather-search class="weather-search" @search-city="searchCity"></app-weather-search>
    Vue Testing
    <!-- Footer con propieda de mensaje -->
    <app-footer class="footer" :message="footerMessage"></app-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Banner from '@/components/Banner.vue';
import Search from '@/components/Search.vue';

export default defineComponent({
  name: 'Home',
  // Mis componentes
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-banner': Banner,
    'app-weather-search': Search,
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
  }),
  // Mis métodos
  methods: {
    // Limpia el banner
    clearMessage() {
      this.messageToDisplay = '';
      this.messageType = 'Info';
    },
    // Busca una ciudad. Maneja el evento search-city
    searchCity(inputCity: string) {
      console.log(inputCity);
    },
  },
});
</script>
