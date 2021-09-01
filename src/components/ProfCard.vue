<template>
    <v-col
        md="4" cols="12"
    >
        <a v-bind:href="'/profesional/' + pf.id">
        <v-card class="d-flex justify-center flex-column text-center">
            <img v-if="pf.persona.image" src="https://via.placeholder.com/200"/>
            <img v-else src="https://via.placeholder.com/200"/>
            <h4 class="my-2">{{pf.persona.nombres}} {{pf.persona.apellidos}}</h4>
        </v-card>
        </a>
    </v-col>
</template>

<script>
export default {
    name:"ProfCard",
    data(){
        return{
            pf: {}
        }
    },
    props: ['profesional'],
    mounted(){
        
        this.pf = this.profesional;
    }
}
</script>

<style scoped>
    a{
        text-decoration: none;
    }
</style>