<template>
<v-card class="mt-3">
	<!-- APPOINTMENT -->
	<v-list-item>
		<v-list-item-avatar color="primary">
			<span class="white--text">{{this.days[this.moment(this.schedule.date).weekday()][0]}}</span>
		</v-list-item-avatar>

		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular">{{moment(this.schedule.date).locale('es').format("D [de] MMMM [de] YYYY")}}&nbsp;{{this.moment(this.schedule.time,'hh:mm:ss').format('hh:mm a')}}</v-list-item-title>
			<v-list-item-subtitle></v-list-item-subtitle>
		</v-list-item-content>
		
		<!-- ACTIONS -->
		<v-list-item-icon>
		
			<!-- DELETE -->
			<!--v-dialog v-model="delete_dialog" max-width="500" persistent>
				<template v-slot:activator="{on}">
					<v-btn color="red lighten-1" icon v-on="on">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</template>
				<v-card :loading="loading">
					<v-card-title class="headline" primary-title>
						Seguro que deseas eliminar el horario?
					</v-card-title>
					<v-card-text>
						Esta acción es permanente.
					</v-card-text>
					<v-card-actions>
						<div class="flex-grow-1"></div>
						<v-btn @click="delete_dialog = false" text>Cancelar</v-btn>
						<v-btn @click="deleteSchedule" color="red lighten-1" dark>
							<v-icon left>mdi-close</v-icon>
							Borrar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog-->
		</v-list-item-icon>
	</v-list-item>
	<div>
		<v-expansion-panels>
			<v-expansion-panel>
				 <v-expansion-panel-header disable-icon-rotate>
					<span class="font-weight-bold text-capitalize text-uppercase"> Reservaciones: {{this.schedule.reservations.length}}</span>
					<template v-slot:actions>
						<v-icon>$expand</v-icon>
					</template>
					</v-expansion-panel-header>
				<v-expansion-panel-content  class="wrapper">
					<div class="my-2" v-for="reservation in this.schedule.reservations">
						<v-divider></v-divider>
						<v-list-item >
								<v-list-item-avatar color="red lighten-3">
								<img z-index="0" class="profile-picture" v-if="reservation.user.image==null" :src="'../assets/img/sin-imagen.jpg'" alt="alt" lazy-src="../assets/logo.png">

								<img z-index="0" class="profile-picture" v-if="reservation.user.image!=null" :src="reservation.user.image" alt="alt" lazy-src="../assets/logo.png">
								</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title class="subtitle font-weight-regular">{{reservation.user.first_name}} {{reservation.user.last_name}}</v-list-item-title>
								<v-list-item-subtitle></v-list-item-subtitle>

							</v-list-item-content>
						
						</v-list-item>
						
						
					</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</v-card>
</template>

<script>
import moment from 'moment'
export default {
	props: ['schedule', 'index', 'view'],
	data: () => ({
		edit_dialog: false,
		delete_dialog: false,
		loading: false,

		days: ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],

		labels: [
			'S4',
			'S3',
			'S2',
			'S1',
			'S0',
		],
		value: [
			90,
			80,
			50,
			75,
			95,
		],

	}),
	methods: {
		deleteSchedule() {
			this.$emit('deleteSchedule', this.index);
			this.delete_dialog = false;
		},
	},
	
}
</script>
<style>
.wrapper {
  height: 250px;
  overflow-y: auto;
}
</style>
