<template>
<div>
	<v-card :loading="loading_appointment" class="mx-auto" tile flat>
		<v-card-title class="font-weight-bold">
			Q1200<span class="ml-2 body-1 grey--text text--darken-2">/ por mes</span>
		</v-card-title>
	
		<v-divider></v-divider>
		<v-card-text class="pb-0">

			<p class="grey--text text--darken-3 mb-6">Te interesa esta propiedad? Agenda una cita</p>
			<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
				<v-layout row wrap>
					<v-flex xs6>
						<v-dialog ref="fecha" v-model="fecha_dialog" :return-value.sync="fecha" persistent width="290px" class="">
							<template v-slot:activator="{ on }">
								<v-text-field color="secondary" v-model="fecha" label="Fecha" v-on="on" outlined :rules="[v => !!v || 'Fecha es requerida']" required></v-text-field>
							</template>
							<v-date-picker color="secondary" v-if="fecha_dialog" v-model="fecha" full-width 
							:min="today"  locale="es-MX">
								<v-spacer></v-spacer>
								<v-btn text color="secondary" @click="fecha_dialog = false">Cancelar</v-btn>
								<v-btn text color="secondary" @click="$refs.fecha.save(fecha)">OK</v-btn>
							</v-date-picker>
						</v-dialog>
					</v-flex>
					<v-flex xs6>
						<v-dialog  ref="open" v-model="open_dialog" :return-value.sync="open" persistent width="290px">
							<template v-slot:activator="{ on }">
								<v-text-field color="secondary" v-model="open" label="Hora" readonly v-on="on" outlined required :rules="[v => !!v || 'Hora es requerida']"></v-text-field>
							</template>
							<v-time-picker color="secondary" v-if="open_dialog" v-model="open" full-width>
								<v-spacer></v-spacer>
								<v-btn text color="secondary" @click="open_dialog = false">Cancelar</v-btn>
								<v-btn text color="secondary" @click="$refs.open.save(open)">OK</v-btn>
							</v-time-picker>
						</v-dialog>
					</v-flex>
					<v-flex xs12>
						<v-textarea color="secondary" name="description" label="Descripción" outlined v-model="mensaje"></v-textarea>
					</v-flex>
				</v-layout>
			</v-form>
		</v-card-text>
		<v-card-actions class="align-self-center align-content-center justify-center center align-center">
			<v-btn type="submit" block color="secondary" large depressed @click="requestAppointment()">
				Agendar Cita
			</v-btn>								
		</v-card-actions>
	</v-card>
	<!-- Dialogo para usuario sin sesion -->
	<v-dialog v-model="dialog" persistent max-width="600" timeout = "2000">
		<v-card :loading="loading">
			<v-card-title class="headline"></v-card-title>
			<v-card-text>
				<v-row justify="center">
					<v-card v-if="dialog_login"  class=" mx-auto gray lighten-5" min-width="345" tile flat>
						
						<v-card-text>
							<h1 class="primary--text text-center mb-5">Iniciar Sesión</h1>
							<v-alert
								v-if="success_register"
								dense
								text
								color="secondary"
								max-width="300px"
								>
								{{ message_register }}
							</v-alert>
							<v-form v-model="valid_login" :lazy-validation="lazy_login"  ref="form_login">
								<v-text-field v-model.trim="email" outlined color="secondary" label="Correo Electrónico"  :rules="emailRules" required></v-text-field>
								<v-text-field type="password" v-if="visible" v-model.trim="token" outlined color="secondary" label="Token" :rules="tokenRules"></v-text-field>
								<!--v-text-field type="password" v-model.lazy="password" outlined color="cyan darken-3" label="Contraseña"></v-text-field-->
							</v-form>
							<div class="mb-2">
								<v-btn text  @click="visible = true, login_button= true, token_button = false" class="primary--text">Ya tengo token</v-btn>
							</div>
							
						</v-card-text>
						<v-card-actions class="align-self-center align-content-center justify-center center align-center">
							
							<v-btn v-if="token_button" tile color="primary" @click="token_validation" class="font-weight-bold text-none pl-5 pr-5" dark >Generar Token</v-btn>
							<v-btn v-if="login_button" tile color="primary" @click="login" class="font-weight-bold text-none pl-5 pr-5">Iniciar Sesión</v-btn>
							<v-btn tile color="secondary" @click="registerTab()" class="font-weight-bold text-none pl-5 pr-5">Registrarse</v-btn>
					
						</v-card-actions>
						
					</v-card>
					<v-card v-if="dialog_registro"  class="mx-auto" min-width="345" tile flat>
						<v-card-text class="pb-0">
							<h1 class="primary--text text-center mb-5">Registrarse</h1>
							<v-form v-model="valid_register" :lazy-validation="lazy_register"  ref="form_register">
								<v-text-field v-model.lazy="first_name" outlined color="secondary" label="Nombre"  :rules="[v => !!v || 'Nombre es requerido']" required></v-text-field>
								<v-text-field v-model.lazy="last_name" outlined color="secondary" label="Apellido"  :rules="[v => !!v || 'Apellido es requerido']" required></v-text-field>
								<v-text-field v-model.trim="email" outlined color="secondary" label="E-mail"  :rules="emailRules" required></v-text-field>
							</v-form>
						</v-card-text>
						<v-card-actions class="align-self-center align-content-center justify-center center align-center">
							<v-btn tile color="primary" @click="loginTab()" class="font-weight-bold text-none pl-5 pr-5">Iniciar Sesión</v-btn>
							<v-btn tile color="secondary" @click="register" class="font-weight-bold text-none pl-5 pr-5">Registrarse</v-btn>
						</v-card-actions>
					</v-card>
					<v-card v-if="success_appointment"  class="mx-auto" min-width="345" tile flat>
						<v-card-text class="pb-0">
							<h1 class="primary--text title text-center mb-5">¡Tu cita ha sido agendada exitosamente! Consulta tus citas en la sección "Mis Citas" </h1>
							<div class="dummy-positioning d-flex">
  
								<div class="success-icon">
									<div class="success-icon__tip"></div>
									<div class="success-icon__long"></div>
								</div>
								
							</div>
							
						</v-card-text>
					</v-card>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="resetForm()">Cerrar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<!-- Dialogo para usuario en sesion -->

	
