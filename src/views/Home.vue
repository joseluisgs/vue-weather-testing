<template>
  <div class="home">
    <!-- Heade con propiedad de título -->
    <app-header class="header" v-bind:title="title"></app-header>
    <!-- Banner con propiedades mensaje y tipo, y que procesa el evento clear-banner -->
    <app-banner
      class="banner"
      v-bind:bannerMessage="messageToDisplay"
      v-bind:bannerType="messageType"
      v-on:clear-banner="clearMessage"
    ></app-banner>
    Vue Testing
    <!-- Footer con propieda de mensaje -->
    <app-footer class="footer" v-bind:message="footerMessage"></app-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Banner from '@/components/Banner.vue';

export default defineComponent({
  name: 'Home',
  // Mis componentes
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-banner': Banner,
  },
  // Mis datos
  data: () => ({
    // Título de la App
    title: 'Vue Weather App',
    // Mensaje del Footer
    footerMessage: 'joseluisgs 2021',

    // Mensaje del banner
    messageToDisplay: 'Pepe',
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
  },
});
</script>
