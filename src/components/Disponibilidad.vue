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
      <template v-if=isProfes v-slot:activator="{ on, attrs }">
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
      
      single-line
      transition="slide-y-transition"
      font:
    >
      Escriba una descripcion del servicio y precio:

    </v-banner>
    <v-row align="center"
      justify="center">
    <v-col col=5  md=6>

    <v-text-field
            v-model="Descripcion"
            
            :counter="50"
            label="Descripcion"
            required
          ></v-text-field>
    </v-col>
    <v-col col=3 md=5>

    <v-text-field
            v-model="precio"
            
            :counter="3"
            label="Precio"
            required
          ></v-text-field>
    </v-col>
    
    </v-row>

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
             v-on:click="agregarTurno({fecha:date,horaini:time,horafin:time2,descripcion:Descripcion,Precio:precio})"
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
  <v-spacer></v-spacer>
  <h4 class= "cabecerad">Dias disponibles</h4> 

    
      <v-card height="15rem"
      class="diascard"
      elevation="2"
    >


    <v-card-text class="scroller">
      <v-row  v-for="dia in dayss" :key="dia" >

      <v-card v-if="dias.has(dia)"><h1 class="dia">{{dia}}</h1></v-card>
      <div  class="tarjetas" v-for="hora in dias.get(dia) " :key="hora.dia" align="center"
      justify="center">
        
        
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="300"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >Hora:{{hora.horaini}}</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Descripción</v-toolbar>
            <v-card-text>
              <br>
              <h3>Dia: {{hora.dia}}</h3>
              <h3>Hora inicio: {{hora.horaini}}</h3>
              <h3>Hora Fin: {{hora.horafin}}</h3>
              <h3>Descripcion: {{hora.descripcion}}</h3>
              <h3>Precio: {{hora.precio}}</h3>
            </v-card-text>
            <v-card-actions class="justify-end">
               <v-btn v-if=isProfes
                text
                v-on:click="borrarTurno(hora.id)"
                @click="dialog.value = false"
              >Borrar</v-btn>
              <v-btn v-if=!isProfes
                text
                v-on:click="agregarCita({idturno:hora.id,descripcion:hora.descripcion,})"
                @click="dialog.value = false"
              >Agendar Cita</v-btn>
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

          
          

          
        

          
          
        


      </div>
      </v-row>
      </v-card-text>
      
    </v-card>
    





  </v-container>

  








  </section>




</template>

<script lang="js">
  export default  {
    
    name: 'Disponibilidad',
    props: { isProfes:Boolean},
    mounted () {
      
      const axios = require('axios').default;
      axios
      .get('http://127.0.0.1:8000/api/turnos/profesionales/'+10)
      .then(response => {
        let listadias=[];
        let diasmap=new Map()
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
            id:element.id,
            dia:dayName,
            horaini: horaini1,
            horafin:horafin1,
            descripcion:element.descripcion,
            precio:element.precio
          }
          if(!diasmap.has(dayName) && element.estado!=0){
            console.log(dayName)
            diasmap.set(dayName, [])
            diasmap.get(dayName).push(dia)
          }
          else{
            if(element.estado!=0){
              diasmap.get(dayName).push(dia)
            }
            
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
            hora:element.id,
            dia:dayName,
            horaini: horaini1,
            horafin:horafin1
          }
          if(!diasmap.has(dayName)){
            console.log(dayName)
            diasmap.set(dayName, [])
            diasmap.get(dayName).push(dia)
          }
          else{
            diasmap.get(dayName).push(dia)
          }
          
          listadias.push(dia)
        }
        
        
        
        console.log(diasmap)
        console.log(listadias)
        this.dias=diasmap
        this.turnos = listadias})
    },
    data: ()=>({
      dialog:false,
      dayss : ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'],
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: [],
      date:"",
      Descripcion:"",
      precio:"",
      isProfe:true,
      dias:new Map(),
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
      
      borrarTurno: function (event) {
        let axios = require('axios').default;
         axios.delete('http://127.0.0.1:8000/api/turnos/'+event)
    },
    agregarTurno: function(event){
      //^[0-9]{1,3}$
        console.log(event)
        if(event.horaini>event.horafin || !event.fecha || !event.horaini|| !event.horafin || !event.descripcion || !/^[0-9]{1,3}$/.test(event.Precio) | event.descripcion.length>50){
          alert("Los datos no estan digitados correctamente")
        }
        else{
           let inicio = new Date(event.fecha+ ' ' + event.horaini)
           console.log(inicio)
           inicio=this.toIsoString(inicio).slice(0, 19).replace('T', ' ');
           let fin = new Date(event.fecha+ ' ' + event.horafin);
           fin= this.toIsoString(fin).slice(0, 19).replace('T', ' ');
         console.log(inicio)
          
          let axios = require('axios').default;
         axios.post('http://127.0.0.1:8000/api/servicios',{descripcion:event.descripcion,precio:event.Precio,profesional_id:10}).then(response=>{
           console.log(response.data)
           axios.post('http://127.0.0.1:8000/api/turnos',{fecha_inicio:inicio,fecha_fin:fin,id_servicio:response.data.id,estado:true})
         })
        }
},
    agregarCita: function(event){
      console.log(event)
      let axios = require('axios').default;
      axios.post('http://127.0.0.1:8000/api/citas',{id_turno:event.idturno,id_cliente:1,descripcion:event.descripcion,estado:true,acceso_cliente	:true,acceso_profesional:true}).then(
        response=>{
          console.log(response)
          axios.put('http://127.0.0.1:8000/api/turnos/'+event.idturno,{estado:false})
        }
      )
    },
    toIsoString :function(date) {
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? '0' : '') + norm;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
}
      
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
  .tarjetas{
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .boton{
    margin-right: 100;
  }
}
  
</style>
