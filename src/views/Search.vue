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
        <div class="pa-5">
            <v-row>
                <ProfCard v-for="prof in profesionals" v-bind:profesional="prof" v-bind:key="prof.persona_id"/>
            </v-row>
        </div>
    </div>
</template>

<script>
import Navegacion from "../components/Navegacion.vue";
import ProfCard from '../components/ProfCardSearch.vue';
import axios from 'axios';
export default{
    name:"Search",
    components:{
        Navegacion,
        ProfCard
    },
    methods:{
      buscar: function(){
        this.$router.push({ path: `/search/${this.buscarInput}` })
        window.location.reload();
      }
    },
    mounted(){
        axios.get(`http://localhost:8000/api/buscarNombre/${this.$route.params.data}`).then(response => {
          this.profesionals = response.data;
          console.log(this.profesionals)
        })
    },
    data(){
        return{
            profesionals: [],
        }
    }
}
</script>
