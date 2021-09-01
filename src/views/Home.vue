<template>
  <div class="root">
    <Navegacion></Navegacion>
    <v-contianer class="d-flex justify-center mt-5">
          <v-col
      col="12"
      md="6"
    >
      <v-form>
        <v-row>
          <v-col cols="12"
          md="10">
            <v-text-field
            label="Buscar Profesional"
            :rules="rules"
            hide-details="auto"
            color="black"
          ></v-text-field>
          </v-col>
          <v-col cols="12"
          md="2"
            class="d-flex align-center"
          >
            <v-btn
              @click="buscar"
            >
            Buscar
            </v-btn>  
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    </v-contianer>
  </div>
  
  
</template>

<script>

  import Navegacion from '../components/Navegacion.vue';
  export default {
    name: 'Home',
    components:{
      Navegacion,
    },
    methods:{
      buscar: function(){
        alert("buscando")
      }
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
