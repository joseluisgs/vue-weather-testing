<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  // Mis propiedades
  props: {
    title: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  margin: auto;
}

header h1 {
  font-size: 2.5em;
}
</style>
