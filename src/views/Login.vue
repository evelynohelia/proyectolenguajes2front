<template>
<div class="root">
    <v-card class="flotante">
        <v-card-title class="text-center justify-center pb-0">Login</v-card-title>
        <v-form v-model="valid">
            <v-container>
                <v-col
                cols="12"
                md="12"
                >
                <v-text-field
                    v-model="credentials.email"
                    :rules="emailRules"
                    label="E-mail"
                    color="black"
                    required
                    ref="form"
                ></v-text-field>
                </v-col>
                                <v-col
                cols="12"
                md="12"
                >
                <v-text-field
                    v-model="credentials.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    color="black"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                md="12"
                class="d-flex justify-center"
                >
                    <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="validate"
                    >
                    Login
                    </v-btn>  
                    <v-btn
                    href="/register"
                    >
                    Register
                    </v-btn> 
                </v-col>
            </v-container>
        </v-form>
    </v-card>
</div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials= true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default {
    data () {
      return {
        credentials:{
          email: '',
          password: '',
        },
        user: {},
        authUser:{},
        show1: false,
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
    mounted (){
    },
    methods:
    {
      
      async validate () {
        let _this=this;
           await axios.post('http://localhost:8000/api/auth/login', this.credentials,{headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then(function(response) {
                if(response.status==200) {
                  _this.user = response.data;
                  let token = response.data.access_token;
                  let base64URL = token.split('.')[1];
                  let base64 = base64URL.replace('-','+').replace('_','/')
                  console.log(JSON.parse(window.atob(base64)))
                  localStorage.setItem('token',token);
                  _this.$router.push({ name: 'Home', query: { redirect: '/' } });
                }
            })
            .catch(function(err) {
                console.log(err);
            })         
        
        //this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    computed:{
    }
  }
</script>

<style scoped>
    .flotante{
        position: absolute;
        top: 50%;
        left : 50%;
        transform : translate(-50%,-50%);
        width: 40vw;
        height: auto;
    }
      .root{
    background-image: url("https://www.nicepng.com/png/full/225-2250557_world-world-map-black-and-grey-poster-36.png");
    width :100vw;
    height :100vh;
    background-size: cover;
  }
</style>