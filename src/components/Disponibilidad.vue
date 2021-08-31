<template lang="html">

  <section class="Disponibilidad">
    <h1>Disponibilidad Component</h1>
    <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="6"
        sm="6"
      >
      Disponibilidad
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
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
              <v-banner
      v-model="v0"
      single-line
      transition="slide-y-transition"
      font:
    >
      Elija la fecha:

    </v-banner>
    

            </v-row>
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
        
    
  </v-container>

  </section>




</template>

<script lang="js">

  export default  {
    name: 'Disponibilidad',
    props: [],
    mounted () {

    },
    data: ()=>({
      dialog:false,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null,
      time2:null,
      menudate:false,
        menu2: false,
        menu3:false,
        modal2: false,
    }),
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .Disponibilidad {

  }
  
</style>
