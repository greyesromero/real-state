<template>
<v-card class="mb-3">
	 
	<!-- APPOINTMENT -->
	<v-list-item class="colored_border">
			<v-list-item-avatar color="primary" >
			<v-icon color="white">mdi-calendar</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular " style="cursor:pointer;" @click="toDetail"> Propiedad: {{this.appointment.property.name}} </v-list-item-title>
			<v-list-item-subtitle  class="font-weight-regular">{{moment(this.appointment.scheduled).locale('es').format("D [de] MMMM [de] YYYY [a las] hh:mm a")}}</v-list-item-subtitle>

		</v-list-item-content>
		
		
		
		<v-list-item-icon class="justify-center align-self-center">
	
		
				<v-dialog v-model="delete_dialog" max-width="500" persistent>
					<template v-slot:activator="{on}">
						<v-btn color="primary" icon v-on="on">
							<v-icon>mdi-close-circle-outline</v-icon>
						</v-btn>
					</template>
					<v-card :loading="loading">
						<v-card-title class="headline" primary-title>
							¿Seguro que deseas cancelar esta cita?
						</v-card-title>
						<v-card-text>
							Esta acción es permanente.
						</v-card-text>
						<v-card-actions>
							<div class="flex-grow-1"></div>
							<v-btn @click="delete_dialog = false" text>Cancelar</v-btn>
							<v-btn  @click="delete_dialog = false" color="primary" dark>
								<v-icon left>mdi-close-circle</v-icon>
								Confirmar
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
		</v-list-item-icon>
		<!-- ACTIONS -->
		
		

		
	</v-list-item>
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-header>Más Información</v-expansion-panel-header>
			<v-expansion-panel-content>
				<div class="my-2">
					<strong>Agente:</strong>		
				</div>
					<div class="my-2">
					<span>Nombre: {{this.appointment.agent.first_name}} {{this.appointment.agent.last_name}}</span>		
				</div>
				<div class="my-2">
					<span>Teléfono: {{this.appointment.agent.phone}}</span>		
				</div>
				<div class="my-2">
					<span>Email: {{this.appointment.agent.email}}</span>		
				</div>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>

</v-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  props: ['appointment', 'index'],

  data: () => ({
		edit_dialog: false,
		delete_dialog: false,
		update_blog_dialog: false,
		loading: false,
		load: false,
		resultado: null,
		status: null,
		upload_image: [],
	}),
  	methods: {
		  toDetail(){
			  this.$router.push('/detail')
		  }
	},
	mounted(){
		console.log(this.appointment)
	}

}
</script>
<style>
.colored_border {
	border-left: solid #003d51 5px;
}
  
</style>


