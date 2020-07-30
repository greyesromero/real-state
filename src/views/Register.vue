<template>
    <div>
        <Loader :visible="loading" />
		<v-content style="background:#ffffff !important">
			<section style="background:#ffffff !important">
				<v-container fluid>	
					<v-row justify="center">
						<v-col cols="12" md="4" xs="12">
							<v-card :loading="loading" class="mx-auto" min-width="345" tile flat>
							
								<v-card-text class="pb-0">
									<h1 class="primary--text text-center mb-5">Registrarse</h1>

									<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
										<v-text-field v-model.lazy="first_name" outlined color="secondary" label="Nombre"  :rules="[v => !!v || 'Nombre es requerido']" required></v-text-field>
										<v-text-field v-model.lazy="last_name" outlined color="secondary" label="Apellido"  :rules="[v => !!v || 'Apellido es requerido']" required></v-text-field>
										<v-text-field v-model.trim="email" outlined color="secondary" label="E-mail"  :rules="emailRules" required></v-text-field>
									</v-form>
								
									
								</v-card-text>
								<v-card-actions class="align-self-center align-content-center justify-center center align-center">
									<v-btn tile color="secondary" @click="register" class="font-weight-bold text-none pl-5 pr-5">Registrarse</v-btn>

								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</section>
			<v-dialog v-model="dialog" persistent max-width="290" timeout = "2000">
				<v-card>
						<v-card-title class="headline">REGISTRO</v-card-title>
						<v-card-text>¡Su registro ha sido completado exitosamente!</v-card-text>
						<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" text @click="dialog = false">Aceptar</v-btn>
						</v-card-actions>
				</v-card>
			</v-dialog>
    	</v-content>
        
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Loader from '../components/Loader.vue'


export default {
	components: {
		Navbar,
		Loader,
        Footer
	
	},
	data: () => ({
		loading: false,
		first_name: null,
		last_name: null,
		email: null,
		valid: true,
		lazy:false,
		dialog: false,
		emailRules: [
			v => !!v || 'E-mail es Requerido',
			v => /.+@.+/.test(v) || 'Ingresa un email válido',
		],
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		register(){
			if (this.$refs.form.validate()){
				var formData = new FormData();
				this.loading = true
				
				formData.append("first_name", this.first_name);
				formData.append("last_name", this.last_name);
				formData.append("email", this.email);
			
				this.$store.dispatch('register', formData)
				.then(() =>{ 
					this.loading = false
					this.dialog = true
					setTimeout(()=>{
						this.redirect()
						},1500);
					})
				.catch(error => console.log(error))
			}
		},
		redirect(){
			this.dialog = false
			this.$router.push('/login')
		},
	},
	mounted() {
		
	},
	created(){
	
	}

}
</script>
