<template>
  <div class="root">
    <Navegacion></Navegacion>
    <div v-if="!prof">
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
            v-model="buscarInput"
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
    <div v-else>
      <Disponibilidad v-bind:idProfesional="id" v-bind:isProfes="prof"></Disponibilidad>
    </div>
    </div>
</template>



<script>

  import Navegacion from '../components/Navegacion.vue';
  import ProfCard from '../components/ProfCard.vue';
  import Disponibilidad from '../components/Disponibilidad.vue';
  import axios from 'axios';
  export default {
    name: 'Home',
    data () {
      return {
        personas:{},
        profesionales: [],
        load : false,
        buscarInput: "",
        prof: false,
        id: 0,
      }
    },
    components:{
      Navegacion,
      ProfCard,
      Disponibilidad
    },
    mounted(){
      this.getPersonas();
      this.checkProf();

    },

    methods:{
      buscar: function(){
        this.$router.push({ path: `/search/${this.buscarInput}` })
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
      checkProf(){
        let token = localStorage.getItem('token',token);
        if(token === null){
            this.$router.push('login')
        }else{
            axios.get('http://localhost:8000/api/personas?token='+token, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((response) =>{
                if(response.status!=200) {
                  this.$router.push('login')

                }
            })
            .catch(function(err) {
                console.log(err);
            })     
        }
        let base64URL = token.split('.')[1];

        let base64 = base64URL.replace('-','+').replace('_','/')
        let decrypt = JSON.parse(window.atob(base64));
        this.id = decrypt.sub;
        axios.get(`http://localhost:8000/api/personaProfesional/${decrypt.sub}`).then(res => {
            if(res.data.length != 0){
                this.prof= true;
                this.id = res.data[0].id;
            }
            else{
                axios.get("http://localhost:8000/api/profRecomendados").then(response => {
            this.profesionales = response.data;
            console.log(this.profesionales)
            this.load = true;
        })
            }
        }).catch(function(err) {
                console.log(err);
        })  
      }
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
