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
  import axios from 'axios';
  export default {
    name: 'Home',
    data () {
      return {
        personas:{}
      }
    },
    components:{
      Navegacion,
    },
    mounted(){
      this.getPersonas();
    },

    methods:{
      buscar: function(){
        alert("buscando")
      },

      async getPersonas () {
        let _this = this;
        let token = localStorage.getItem('token',token);

           await axios.get('http://localhost:8000/api/personas?token='+token, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then(function(response) {
                if(response.status==200) {
                  _this.personas=response.data; 
                  console.log(response.data);
                }
            })
            .catch(function(err) {
                console.log(err);
            })         
        
        //this.$refs.form.validate()
      },
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
