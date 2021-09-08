<template>
    <div>
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
                <h3>{{persona.persona.nombres}} {{persona.persona.apellidos}}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius enim vel euismod dapibus. Mauris gravida consectetur enim. Donec dapibus ipsum metus, et placerat nisi suscipit vel. Aliquam erat volutpat. Ut ligula dui, volutpat et arcu feugiat, sagittis blandit neque. Phasellus suscipit lorem purus, quis consectetur nunc posuere vel. Nunc vulputate in quam eu imperdiet. Nunc iaculis lectus et lorem maximus molestie. Integer tempus massa et rutrum dictum. Integer pulvinar magna et est interdum blandit. Curabitur et orci ante.</p>
            
            </v-col>
        </v-row>
        </v-container>
        <v-row class="mt-3">
            <v-btn v-on:click="desc = true;disp=false;" v-bind:class="desc ? 'amarillo opcion' : 'opcion' ">
                <div >Descripción del Servicio</div>
            </v-btn>
            <v-btn  v-on:click="desc = false;disp=true;" v-bind:class="disp ? 'amarillo opcion' : 'opcion' ">
                <div >Disponibilidad</div>
            </v-btn>
        </v-row>
        <v-container class="mt-2">
            <div v-if="desc" >Descripcion</div>
            <div v-if="disp" >Disponibilidad</div>
        </v-container>
    </div>
</template>

<script>
import Navegacion from "../components/Navegacion.vue";
import axios from 'axios';
export default {
    name: 'Profile',
    components: {
        Navegacion,

    },
    data(){
        return{
            desc: true,
            disp : false,
            persona: {}
        };
    },
    mounted(){
        axios.get(`http://localhost:8000/api/personaProfesional/${this.$route.params.id}`).then(response => {
            this.persona = response.data[0];
        })
    }
}
</script>
<style scoped>
    img{
        max-width: 100%;
        max-height: 100%;
        display: block; /* remove extra space below image */
    }
    .opcion{
        width: 50%;
    }
    .amarillo{
        background-color: #FFEB3B !important;
    }
</style>