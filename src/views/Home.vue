<template>
  <div class="home">
    <app-header class="header" v-bind:title="title"></app-header>
    <app-footer class="footer" v-bind:message="footerMessage"></app-footer>
    Vue Testing
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'Home',
  // Mis componentes
  components: {
    'app-header': Header,
    'app-footer': Footer,
  },
  // Mis datos
  data: () => ({
    title: 'Vue Weather App',
    footerMessage: 'joseluisgs 2021',
  }),
});
</script>
