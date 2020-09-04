<template>
<div>

	<v-content class="mb-10">
		<section >
			<div class="py-2"></div>
			<v-container fluid>

				<v-row justify="center">
					<v-col cols="12" md="4" xs="12">
						<v-card :loading="loading"  class=" mx-auto gray lighten-5" min-width="345" tile flat>
							
							<v-card-text>
								<h1 class="primary--text text-center mb-5">Iniciar Sesión</h1>

								<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
									<v-text-field v-model.trim="email" outlined color="secondary" label="Correo Electrónico"  :rules="emailRules" required></v-text-field>
									<v-text-field type="password" v-if="visible" v-model.trim="token" outlined color="secondary" label="Token" :rules="tokenRules"></v-text-field>
									<!--v-text-field type="password" v-model.lazy="password" outlined color="cyan darken-3" label="Contraseña"></v-text-field-->
								</v-form>
								<div class="mb-2">
									<a href="#" @click="visible = true, login_button= true, token_button = false" class="primary--text">Ya tengo token</a>
								</div>
								
							</v-card-text>
							<v-card-actions class="align-self-center align-content-center justify-center center align-center">
								
								<v-btn v-if="token_button" tile color="primary" @click="token_validation" class="font-weight-bold text-none pl-5 pr-5" dark >Generar Token</v-btn>
								<v-btn v-if="login_button" tile color="primary" @click="login" class="font-weight-bold text-none pl-5 pr-5">Iniciar Sesión</v-btn>
								<v-btn tile color="secondary" @click="register" class="font-weight-bold text-none pl-5 pr-5">Registrarse</v-btn>
						
							</v-card-actions>
							
						</v-card>
					</v-col>
				</v-row>
				<v-dialog v-model="reset_dialog" max-width="500" persistent>
					<v-card>
							<v-card-title class="headline" primary-title>
								Reenviar Token
							</v-card-title>
							<v-card-text v-if="email!=null">
								Hemos reenviado tu token de ingreso a <span class="font-weight-bold">{{email}} </span> .
							</v-card-text>
							<v-card-text v-if="email==null">
								Ingresa un correo electrónico válido e intenta de nuevo.
							</v-card-text>
							<v-card-actions>
								<div class="flex-grow-1"></div>
								<v-btn @click="reset_dialog = false" text>OK</v-btn>
							</v-card-actions>
						</v-card>
				</v-dialog>
				<v-dialog v-model="token_dialog" max-width="500" persistent>
					<v-card>
						<v-card-title class="headline" primary-title>
							Generación Token
						</v-card-title>
						<v-card-text v-if="email!=null">
							Hemos enviado un correo a <span class="font-weight-bold">{{email}} </span> con el token de ingreso.
						</v-card-text>
					
						<v-card-actions>
							<div class="flex-grow-1"></div>
							<v-btn @click="token_dialog = false" text>OK</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="msgVisible" max-width="500" persistent>
					<v-card>
						<v-card-title class="headline" primary-title>
							Error
						</v-card-title>
					
						<v-card-text>
							{{ this.msgError }}
						</v-card-text>
						<v-card-actions>
							<div class="flex-grow-1"></div>
							<v-btn @click="msgVisible = false" text>OK</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-container>
			<div class="py-2"></div>
		</section>
	</v-content>
	
	
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import store from '../store'
import Footer from '../components/Footer.vue'

export default {
	components: {
		Navbar,
		Footer
	},
	data: () => ({
		loading: false,
		email: null,
		token: null,
		visible: false,
		token_button :true,
		login_button: false,
		reset_dialog: false,
		token_dialog: false,
		msgVisible: false,
		msgError: null,
		valid: true,
		lazy:false,
		tokenRules: [
			v => !!v || 'Token es Requerido',
		],
		emailRules: [
			v => !!v || 'E-mail es Requerido',
			v => /.+@.+/.test(v) || 'Ingresa un email válido',
		],

		reset_dialog: false,
	}),
	methods: {
		token_validation: function () {
		
		this.msgError = null;
		this.msgVisible = false;
		if (this.$refs.form.validate()) {
			this.loading = true;
			this.login_button = true;
			this.token_button = null;
			this.visible = true;
			let email = this.email
			
			//let token = this.token
			this.$store.dispatch('token', {email:email})
			.then(() => {
				this.token_dialog = true;
				this.loading = false;
			})
			.catch(err => {
				this.msgError = 'E-mail no registrado, intenta de nuevo.'
				this.msgVisible = true
				this.login_button = false
				this.loading = false
				this.token_button = true
				this.visible = false
			}) 
        }
	  },
	 	login: function(){
		  this.msgError = null;
		  this.msgVisible = false;
			if (this.$refs.form.validate()) {
				this.loading = true;
				let email = this.email
				let token = this.token
				this.$store.dispatch('login', {email: email, token: token})
				.then(response => {
					this.$store.dispatch('getProfile', response.data.user.id).then(response => {
						this.$router.push('/')			
					})
				})
				.catch(err => {
					this.msgError = 'Error de autenticación, intenta de nuevo.'
					this.msgVisible = true
					this.loading = false
				})
			}
	  },
	  register(){
		  this.$router.push('/register')
	  }
	},
	mounted() {
		if(store.getters.isLoggedIn == true){
			this.$router.push('/')
		}

	}
}
</script>
