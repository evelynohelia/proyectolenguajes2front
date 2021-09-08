<template>
  <div class="root">
    <Navegacion></Navegacion>
    <v-container class="d-flex justify-center mt-5">
          <v-col
      col="12"
      md="6"
    >
    <Disponibilidad :isProfes="bol"></Disponibilidad>
    </v-col>
    </v-container>
  </div>
</template>

<script>

  import Navegacion from '../components/Navegacion.vue';
  import Disponibilidad from '../components/Disponibilidad.vue';
  export default {
    name: 'Home',
    data () {
        
        return{
          bol:true
        }
    },
    components:{
      Navegacion,Disponibilidad
    },
    mounted(){
      console.log(this.bol)

    },

    methods:{

    },
    }
</script>

<style>
  .root{
    background-image: url("https://www.nicepng.com/png/full/225-2250557_world-world-map-black-and-grey-poster-36.png");
    width :100vw;
    height :100vh;
    background-size: cover;
    position: fixed;
    overflow: scroll;
  }
</style>
