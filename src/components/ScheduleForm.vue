<template>
<div>
	<v-list-item >
        <v-list-item-avatar>
		  	<img z-index="0" v-if="agent.image==null"  class="profile-picture" :src="'../assets/img/sin-imagen.jpg'" alt="alt" lazy-src="../assets/logo.png">
			<img z-index="0" v-if="agent.image!=null"  class="profile-picture" :src="agent.image" alt="alt" lazy-src="../assets/logo.png">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{agent.first_name}} {{agent.last_name}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
		  	
			<v-dialog v-model="messaging_dialog" max-width="500px" persistent>
				<template v-slot:activator="{on}">
					<v-btn color="secondary" icon :disabled="checkUser" v-on="on">
						<v-icon>mdi-message-text</v-icon>
					</v-btn>
				</template>
				<v-card :loading="loading_messaging" class="px-5" tile flat>
					<v-card-text class="py-5">
						<v-layout justify="center" row wrap>
						<v-form v-model="valid_messaging" :lazy-validation="lazy_messaging"  ref="form_messaging"  class="w-100">
							<p class="font-weight-bold display-1 black--text" align="center">Enviar Mensaje</p>
							<p class="grey--text text--darken-3">Comunícate con <strong> {{this.agent.first_name}} {{this.agent.last_name}} </strong> para más información</p>

							
								<v-text-field v-model.lazy="message_name" outlined color="secondary" label="Asunto"  :rules="[v => !!v || 'Asunto es requerido']" required></v-text-field>
								<v-textarea color="secondary" name="message" label="Escribe un mensaje ..." outlined v-model.lazy="message_chat" required :rules="[v => !!v || 'Mensaje es requerido']"></v-textarea>					

							
						</v-form>
						</v-layout>
					</v-card-text>
					<v-card-actions class="align-self-center align-content-center justify-center center align-center">
						<v-btn text large @click="closeMessaging()">
							Cancelar
						</v-btn>
						<v-btn type="submit" color="secondary" :disabled="checkUser" large @click="sendMessage()">
							Enviar Mensaje
						</v-btn>								
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="appointment_dialog" max-width="500px" persistent>
				<template v-slot:activator="{on}">
					<v-btn color="secondary" icon v-on="on" :disabled="checkUser" >
						<v-icon>mdi-calendar-clock</v-icon>
					</v-btn>
				</template>
				<v-card :loading="loading_appointment" class="px-5" tile flat>
		
					<v-card-text class="py-5">


						<v-form v-model="valid" :lazy-validation="lazy"  ref="form" class="mx-4 p-0">
							<p class="font-weight-bold display-1 black--text" align="center">Agendar Cita</p>
							<p class="grey--text text--darken-3">Selecciona fecha y hora para agendar una visita a la propiedad</p>

							<v-layout row wrap>
								<v-flex xs12 >
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
								<v-flex xs12>
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
								<!--v-flex xs12>
									<v-textarea color="secondary" name="description" label="Descripción" outlined v-model="mensaje"></v-textarea>
								</v-flex-->
							</v-layout>
						</v-form>
					</v-card-text>
					<v-card-actions class="align-self-center align-content-center justify-center center align-center">
						<v-btn text large @click="closeModal()">
							Cancelar
						</v-btn>
						<v-btn type="submit" color="secondary" :disabled="checkUser" large @click="requestAppointment()">
							Agendar Cita
						</v-btn>								
					</v-card-actions>
				</v-card>
			</v-dialog>
        </v-list-item-icon>
	</v-list-item>
	
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
									<a href="#" @click="visible = true, login_button= true, token_button = false" class="primary--text">Ya tengo token</a>
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
import axios from 'axios'
export default {
	name: 'schedule-form',
	props: ['property','agent'],
	data() {
		return {
			today:  moment().format('YYYY-MM-DD'),
			messaging_dialog: false,
			message_name: null,
			loading_messaging: false,
			appointment_dialog: false,
			lazy_messaging: false,
			valid_messaging: true,
			message_chat: null,
			checkUser: false,
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
			mensaje: null,
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
		closeMessaging(){
			this.messaging_dialog = false
			this.$refs.form_messaging.reset()
		},
		sendMessage(){
			if (this.$refs.form_messaging.validate()) {
				let users = []
				users.push(this.getUser.id)
				users.push(this.agent.id)
				this.loading_messaging = true
				axios.post('https://hsrealestate-api.herokuapp.com/api/messaging/conversations/',{
					users: users,
					name: this.message_name,
					active: true
				})
				.then(response => {
					let conversation_id = response.data.id
					axios.post('https://hsrealestate-api.herokuapp.com/api/messaging/',{
						user: this.getUser.id,
						conversation: conversation_id,
						message: this.message_chat
					})
					.then(r => {
						this.loading_messaging = false
						this.$router.push({name: 'chat', params: {id: conversation_id}})
						
					})	
					.catch(error => {
						this.loading_messaging = false
						console.log(error);
					})
					
				})	
				.catch(error => {
					this.loading_messaging = false
					console.log(error);
				})
			}
		},
		closeModal(){
			this.appointment_dialog = false
			this.$refs.form.reset()
		},
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
					this.saveAppointment();
					
				

					
				}
			}
			
		},
		saveAppointment(){
			this.loading_appointment = true
			axios.post('https://hsrealestate-api.herokuapp.com/api/properties/appointments/',{
				scheduled:  this.fecha + ' ' + this.open,
				active: true,
				property: this.property.id,
				client: this.getUser.id,
				agent: this.property.owner.id
			})
			.then(response => {
				
				this.$store.dispatch('getProfile', this.getUser.id).then(response => {
						this.loading_appointment = false
						this.dialog = true
						this.success_appointment = true
						this.fecha = null
						this.open = null	
						this.appointment_dialog = false	
				})
			})
			.catch(error => {
				this.loading_appointment = false
				console.log(error);
			})
		

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
					this.dialog = false
					this.loading = false	
					this.saveAppointment();	
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
		
		if(this.getUser.id == this.property.owner.id){
			this.checkUser = true
		}else{
			this.checkUser = false
		}
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