</div>
</template>

<script>
import moment from 'moment'

export default {
	name: 'schedule-form',
	props: ['property'],
	data() {
		return {
			today:  moment().format('YYYY-MM-DD'),
			loading: false,
			first_name: null,
			last_name: null,
			loading: false,
			loading_appointment: false,
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
			valid_login: true,
			lazy_login: false,
			valid_register: true,
			lazy_register: false,
			dialog_registro: false,
			dialog_login: false,
			tokenRules: [
				v => !!v || 'Token es Requerido',
			],
			emailRules: [
				v => !!v || 'E-mail es Requerido',
				v => /.+@.+/.test(v) || 'Ingresa un email válido',
			],

			reset_dialog: false,
			dialog: false,
			open_dialog: false,
			open: null,
			fecha_dialog: false,
			fecha: null,
			succesfull: false,
			mensaje: 'Me interesa la casa en Antigua Guatemala',
			message: null,
			emailRules: [
				v => !!v || 'E-mail es Requerido',
				v => /.+@.+/.test(v) || 'Ingresa un email válido',
			],
			success_register: false,
			success_appointment: false,
			message_register: null
		}
	},
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		isLoggedIn : function(){ 
			return this.$store.getters.isLoggedIn
		},
	},
	methods: {
		requestAppointment(){
			if (this.$refs.form.validate()) {
				
				if(!this.isLoggedIn){
					this.message = ``;
					 
					this.dialog_login = true
					this.dialog_registro = false
					this.dialog = true
				}else{
				
					this.dialog_login = false
					this.dialog_registro = false
					this.dialog = true
					this.success_appointment = true
				

					
				}
			}
			
		},
		token_validation: function () {
		
			this.msgError = null;
			this.msgVisible = false;
			if (this.$refs.form_login.validate()) {
				this.loading = true;
				this.login_button = true;
				this.token_button = null;
				this.visible = true;
				let email = this.email
				
				//let token = this.token
				this.$store.dispatch('token', {email:email})
				.then(() => {
					
					this.loading = false;
					this.message_register = 'Hemos enviado un correo a ' + email + ' con el token de ingreso.'
					this.success_register = true
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
			if (this.$refs.form_login.validate()) {
				this.loading = true;
				let email = this.email
				let token = this.token
				this.$store.dispatch('login', {email: email, token: token})
				.then(response => {

					this.dialog_login = false
					this.success_appointment = true	
					this.loading = false		
				})
				.catch(err => {
					this.msgError = 'Error de autenticación, intenta de nuevo.'
					this.msgVisible = true
					this.loading = false
				})
			}
		},
		registerTab(){
			this.dialog_login = false
			this.dialog_registro = true
		},
		loginTab(){
			this.dialog_login = true
			this.dialog_registro = false
		},
		resetForm() {
			this.dialog = false
		},
		register(){
			if (this.$refs.form_register.validate()){
				var formData = new FormData();
				this.loading = true
				
				formData.append("first_name", this.first_name);
				formData.append("last_name", this.last_name);
				formData.append("email", this.email);
				
				this.$store.dispatch('register', formData)
				.then(() =>{ 
					this.loading = false
					this.message_register = '¡Registro completado! Genera un token para iniciar sesión con tu correo registrado.'
					this.dialog_registro = false
					this.dialog_login = true
					this.success_register = true
					
					})
				.catch(error => console.log(error))
			}
		},
		redirect(){
			this.loginTab()
			
		},
	},
	mounted(){
		
	}
}
</script>
<style lang="scss">
/* Success Icon Animation */
.dummy-positioning {
  width: 100%;
  height: 30vh;
  align-items: center;
  justify-content: center;
}


$green:     #479f85;
$icon-base-size: 20px;

.success-icon {
  display: inline-block;
  width: 8em;
  height: 8em;
  font-size: $icon-base-size;
  border-radius: 50%;
  border: 4px solid lighten($green, 20%);
  background-color: #fff;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  animation: showSuccess 180ms ease-in-out;
  transform: scale(1);
}

// Elements
.success-icon {
  
  &__tip,
  &__long {
    display: block;
    position: absolute;
    height: 4px;
    background-color: lighten($green, 20%);
    border-radius: 10px;
  }

  &__tip {
    width: 2.4em;
    top: 4.3em;
    left: 1.4em;
    transform: rotate(45deg);
    animation: tipInPlace 300ms ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 180ms;
    visibility: hidden;
  }

  &__long {
    width: 4em;
    transform: rotate(-45deg);
    top: 3.70em;
    left: 2.75em;
    animation: longInPlace 140ms ease-in-out;
    animation-fill-mode: forwards;
    visibility: hidden;
    animation-delay: 300ms + 140ms;
  }

}

@keyframes showSuccess {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}

@keyframes tipInPlace {
    from {
        width: 0em;
        top: 0em;
        left: -1.6em;
    }
    to {
        width: 2.4em;
        top: 4.3em;
        left: 1.4em;
        visibility: visible;
    }
}

@keyframes longInPlace {
    from {
        width: 0em;
        top: 5.1em;
        left: 3.2em;
    }
    to {
        width: 4em;
        top: 3.70em;
        left: 2.75em;
        visibility: visible;
    }
}
</style>


