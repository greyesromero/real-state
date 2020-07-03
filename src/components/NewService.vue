<template>
<div>
	<v-btn color="primary" @click="checkChain()" dark fab fixed bottom right>
		<v-icon>mdi-plus</v-icon>
	</v-btn>

	<v-dialog v-model="new_gym_dialog" width="500">
		<v-card :loading="loading">
			<v-card-title>
				<span>Crear Servicio</span>
				<v-spacer></v-spacer>
			</v-card-title>
			<v-card-text class="mb-0">
				<v-form  v-model="valid" :lazy-validation="lazy"  ref="form">
					<v-text-field color="red lighten-2" name="name" label="Nombre" outlined v-model.lazy="name" required :rules="[v => !!v || 'Nombre es requerido']"></v-text-field>
					<v-textarea color="red lighten-2" name="address" label="Descripción" outlined v-model.lazy="description" required :rules="[v => !!v || 'Descripción es requerida']">
					</v-textarea>
					
					<v-text-field color="red lighten-2" name="price" label="Precio" prefix="Q" outlined v-model.lazy="price" required :rules="[v => !!v || 'Precio es requerido']">
					</v-text-field>
					<v-text-field color="secondary" name="duration" label="Duración" suffix="minutos" outlined v-model.lazy="duration"  :rules="[v => !!v || 'Duración de consulta es requerida']" required>
					</v-text-field>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text v-on:click="resetGym()">Cancelar</v-btn>
				<v-btn outlined v-on:click="createGym()">Guardar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-dialog v-model="error" max-width="500" persistent>
		<v-card>
			<v-card-title class="headline" primary-title>
				Alerta
			</v-card-title>
		
			<v-card-text>
				{{ this.message }}
			</v-card-text>
			<v-card-actions>
				<div class="flex-grow-1"></div>
				<v-btn @click="error = false" text>OK</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			new_gym_dialog: false,

		
			name: null,
			loading: false,
			valid: true,
			lazy:false,
			email: null,
			phone: null,
			price: null,
			address: null,
			description: null,
			error: false,
			message: null,
			duration: null,
		}
	},
	computed:{
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		checkChain(){
			if(this.chain!=0){
				this.new_gym_dialog = true
			}else{
				this.message = 'Debe seleccionar una empresa para continuar.'
				this.error = true;
			}
		},		
		resetGym(){
			this.new_gym_dialog=false
			this.$refs.form.reset()
		},
		createGym() {
			if (this.$refs.form.validate()) {
				this.loading = true
				this.error = false
				this.message = null
				let seconds = this.duration * 60;
				let minutes = this.moment.utc(this.moment.duration(seconds, "seconds").asMilliseconds()).format("HH:mm:ss")
				
				axios.post('https://choosemyfitness-api.herokuapp.com/api/services/', {
					name: this.name,
					description: this.description,
					price: this.price,
					duration: minutes,
					active: true,
					provider: this.getUser.id,
				})
					.then(response => {
						this.$emit('createService', response.data);
						this.new_gym_dialog = false;
					
						this.loading = false
						this.$refs.form.reset()
						
					})
					.catch(error => {
						this.loading = false
						console.log(error);
					});
				
			}
		},
	},
	
}
</script>
