<template>
    <div>
        <Navegacion/>
            <h3 class="mx-5 my-5">HISTORIAL DE CITAS</h3>
            <v-list flat>

            <v-list-item-group
                v-model="selectedCita"
                color="primary"
            >
                <v-list-item
                v-for="(cita, i) in citas"
                :key="i"
                class="item-cita my-1 "
                >
                <v-list-item-icon>
                    <v-icon class="img-client">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-row>
                        <v-col>
                            <v-list-item-title>Cliente: {{cita.cliente.nombres}} {{cita.cliente.apellidos}} </v-list-item-title>
                            <v-list-item-subtitle>Servicio: {{cita.servicio.descripcion}}</v-list-item-subtitle>
                            <v-list-item-subtitle>fecha: {{cita.turno.fecha_inicio}}</v-list-item-subtitle>
                        </v-col>
                        <v-col>
                            <h3 class="price">$ {{cita.servicio.precio}}</h3>
                            <div>
                            <v-chip
                                class="item-right "
                                color="red"
                                text-color="white"
                                >
                                {{cita.estado}}
                            </v-chip>
                            </div>
                             <v-btn
                                class="delete"
                                color="error"
                                plain
                                >
                                Eliminar
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
        text-align: right;
    }

    .item-right{
        margin-right: 20%;
        float: right;
        border-radius: 5px !important;
        font-size: 12px !important;
        height: 18px !important;
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
            citas: "",
            selectedCita:""
        }
    },
      components:{
        Navegacion,
    },
    mounted(){
        this.getHistorial();
    },
    methods:{
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
        }
    }
}
</script>