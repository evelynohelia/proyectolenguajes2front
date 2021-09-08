<template>
    <div>
        <Navegacion/>
            <v-list flat>
            <v-toolbar-title class="pt-5 pl-5 ma-3">CITAS PENDIENTES</v-toolbar-title>

            <v-list-item-group
                v-model="selectedCita"
                color="primary"
            >
                <v-list-item
                v-for="(cita, i) in citasPendientesProfesional"
                :key="i"
                class="item-cita my-1"
                >
                
                <v-list-item-icon>
                    <v-icon class="img-client">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-row>
                        <v-col class="col-8">
                            <v-list-item-title>Cliente: {{cita.cliente.nombres}} {{cita.cliente.apellidos}} </v-list-item-title>
                            <v-list-item-subtitle>Servicio: {{cita.servicio.descripcion}}</v-list-item-subtitle>
                            <v-list-item-subtitle>fecha: {{cita.turno.fecha_inicio}}</v-list-item-subtitle>
                        </v-col>
                        <v-col class="col-2">
                                <h3 class=" pt-5 price center-content">$ {{cita.servicio.precio}}</h3>
                        </v-col>
                        <v-col class="col-2">

                            <v-btn
                                class="delete"
                                color="error"
                                plain
                                @click="onAceptar(cita)"
                                >
                                Aceptar
                            </v-btn>
                            <v-btn
                                class="delete"
                                color="primary"
                                plain
                                @click="onRechazar(cita)"
                                >
                                Rechazar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>
    </div>
</template>

<style scoped>
    .item-cita{
        height: 100px;
        background-color: #dcdcdc36;
    }
    .price{
        margin-right: 20%;
        text-align: right;
    }
    .delete{
        display: table;
        margin-left: auto;
    }

    .item-right{
        margin-right: 20%;
        float: right;
        border-radius: 5px !important;
        font-size: 12px !important;
        height: 18px !important;
    }
    .center-content{
        display: table-cell;
        vertical-align: middle;
    }
    
</style>

<script>


import Navegacion from "../components/Navegacion.vue";
import axios from 'axios'
export default {
    name:"Profile",
    data () {
      return {
            idPersona: this.$route.params['id'],
            citas: [],
            selectedCita:"",
        }
    },
      components:{
        Navegacion,
    },
    mounted(){
        this.getHistorial();
    },
   
    created () {
      this.getHistorial()
    },

    computed: {
       citasPendientesProfesional(){
          if(this.citas){
            let result = this.citas.filter(cita => cita.estado == "Pendiente");
            return result
          }
        return [];
      }
    },

    methods:{
        onAceptar(cita){
            let _this = this;
            axios.post('http://localhost:8000/api/changeStatusCitas/'+ cita.id,
            {'status': 'Aceptado'}
            )
            .then(function(res) {
                if(res.status==200) {
                   console.log(res);
                    _this.dialogCancelCita = false
                    _this.dialog = false
                    _this.getHistorial()
                }
            })
            .catch(function(err) {
                console.log(err);
            })

        },
        onRechazar(cita){
            let _this = this;
            axios.post('http://localhost:8000/api/changeStatusCitas/'+ cita.id,
            {'status': 'Rechazado'}
            )
            .then(function(res) {
                if(res.status==200) {
                   console.log(res);
                    _this.dialogCancelCita = false
                    _this.dialog = false
                    _this.getHistorial()
                }
            })
            .catch(function(err) {
                console.log(err);
            })

        },     
        getHistorial(){
            let _this = this;
            axios.get('http://localhost:8000/api/cliente/citas/'+ _this.idPersona)
            .then(function(res) {
                if(res.status==200) {
                    _this.citas = res.data;
                }
                console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            })
        },
    }

      

}
</script>