<template>
    <v-toolbar color="yellow"> 
        <v-btn href="/" color="yellow" elevation="0">
        <v-toolbar-title class="headline">Schedule</v-toolbar-title>
        </v-btn>
        <v-btn v-bind:href="'/historial/' + id" color="yellow" elevation="0">
        <v-toolbar-title class="headline">Historial</v-toolbar-title>
        </v-btn>
        <v-btn v-if="prof" v-bind:href="'/citasPendientes/' + id" color="yellow" elevation="0">
        <v-toolbar-title class="headline">Citas Pendientes</v-toolbar-title>
        </v-btn>
        <v-spacer/>
        <v-btn href="/profile" color="yellow" elevation="0">
        <div class="headline d-flex align-center">
            <h5 class="mr-4">Perfil</h5>       
            <v-icon
            left
            large
            >
            mdi-account
            </v-icon>
        </div>
        </v-btn>
        <v-btn color="yellow" v-on:click="cerrarSesion()">Logout</v-btn>
    </v-toolbar>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Navegacion',
    data (){
        return {
            prof:false,
            id: 0,
        }
    },
    methods:{
        cerrarSesion(){
            localStorage.removeItem("token");
            window.location.reload();
        }
    },
    mounted(){
        let token = localStorage.getItem('token',token);
        if(token === null){
            this.$router.push('login')
        }else{
            axios.get('http://localhost:8000/api/personas?token='+token, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((response) =>{
                if(response.status!=200) {
                  this.$router.push('login')

                }
            })
            .catch(function(err) {
                console.log(err);
            })     
        }
        let base64URL = token.split('.')[1];

        let base64 = base64URL.replace('-','+').replace('_','/')
        let decrypt = JSON.parse(window.atob(base64));
        this.id = decrypt.sub;
        axios.get(`http://localhost:8000/api/personaProfesional/${decrypt.sub}`).then(res => {
            if(res.data.length != 0){
                this.prof= true;
            }
        }).catch(function(err) {
                console.log(err);
        })  
    }
}
</script>