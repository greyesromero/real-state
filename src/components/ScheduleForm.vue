<template>
<div>
	<v-card :loading="loading" class="mx-auto" tile flat>
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
					<!--v-flex xs6>
						<v-text-field hide-details v-model.lazy="first_name" outlined color="secondary" label="Nombre"  :rules="[v => !!v || 'Nombre es requerido']" required></v-text-field>

					</v-flex>
					<v-flex xs6>
						<v-text-field hide-details v-model.lazy="last_name" outlined color="secondary" label="Apellido"  :rules="[v => !!v || 'Apellido es requerido']" required></v-text-field>

					</v-flex>
					<v-flex xs12>
						<v-text-field hide-details v-model.trim="email" outlined color="secondary" label="E-mail"  :rules="emailRules" required></v-text-field>

					</v-flex>
					<v-flex xs12>
						<v-text-field hide-details outlined color="secondary" label="Teléfono" required></v-text-field>

					</v-flex-->
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
	<v-dialog v-model="dialog" persistent max-width="400" timeout = "2000">
		<v-card>
				<v-card-title class="headline">NOTIFICACIÓN</v-card-title>
				<v-card-text>
					<span class="body-2 justi">
						¿Deseas agendar una cita para visitar esta propiedad? Inicia sesión o registrate haciendo click <v-btn color="primary" text router to="/login">aquí</v-btn>
					</span>
					
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="dialog = false">Aceptar</v-btn>
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
			email: null,
			valid: true,
			lazy:false,
			dialog: false,
			open_dialog: false,
			open: null,
			fecha_dialog: false,
			fecha: null,
			mensaje: 'Me interesa la casa en Antigua Guatemala',
			message: null,
			emailRules: [
				v => !!v || 'E-mail es Requerido',
				v => /.+@.+/.test(v) || 'Ingresa un email válido',
			],
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
			if(!this.isLoggedIn){
				this.message = ``;
				this.dialog = true 
			}else{
				this.message = 'Cita Agendada'
				
			}
		}
	}
}
</script>
