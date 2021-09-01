<template lang="html">

  <section class="Disponibilidad">
    
    <v-container class="grey lighten-5" >
    <v-row no-gutters >
      <v-col
        cols="6"
        sm="6"
        
      >
      <h3>Disponibilidad</h3>
      </v-col>
      <v-col
        cols="6"
        sm="6s"
      >
      <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Agregar Turno
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
              
              <v-banner
      v-model="v0"
      single-line
      transition="slide-y-transition"
      font:
    >
      Elija la fecha:

    </v-banner>
    

            
          </v-container>
                <v-menu
        ref="menudate"
        v-model="menudate"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menudate = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menudate.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-banner
      v-model="v0"
      single-line
      transition="slide-y-transition"
      font:
    >
      Elija la hora:

    </v-banner>

  <v-row>
    <v-col
      cols="11"
      sm="5"
    >
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Hora inicial"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu2.save(time)"
        ></v-time-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      cols="11"
      sm="5"
    >
      <v-menu
        ref="menu3"
        v-model="menu3"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time2"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time2"
            label="Hora final"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu3"
          v-model="time2"
          full-width
          @click:minute="$refs.menu3.save(time2)"
        ></v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
  
    <v-banner
      v-model="v0"
      single-line
      transition="slide-y-transition"
      font:
    >
      Escriba una descripcion del servicio:

    </v-banner>
    <v-col col=6>

    <v-text-field
            v-model="Descripcion"
            :rules="nameRules"
            :counter="10"
            label="Descripcion"
            required
          ></v-text-field>
    </v-col>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
      </v-col>


    </v-row>
  <!--aqui termia la parte de arriba del componente-->
  <v-space></v-space>
  <h4 class= "cabecerad">Dias disponibles</h4> 

    
      <v-card height="15rem"
      class="diascard"
      elevation="2"
    >


    <v-card-text class="scroller">
      <v-row  v-for="turno in turnos" :key="turno.dia" align="center"
      justify="center">
        <v-col col=12 sm=2>
          <v-card><h3 class="dia">{{turno.dia}}</h3></v-card>
        </v-col>
        <v-col col=12 sm=3 md=3>

          <v-card><h3 class="dia">Hora inicio:{{turno.horaini}}</h3></v-card>
          
        </v-col>
        <v-col col=12 sm=3 md=3>

          <v-card><h3 class="dia">Hora inicio:{{turno.horafin}}</h3></v-card>
          
        </v-col>
        <v-col col=12 sm=3 md=3>

          <v-btn
          color="blue lighten-5"
          dark
          v-bind="attrs"
          v-on="on"
          align:center
        >
          <p class="eliminar">Eliminar turno</p>
        </v-btn>
          
        </v-col>

          
          
        


        
      </v-row>
      </v-card-text>
      
    </v-card>
    





  </v-container>

  








  </section>




</template>

<script lang="js">

  export default  {
    
    name: 'Disponibilidad',
    props: [],
    mounted () {
      const axios = require('axios').default;
      axios
      .get('http://127.0.0.1:8000/api/turno')
      .then(response => {
        let listadias=[];
        let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        console.log(response.data)
        if(Array.isArray(response.data)){
          response.data.forEach(element => {
          let fechaini=new Date();
          fechaini.setTime(Date.parse(element.fecha_inicio));
          let fechafin=new Date()
          fechafin.setTime(Date.parse(element.fecha_fin));
          let horasini=fechaini.getHours();
          let minutoini1=fechaini.getMinutes();
          let horaini1=""+horasini+":"+minutoini1;
          let horasfin=fechafin.getHours();
          let minutofin1=fechafin.getMinutes();
          let horafin1=""+horasfin+":"+minutofin1;
          let dayName = days[fechaini.getDay()];
          let dia={
            dia:dayName,
            horaini: horaini1,
            horafin:horafin1
          }
          
          listadias.push(dia)

        }
        );
        }
        else{
          let element=response.data
          let fechaini=new Date();
          fechaini.setTime(Date.parse(element.fecha_inicio));
          let fechafin=new Date()
          fechafin.setTime(Date.parse(element.fecha_fin));
          let horasini=fechaini.getHours();
          let minutoini1=fechaini.getMinutes();
          let horaini1=""+horasini+":"+minutoini1;
          let horasfin=fechafin.getHours();
          let minutofin1=fechafin.getMinutes();
          let horafin1=""+horasfin+":"+minutofin1;
          let dayName = days[fechaini.getDay()];
          let dia={
            dia:dayName,
            horaini: horaini1,
            horafin:horafin1
          }
          
          listadias.push(dia)
        }
        


        
        
        
        console.log(listadias)
        this.turnos = listadias})
    },
    data: ()=>({
      dialog:false,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: [],
      info:null,
      time2:null,
      menudate:false,
        menu2: false,
        menu3:false,
        modal2: false,
        turnos:[
          
        ],
    }),
    methods: {

    },
    computed: {

    },
}


</script>

<style scoped lang="scss">
  .Disponibilidad {

  }
  .cabecerad{
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .dia{
    text-align: center;
  }
  .eliminar{
    color:black;
  }
  .diascard{
    display: flex !important;
  flex-direction: column;
    
  }
  .scroller{
    flex-grow: 1;
    overflow: auto;
  }
  html {
  overflow: hidden !important;
}
  
</style>
