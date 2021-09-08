<template>
    <div>
        <Navegacion/>
            <v-data-table
                :headers="headers"
                :items="citas"
                sort-by="calories"
                class="elevation-1"
            >
                <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>HISTORIAL DE CITAS</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                    v-model="dialog"
                    max-width="500px"
                    >
                    <v-card>
                        <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedCita.servicio.descripcion"
                                label="Servicio"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedCita.cliente.apellidos"
                                label="Cliente"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedCita.turno.fecha_inicio"
                                label="Fecha"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedCita.estado"
                                label="Estado"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedCita.servicio.precio"
                                label="Precio"
                                ></v-text-field>
                            </v-col>
                            </v-row>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="onCancelCita"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogCancelCita" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">¿Esta seguro de cancelar su cita?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialogCancelCita">No</v-btn>
                        <v-btn color="blue darken-1" text @click="cancelCita">Sí</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">¿Está seguro que desea eliminar?</v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>
                <template v-slot:item.actions="{item}">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
                <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="getHistorial"
                >
                    Reset
                </v-btn>
                </template>
            </v-data-table>

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
            dialog: false,
            dialogDelete: false,
            dialogCancelCita:false,
            headers: [
            {
                text: 'Servicio',
                align: 'start',
                sortable: false,
                value: 'servicio.descripcion',
                width: '25%'
            },
            { text: 'Cliente', value: 'cliente.apellidos', width: '25%' },
            { text: 'Fecha', value: 'turno.fecha_inicio',width: '20%' },
            { text: 'Estado', value: 'estado', width: '10%' },
            { text: 'Precio', value: 'servicio.precio', width: '10%' },
            { text: 'Acciones', value: 'actions', sortable: false, width: '10%' },
            ],
            editedIndex: -1,
            editedCita: {
                servicio: '',
                cliente: '',
                estado: '',
                turno: '',
                fecha: '',
            },
            defaultItem: {
                servicio: '',
                cliente: '',
                estado: '',
                turno: '',
                fecha: '',
            },
        }
    },
      components:{
        Navegacion,
    },
    mounted(){
        this.getHistorial();
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getHistorial()
    },

    methods:{
        onCancelCita(){
            this.dialogCancelCita = true

        },    

        cancelCita(){

        },

        getHistorial(){
            let _this = this;
            axios.get('http://localhost:8000/api/profesional/citas/'+ _this.idPersona)
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

      editItem (item) {
        this.editedIndex = this.citas.indexOf(item)
        this.editedCita = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.citas.indexOf(item)
        this.editedCita = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.citas.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedCita = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      
      closeDialogCancelCita(){
        this.dialogCancelCita = false
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedCita = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.citas[this.editedIndex], this.editedCita)
        } else {
          this.citas.push(this.editedCita)
        }
        this.close()
      },
    }

}
</script>