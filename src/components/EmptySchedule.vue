<template>
<v-card class="mt-3" color="amber lighten-5">
	<v-list-item>
		<v-list-item-avatar color="grey">
			<v-icon class="white--text font-weight-bold">mdi-exclamation</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular">Agrega un nuevo horario.</v-list-item-title>
		</v-list-item-content>
		<v-list-item-icon>
			<v-dialog v-model="schedule_dialog" max-width="500" persistent>
				<template v-slot:activator="{on}">

					<v-btn icon>
						<v-icon @click="schedule_dialog = true">mdi-plus</v-icon>
					</v-btn>


				</template>

				<v-card :loading="loading">
					<v-toolbar style="box-shadow:none!important;">

							<v-toolbar-title class="headline" primary-title>Nuevo Horario </v-toolbar-title>

							<v-spacer></v-spacer>

							<v-btn class="ma-2 align-end right-align" @click="addTime" outlined color="secondary">
								Agregar&nbsp;<v-icon right>mdi-plus</v-icon>
							</v-btn>
							
					 </v-toolbar>
					
					<v-card-text>
						 
						<div class="mb-2">
							Crea un nuevo horario para el servicio <span class="font-weight-bold">{{this.service_name}}</span>.
						</div>
						<v-form  v-model="valid" :lazy-validation="lazy"  ref="form">
							<v-list-item>
								<!-- ACTIONS -->
								<v-list-item-icon>
									<!-- DELETE -->
									<v-btn color="" icon>
												<v-icon>mdi-calendar-outline</v-icon>
											</v-btn>
								</v-list-item-icon>										

								<v-list-item-content class="mr-2">
									<v-dialog ref="fecha" v-model="fecha_dialog" :return-value.sync="fecha" persistent width="290px" class="">
										<template v-slot:activator="{ on }">
											<v-text-field v-model="fecha" label="Fecha Inicio" v-on="on" outlined :rules="[v => !!v || 'Fecha Inicio es requerida']" required></v-text-field>
										</template>
										<v-date-picker v-if="fecha_dialog" v-model="fecha" full-width 
										:min="today"  locale="es-MX">
											<v-spacer></v-spacer>
											<v-btn text color="primary" @click="fecha_dialog = false">Cancelar</v-btn>
											<v-btn text color="primary" @click="$refs.fecha.save(fecha)">OK</v-btn>
										</v-date-picker>
									</v-dialog>
								</v-list-item-content>
								<v-list-item-content>
									<v-dialog ref="fecha_fin" v-model="fecha_fin_dialog" :return-value.sync="fecha_fin" persistent width="290px">
										<template v-slot:activator="{ on }">
											<v-text-field v-model="fecha_fin" label="Fecha Fin"  v-on="on" outlined :rules="[v => !!v || 'Fecha Fin es requerida']" required></v-text-field>
										</template>
										<v-date-picker v-if="fecha_fin_dialog" v-model="fecha_fin" full-width
										:min="today"  locale="es-MX">
											<v-spacer></v-spacer>
											<v-btn text color="primary" @click="fecha_fin_dialog = false">Cancelar</v-btn>
											<v-btn text color="primary" @click="$refs.fecha_fin.save(fecha_fin)">OK</v-btn>
										</v-date-picker>
									</v-dialog>
								</v-list-item-content>
								
							</v-list-item>

							<v-card v-for="(data, index) in schedule_array" :key="index" style="box-shadow:none!important;background:transparent!important;">
								<!-- APPOINTMENT -->
								<v-list-item>
									<!-- ACTIONS -->
									<v-list-item-icon>
										<!-- DELETE -->
										<v-btn color="red lighten-1" icon @click="deleteSchedule(index)">
													<v-icon>mdi-close</v-icon>
												</v-btn>
									</v-list-item-icon>

									<v-list-item-content class="mr-2">
										<v-select
										:items="days_set"
										v-model="data.day"
										label="Dia"
										outlined
										></v-select>
								
						

									</v-list-item-content>
									<v-list-item-content>
										<v-text-field color="secondary" :name="'hora'" v-mask="mask"  v-model="data.time" label="Hora" placeholder="hh:mm" outlined :rules="[v => !!v || 'Hora es requerida']" required></v-text-field>

									</v-list-item-content>
								</v-list-item>
							</v-card>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<div class="flex-grow-1"></div>
						<v-btn @click="resetSchedule();" text>Cancelar</v-btn>
						<v-btn @click="createSchedule" outlined>
							Crear
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-list-item-icon>
	</v-list-item>
</v-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { range } from 'moment-range';
import { mask } from 'vue-the-mask'

export default {
	directives: {
		mask,
	},
	props: ['service','service_name'],
	data: () => ({
		mask: '##:##',
		dates: [],
		schedule_dialog: false,
		open_dialog: false,
		close_dialog: false,
		fecha_fin_dialog: false,
		fecha_fin:null,
		fecha_dialog: false,
		fecha: null,
		loading: false,
		today:  moment().format('YYYY-MM-DD'),
		schedule_array: [{
			time:null,
			day:0
		}],

		days_set: [{
				value: 0,
				text: 'Domingo',
			},
			{
				value: 1,
				text: 'Lunes',
			},
			{
				value: 2,
				text: 'Martes',
			},
			{
				value: 3,
				text: 'Miércoles',
			},
			{
				value: 4,
				text: 'Jueves',
			},
			{
				value: 5,
				text: 'Viernes',
			},
			{
				value: 6,
				text: 'Sábado',
			}
		],
		day: null,
		open: null,
		close: null,
		valid: true,
		lazy:false,
	}),
	methods: {
		getDates(startDate, stopDate) {
			var dateArray = [];
			var currentDate = moment(startDate);
			var stopDate = moment(stopDate);
			while (currentDate <= stopDate) {
				dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
				currentDate = moment(currentDate).add(1, 'days');
			}
			return dateArray;
		},
		deleteSchedule(index){
			this.schedule_array.splice(index,1)
		},
		createSchedule() {
			
			/*this.$emit('createSchedule', {
				day: this.day,
				open: this.open,
			});
			this.schedule_dialog = false;*/
			let array_schedule = []
			let axiosRequests = []
			let fechas = this.getDates(this.fecha, this.fecha_fin)
			this.loading = true
			fechas.forEach((value, index) => {
				this.schedule_array.forEach((schedule, i) => {
					if(this.moment(value).weekday() == schedule.day){
						array_schedule.push({
							date: value,
							time: schedule.time,
							reservations: []
						})
						let request_post =  axios({url:'https://choosemyfitness-api.herokuapp.com/api/services/schedule/', 
											data: {
												date: value,
												time: schedule.time,
												service: this.service,
												active: true
											},
											method: 'POST' });
						axiosRequests.push(request_post);
						
					}
				});
			});

			axios.all(axiosRequests).then(axios.spread((...responses) => {
			this.schedule_dialog = false
			this.$emit('createSchedule', array_schedule);
			this.loading = false
			this.schedule_array = []
			this.schedule_array.push({
				time:null,
				day:0
			})
			
			//this.$refs.form.reset()
			
			
			})).catch(errors => {
				console.log(errors)
				this.loading = false
			})
			
		},
		resetSchedule(){
			this.$refs.form.reset()
			this.schedule_dialog = false
			this.fecha = null
			this.fecha_fin = null
			this.schedule_array = []
			this.schedule_array.push({
				time:null,
				day:0
			})
		},
		addTime(){
			this.schedule_array.push({
				time:null,
				day:0
			})
		}
	},
}
</script>
