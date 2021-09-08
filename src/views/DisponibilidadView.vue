<template>
  <div class="root">
    <Navegacion></Navegacion>
    <v-container class="d-flex justify-center mt-5">
          <v-col
      col="12"
      md="6"
    >
    <Disponibilidad v-if="isloaded" :isProfes="bol" :idProfesional="profesional.id"></Disponibilidad>
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
          persona: {},
          bol:true,
          prof:true,
          profesional:{},
          isloaded:false
          
        }
    },
    components:{
      Navegacion,Disponibilidad
    },
    mounted(){
      this.getPersonas()
      

    },

    methods:{
              getPersonas () {
                let axios = require('axios').default;
        let token = localStorage.getItem('token',token);
        let base64URL = token.split('.')[1];
        let base64 = base64URL.replace('-','+').replace('_','/')
        let decrypt = JSON.parse(window.atob(base64));
        axios.get(`http://localhost:8000/api/personas/${decrypt.sub}/?token=`+token, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((response)=> {
                if(response.status==200) {
                  this.persona = response.data;
                  

                }
            })
            .catch(function(err) {
                console.log(err);
            })
        axios.get(`http://localhost:8000/api/personaProfesional/${decrypt.sub}`).then(res => {
            if(res.data.length != 0){
                this.prof= true;
                this.profesional=res.data[0]
                console.log(this.profesional.id)
                this.isloaded=true
            }
        }).catch(function(err) {
                console.log(err);
        })        
        //this.$refs.form.validate()
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
