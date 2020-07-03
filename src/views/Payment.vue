<template>
    <div>
        <Loader :visible="loading" />
        <Navbar></Navbar>
		<v-content style="background:#ffffff !important">
			<section style="background:#ffffff !important">
				<div class="py-12"></div>
				<v-container fluid>	
					<v-row justify="center">
						<v-col cols="12" md="6" xs="12">
							<v-card :loading="loading" class="mx-auto" min-width="345" tile flat>
								<v-card-text class="pb-0">
									<h1 class="secondary--text text-center mb-5">Realizar Pago</h1>
									<div class="mb-5 subtitle-1 text-justify">
										Para acceder al contenido de clases y especialistas debes tener membresía activa. Registra aquí tu método de pago y se cargará la cantidad de Q195.00 mensualmente
									</div>

									<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
										<v-text-field v-model.lazy="card_number" v-mask="mask" outlined color="secondary" label="Número de tarjeta (sin espacios ni guiones)"  :rules="[v => !!v || 'Número de tarjeta es requerido']" required></v-text-field>
										<v-text-field v-model.lazy="first_name" outlined color="secondary" label="Nombre"  :rules="[v => !!v || 'Nombre es requerido']" required></v-text-field>
										<v-text-field v-model.lazy="cvv" outlined color="secondary" label="CVV"  :rules="[v => !!v || 'Código CVV es requerido']" required></v-text-field>
										<v-select
										:items="month_set"
										label="Mes de Expiración"
										outlined
										item-value="month"
										item-text="text"
										v-model="month"
										:rules="[v => !!v || 'Mes de expieración es requerido']" required
										></v-select>
										<v-select
										:items="year_set"
										item-text="text"
										item-value="year"
										label="Año de Expiración"
										outlined
										v-model="year"
										:rules="[v => !!v || 'Año de expiración es requerido']" required
										></v-select>
									</v-form>
								
									
								</v-card-text>
								<v-card-actions class="align-self-center align-content-center justify-center center align-center">
									
									<v-btn tile color="secondary" class="font-weight-bold text-none pl-5 pr-5" @click="Payment()">Realizar Pago</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
				<div class="py-12"></div>
			</section>
    	</v-content>
        <Footer></Footer>
			<v-dialog v-model="dialog" persistent max-width="290" timeout = "2000">
				<v-card>
						<v-card-title class="headline">NOTIFICACIÓN</v-card-title>
						<v-card-text>{{this.message}} </v-card-text>
						<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" text @click="dialog = false">Aceptar</v-btn>
						</v-card-actions>
				</v-card>
			</v-dialog>
    </div>
</template>

<script>
import store from '../store'
import axios from 'axios'
import moment from 'moment'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Loader from '../components/Loader.vue'
import { mask } from 'vue-the-mask'

export default {
	directives: {
		mask,
	},
	components: {
		Navbar,
		Loader,
        Footer
	
	},
	data: () => ({
		mask: '#### #### #### ####',
		loading: false,
		first_name: null,
		last_name: null,
		email: null,
		valid: true,
		lazy:false,
		cvv: null,
		card_number: null,
		dialog: false,
		month: null,
		year: null,
		token: null,
		message: null,
		month_set: [
			{
				month: '01',
				text: 'Enero'
			},
			{
				month: '02',
				text: 'Febrero'
			},
			{
				month: '03',
				text: 'Marzo'
			},
			{
				month: '04',
				text: 'Abril'
			},
			{
				month: '05',
				text: 'Mayo'
			},
			{
				month: '06',
				text: 'Junio'
			},
			{
				month: '07',
				text: 'Julio'
			},
			{
				month: '08',
				text: 'Agosto'
			},
			{
				month: '09',
				text: 'Septiembre'
			},
			{
				month: '10',
				text: 'Octubre'
			},
			{
				month: '11',
				text: 'Noviembre'
			},
			{
				month: '12',
				text: 'Diciembre'
			}
		],
		year_set: [{
			year: '20',
			text: '2020'
		},
		{
			year: '21',
			text: '2021'
		},
		{
			year: '22',
			text: '2022'
		},
		{
			year: '23',
			text: '2023'
		},
		{
			year: '24',
			text: '2024'
		}]
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		getToken : function(){ 
			return this.$store.getters.getToken
		},
	},
	methods: {
		registerToken(){

			this.loading = true
			var formData = new FormData();
			formData.append('token',this.getToken);
			axios({
					method: 'POST',
					url: 'https://choosemyfitness-api.herokuapp.com/api/users/subscribe/',
					contentType: 'application/json',
					data: formData
			}).then(res => {
				
				let userData = {
					id: this.getUser.id,
					active: true,					
				}
			
				this.$store.dispatch('updateProfile', userData).then(response => {
					this.loading = false
					this.$refs.form.reset()
					this.$router.push('/confirmation')			
				})
							

			})
			.catch(error => {
				this.loading = false
				this.message= 'Ha ocurrido un error, por favor intenta de nuevo'
				this.dialog = true
				console.log(error);
			})
		},
		updateUser(){
			this.loading = true
			axios.patch('https://choosemyfitness-api.herokuapp.com/api/users/'+this.getUser.id+'/', {credit_card: this.token})
			.then(res => {
				this.loading = false
				this.registerToken();
			

			})
			.catch(error => {
				this.loading = false
				this.message= 'Ha ocurrido un error, por favor intenta de nuevo'
				this.dialog = true
				console.log(error);
			})
		},
		Sucess(){
			this.loading = false
			this.message= '¡Su método de pago ha sido registrado exitosamente! Se cargará a la tarjeta seleccionada el cobro mensualmente.'
			this.dialog = true
			this.$refs.form.reset()
		},
		Payment(){
		
			if (this.$refs.form.validate()) {
				this.loading = true

				let envelope = {
					AccountNumber: this.getUser.id,
					CardNumber: this.card_number,
					ExpirationMonth: this.month,
					ExpirationYear: this.year,
					CardholderName: this.first_name,
					CVV: this.cvv
				}

			    axios.post(process.env.VUE_APP_API_URL,envelope).then(response => {
					console.log(response)
					this.loading = false
					
					var doc = new DOMParser().parseFromString(response.data, 'text/xml');
					var valueXML = doc.getElementsByTagName('CreateTokenResult');
					var temps = valueXML[0].children;
					var tokenDetails=[];
					for (var i = 0; i < temps.length; i++) {
						var temp = temps[i].children;
						var obj = {};
						for (var j = 0; j < temp.length; j++) {
							var property = temp[j];
							if(property.length>0){
								var c = temp[j].children;
								for (var k = 0; k < c.length; j++) {
									obj[c.localName] = c.innerHTML;
								}
							}else{
								obj[property.localName] = property.innerHTML;
							}
						}
						tokenDetails.push(obj);
					}
					this.token = tokenDetails[2].AccountToken
					this.updateUser()
					
				})
				.catch(error => {
					console.log(error);
					this.loading = false
					this.message= 'Ha ocurrido un error, por favor intenta de nuevo'
					this.dialog = true
				})

			}
		}
	},
	mounted() {
		
	},
	created(){

	}

}
</script>
