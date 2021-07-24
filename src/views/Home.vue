<template>
  <div class="home">
    <app-header class="header" v-bind:title="title"></app-header>
    Vue Testing
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';

export default defineComponent({
  name: 'Home',
  // Mis componentes
  components: {
    'app-header': Header,
  },
  // Mis datos
  data: () => ({
    title: 'Vue Weather App',
  }),
});
</script>
