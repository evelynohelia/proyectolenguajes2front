<template>
  <div class="root">
    <Navegacion></Navegacion>
    <v-container class="d-flex justify-center mt-5">
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
    </v-container>
    <v-container class="mt-5">
      <v-row v-if="load">
      
        <ProfCard v-for="prof in profesionales" v-bind:profesional="prof" v-bind:key="prof.persona_id">

        </ProfCard>
      </v-row>
    </v-container>
  </div>
</template>

<script>

  import Navegacion from '../components/Navegacion.vue';
  import ProfCard from '../components/ProfCard.vue';
  import axios from 'axios';
  export default {
    name: 'Home',
    components:{
      Navegacion,
      ProfCard
    },
    methods:{
      buscar: function(){
        alert("buscando")
      }
    },
    data(){
      return{
          profesionales: [],
          load : false
      }
    },
    mounted(){
        axios.get("http://localhost:8000/api/profRecomendados").then(response => {
          this.profesionales = response.data;
          console.log(this.profesionales)
          this.load = true;
        })
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
