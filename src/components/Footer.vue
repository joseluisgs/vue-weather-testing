<template>
  <footer>
    <h1>{{ message }}</h1>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  // Mis propiedades
  props: {
    message: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  margin: auto;
}

</style>
