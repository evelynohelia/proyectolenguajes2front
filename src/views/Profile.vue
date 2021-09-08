<template>
    <div class="root">
        <Navegacion/>
        <v-container>
        <v-row class="mt-3">
            <v-col
                cols="12"
                md="2"
            >
                <div>
                    <img src="https://via.placeholder.com/200" alt="foto">
                </div>
            </v-col>
            <v-col
                cols="12"
                md="10"                
            >
                <h3>{{persona.nombres}} {{persona.apellidos}}</h3>
                <p>{{persona.fecha_nacimiento}}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius enim vel euismod dapibus. Mauris gravida consectetur enim. Donec dapibus ipsum metus, et placerat nisi suscipit vel. Aliquam erat volutpat. Ut ligula dui, volutpat et arcu feugiat, sagittis blandit neque. Phasellus suscipit lorem purus, quis consectetur nunc posuere vel. Nunc vulputate in quam eu imperdiet. Nunc iaculis lectus et lorem maximus molestie. Integer tempus massa et rutrum dictum. Integer pulvinar magna et est interdum blandit. Curabitur et orci ante.</p>

            
            </v-col>
        </v-row>
        <v-row class="my-3" v-if="!prof">
            <v-btn v-on:click="createProf()">
                <div>Convertirme en Profesional</div>
            </v-btn>
        </v-row>
        <v-row class="my-3" v-if="prof">
            <v-btn v-on:click="deleteProf()">
                <div>Dejar de ser Profesional</div>
            </v-btn>
        </v-row>
        <v-form>
            <v-container>
            <v-row justify="center">
            <v-col>
            
            <v-text-field
            v-model="persona.nombres"
            label="Nombres"
            required
            ></v-text-field>
                          <v-text-field
            v-model="persona.apellidos"
            label="Apellidos"
            required
          ></v-text-field>
          <v-btn v-on:click="editarDatos()">Editar Campos</v-btn>
          </v-col>
          <v-col>
          <h3>Fecha Nacimiento</h3>
          <v-date-picker v-model="persona.fecha_nacimiento"></v-date-picker>
          </v-col>
          </v-row >
            </v-container>
        </v-form>
        </v-container>
    </div>
</template>

<script>
import Navegacion from "../components/Navegacion.vue";
import axios from 'axios';
export default {
    name:"Profile",
    components:{
        Navegacion,
    },
    data(){
        return{
            persona: {},
            prof: false,
        };
    },
    mounted(){
        this.getPersonas();
    },
    methods:{
        getPersonas () {
        let token = localStorage.getItem('token',token);
        let base64URL = token.split('.')[1];
        let base64 = base64URL.replace('-','+').replace('_','/')
        let decrypt = JSON.parse(window.atob(base64));
        axios.get(`http://localhost:8000/api/personas/${decrypt.sub}/?token=`+token, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((response)=> {
                if(response.status==200) {
                  this.persona = response.data;
                  console.log(response.data);

                }
            })
            .catch(function(err) {
                console.log(err);
            })
        axios.get(`http://localhost:8000/api/personaProfesional/${decrypt.sub}`).then(res => {
            if(res.data.length != 0){
                this.prof= true;
            }
        }).catch(function(err) {
                console.log(err);
        })        
        //this.$refs.form.validate()
      },
      createProf(){
          axios.post(`http://localhost:8000/api/profesionales`,{
              persona_id: this.persona.id
          }).then( ()=> {
              window.location.reload();
          }).catch(function(err) {
                console.log(err);
            })     
      },
      deleteProf(){
        axios.get(`http://localhost:8000/api/personaProfesional/${this.persona.id}`).then(res => {
          axios.delete(`http://localhost:8000/api/profesionales/${res.data[0].id}`).then( ()=> {
              window.location.reload();
          }).catch(function(err) {
                console.log(err);
        })  
        }).catch(function(err) {
                console.log(err);
        })  

      }
      ,
      editarDatos(){
          let token = localStorage.getItem('token',token);
          let persona = this.persona;
          axios.put(`http://localhost:8000/api/personas/${this.persona.id}/?token=`+token,persona, 
          {headers: {'X-Requested-With': 'XMLHttpRequest'}
          }
          ).then((res) =>{

              console.log(res.data)
              window.location.reload();
          }).catch(function(err) {
                console.log(err);
            })    
      }
    }
}
</script>
<style scoped>
    img{
        max-width: 100%;
        max-height: 100%;
        display: block; /* remove extra space below image */
    }
</style>