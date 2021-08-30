<template>
    <v-toolbar color="yellow"> 
        <v-btn href="/" color="yellow" elevation="0">
        <v-toolbar-title class="headline">Schedule</v-toolbar-title>
        </v-btn>
        <v-spacer/>
        <v-btn href="/profile" color="yellow" elevation="0">
        <div class="headline d-flex align-center">
            <h5 class="mr-4">Profile</h5>       
            <v-icon
            left
            large
            >
            mdi-account
            </v-icon>
        </div>
        </v-btn>
    </v-toolbar>
</template>

<script>
export default {
    name: 'Navegacion',
    data (){
        return {}
    }
}
</script>