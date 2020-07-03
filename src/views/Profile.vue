<template>
<div>
	<Loader :visible="loading" />
<Navbar></Navbar>
 <v-content>
			<section id="about-me" style="background:#fff !important">
				<div class="py-12"></div>
				<v-container class="text-center">
					<h1 class="headline secondary--text font-weight-bold bold mt-3 mb-3">Mi Perfil</h1>
					<v-row>
					<!-- Info General -->
						<v-col cols="12" sm="4" md="4">
							<v-card class="pa-4" flat>
								<div>
									<v-avatar
										slot="offset"
										class="mx-auto d-block"
										size="130"
									>
										<v-img v-if="this.getUser.image!=null" :src="this.getUser.image" alt="alt" lazy-src="../assets/image.jpg">
											<template v-slot:placeholder>
												<v-row class="fill-height ma-0" align="center" justify="center">
													<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
												</v-row>
											</template>
										</v-img>
										<v-img v-if="this.getUser.image==null" :src="'../assets/img/sin-imagen.jpg'" alt="alt" lazy-src="../assets/image.jpg">
											<template v-slot:placeholder>
												<v-row class="fill-height ma-0" align="center" justify="center">
													<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
												</v-row>
											</template>
										</v-img>
									</v-avatar>
									<v-card-text class="text-xs-center" v-if="this.getUser">
									<h3 class="card-title mb-3 "> {{this.getUser.first_name}} {{this.getUser.last_name}}</h3>
									<h4 class="text-gray mb-3  font-weight-light" v-if="this.getUser.active"><v-icon  color="yellow">mdi-star</v-icon>Membresía Activa</h4>

									<!-- Profile Picture -->
									<v-dialog v-model="image_dialog" max-width="500" persistent>
										<template v-slot:activator="{on}">
											<v-btn color="primary" dark block  v-on="on">
												Cambiar Imagen
											</v-btn>
										</template>
										<v-card :loading="load">
											<v-card-title class="headline" primary-title>
												Cambiar Imagen Perfil
											</v-card-title>

											<v-card-text>
												<v-file-input @change="onFilePicked" show-size counter label="Selecciona una imagen"></v-file-input>
											</v-card-text>

											<v-card-actions>
												<div class="flex-grow-1"></div>
												<v-btn @click="image_dialog = false" text>Cancelar</v-btn>
												<v-btn @click="uploadImage" color="primary" dark>Confirmar</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
									</v-card-text>
								</div>
							</v-card>
								
						</v-col>
						<v-col cols="12" sm="8" md="8">
							<v-tabs height="64px" color="primary" grow>
								<v-tab>
									<v-icon left>mdi-information</v-icon>
									Información General
								</v-tab>
								
								<!-- Información General -->
								<v-tab-item>
									<!-- Información General -->
									<v-form class="mt-3 mx-4 pt-2 mb-10" v-model="valid" :lazy-validation="lazy"  ref="form">
										<v-text-field color="secondary" name="first_name" label="Nombres" outlined v-model="first_name" :rules="[v => !!v || 'Nombre es requerido']" required></v-text-field>
										<v-text-field color="secondary" name="last_name" label="Apellidos" outlined v-model="last_name" :rules="[v => !!v || 'Apellido es requerido']" required></v-text-field>

										<v-row>
											<v-col cols="6">
												<v-select
													:items="gender_set"
													v-model="gender"
													label="Género"
													single-line
													item-text="value"
													item-value="id"
													outlined
													:rules="[v => !!v || 'Género es requerido']" required
													></v-select>
											</v-col>
											<v-col cols="6">
												<v-dialog ref="birth_date" v-model="birth_date_dialog" :return-value.sync="birth_date" persistent width="290px">
													<template v-slot:activator="{ on }">
														<v-text-field v-model="birth_date" label="Fecha de Nacimiento" v-on="on" outlined :rules="[v => !!v || 'Fecha de Nacimiento es requerida']" required></v-text-field>
													</template>
													<v-date-picker v-if="birth_date_dialog" v-model="birth_date" full-width>
														<v-spacer></v-spacer>
														<v-btn text color="primary" @click="birth_date_dialog = false">Cancelar</v-btn>
														<v-btn text color="primary" @click="$refs.birth_date.save(birth_date)">OK</v-btn>
													</v-date-picker>
												</v-dialog>

											</v-col>
										</v-row>
										
										
										<v-text-field color="secondary" name="email" label="E-mail" outlined v-model="email" :rules="[v => !!v || 'E-mail es requerido']" required></v-text-field>
									</v-form>
								
									<v-btn color="primary" dark block @click ="updateProfile">Guardar</v-btn>
								</v-tab-item>
								
								
							</v-tabs>
							
							
						</v-col>
						
					</v-row>
				</v-container>

				<div class="py-12"></div>
			</section>
    	</v-content>

</div>
</template>

<script>
import store from '../store'
import moment from 'moment'
import Navbar from '../components/Navbar.vue'
import Loader from "../components/Loader.vue";
import {mapState} from 'vuex'
import axios from 'axios'

export default {
  components: {
	Navbar,
	Loader
	},
	data: () => ({

		
		birth_date_dialog: false,
		birth_date: null,
		gender_set: [{
			id: 1,
			value: 'Hombre'
		},
		{
			id: 2,
			value: 'Mujer'

		}],
		gender: null,
		first_name: null,
		last_name:null,
		phone: null,
		email: null,
		upload_image: [],
		image_dialog: false,
		load: false,
		valid: true,
		lazy:false,
		suscribed: false
		
		
	}),
	computed: {
		...mapState(['loading']),
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		
		// STAFF
		updateProfile() {
			let birth =  this.birth_date
			let userData = {
				id: this.getUser.id,
				first_name: this.first_name,
				last_name: this.last_name,
				birth_date : birth,
				gender: this.gender,
				email : this.email,
				
			
			}
			
			if (this.$refs.form.validate()){
				this.$store.dispatch('updateProfile', userData)
			}
		},
		createStaff(data) {
			this.profile.staff.push({
				name: data.staff,
				// days: data.days,
			});
		},
		deleteStaff(index) {
			this.profile.staff.splice(index, 1);
		},
		uploadImage() {
		
				let formData = new FormData();
				formData.append('image', this.upload_image[0]);
				this.load = true;
				axios.patch('https://choosemyfitness-api.herokuapp.com/api/users/'+this.getUser.id+'/', formData)
				.then(response => {
					this.image_dialog = false;
					this.load = false
					this.$store.commit('UPDATE_USER_IMAGE', response.data.image);
					localStorage.setItem('user', JSON.stringify(response.data))
				})
				.catch(error => {
					console.log(error);
				})
				.finally(() => {
					this.upload_image = []
					this.load = false;
					this.image_dialog = false;
				});

		},
		onFilePicked(file) {
			if(file){
				if (file !== undefined) {
					const fr = new FileReader()
					fr.readAsDataURL(file)
					fr.addEventListener('load', () => {
						this.upload_image = []
						this.upload_image.push(file); // this is an image file that can be sent to server...
					})
				} else {
					console.log('No se puedo agregar la imagen.');
				}
			}
		},
	},
	created(){
		this.first_name = this.getUser.first_name
		this.last_name = this.getUser.last_name
		this.birth_date = this.getUser.birth_date
		this.subscription = this.getUser.active
		this.gender = this.getUser.gender
		this.email = this.getUser.email
			
	}
}
</script>
