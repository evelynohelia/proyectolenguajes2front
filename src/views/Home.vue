<template>
  <div class="root">
    <Navegacion></Navegacion>
    <Disponibilidad></Disponibilidad>
    <v-contianer class="d-flex justify-center mt-5">
          <v-col
      col="12"
      md="6"
    >
          <v-text-field
      label="Buscar Profesional"
      :rules="rules"
      hide-details="auto"
      color="black"
    ></v-text-field>

    </v-col>
    </v-contianer>
  </div>
  
</template>

<script>

  import Navegacion from '../components/Navegacion.vue';
  import Disponibilidad from '../components/Disponibilidad.vue';
  export default {
    name: 'Home',
    components:{
      Navegacion,
      Disponibilidad,
    }
  }
</script>

<style scoped>
  .root{
    background-image: url("https://www.nicepng.com/png/full/225-2250557_world-world-map-black-and-grey-poster-36.png");
    width :100vw;
    height :100vh;
    background-size: cover;
  }
</style>
