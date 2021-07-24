<template>
  <!-- Mostramos con el color adecuado si nos llega un mensaje -->
  <div v-show="bannerMessage" :style="bannerBackgroundColor">
    <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
    <p>{{ bannerMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Banner',
  // Mis propiedades
  props: {
    // Mensaje a mostrar en el banner
    bannerMessage: String,
    // Tipo de banner: Info, Error o Success
    bannerType: String,
  },
  // Propiedades computadas
  computed: {
    // Ajusta el color del banner
    bannerBackgroundColor() {
      const property = 'background-color:';
      let value = 'blue';
      if (this.bannerType === 'Error') {
        value = 'red';
      } if (this.bannerType === 'Success') {
        value = 'green';
      }
      return property + value;
    },
  },
  // Mis métodos
  methods: {
    // Lanza el evento de limpiar el banner
    clearBannerMessage() {
      this.$emit('clear-banner');
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100%;
  display:inline-block;
  margin-bottom: 15px;
}

span, p {
  padding: 15px;
  color: white;
  width: auto;
}

div {
  float: left;
}

#errorMessageClear {
  float: right;
}

#errorMessageClear:hover {
  color: rgb(242, 245, 98);
  cursor: pointer;
}
</style>
